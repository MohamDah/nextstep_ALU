import { getCurrentUser, apiError, apiResponse } from '@/lib/api/utils';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Course from '@/models/Course';
import Enrollment from '@/models/Enrollment';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return apiError('Not authenticated', 401);
    }

    if (user.role !== 'admin') {
      return apiError('Admin access required', 403);
    }

    await dbConnect();

    // Fetch all stats in parallel
    const [
      totalUsers,
      usersByRole,
      totalCourses,
      totalEnrollments,
      completedEnrollments,
      recentUsers,
      topCourses,
      recentActivities
    ] = await Promise.all([
      // Total users
      User.countDocuments(),

      // Users by role
      User.aggregate([
        {
          $group: {
            _id: '$role',
            count: { $sum: 1 }
          }
        }
      ]),

      // Total active courses
      Course.countDocuments(),

      // Total enrollments
      Enrollment.countDocuments(),

      // Completed enrollments (certificates issued)
      Enrollment.countDocuments({ status: 'completed' }),

      // New users this week
      User.countDocuments({
        createdAt: {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }),

      // Top performing courses
      Enrollment.aggregate([
        {
          $group: {
            _id: '$courseId',
            enrollments: { $sum: 1 },
            completions: {
              $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
            }
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: '_id',
            foreignField: '_id',
            as: 'course'
          }
        },
        { $unwind: '$course' },
        {
          $project: {
            name: '$course.title',
            enrollments: 1,
            completion: {
              $cond: [
                { $eq: ['$enrollments', 0] },
                0,
                { $multiply: [{ $divide: ['$completions', '$enrollments'] }, 100] }
              ]
            }
          }
        },
        { $sort: { enrollments: -1 } },
        { $limit: 4 }
      ]),

      // Recent activities (simplified - in production, you'd have an Activity model)
      Promise.all([
        Course.find().sort({ createdAt: -1 }).limit(2).populate('instructor', 'username'),
        User.find().sort({ createdAt: -1 }).limit(2),
        Enrollment.find({ status: 'completed' }).sort({ updatedAt: -1 }).limit(2)
          .populate('userId', 'username')
          .populate('courseId', 'title')
      ])
    ]);

    // Format user stats by role
    const userStats = {
      learners: usersByRole.find(r => r._id === 'learner')?.count || 0,
      mentors: usersByRole.find(r => r._id === 'mentor')?.count || 0,
      admins: usersByRole.find(r => r._id === 'admin')?.count || 0,
      newThisWeek: recentUsers
    };

    // Format recent activities
    const [recentCourses, newUsers, recentCerts] = recentActivities;
    const activities = [
      ...recentCourses.map(course => ({
        type: 'course',
        message: `New course "${course.title}" added`,
        timestamp: course.createdAt
      })),
      ...newUsers.map(user => ({
        type: 'user',
        message: `${user.username} registered as ${user.role}`,
        timestamp: user.createdAt
      })),
      ...recentCerts.map(enrollment => ({
        type: 'certificate',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message: `Certificate issued to ${(enrollment.userId as any).username} for ${(enrollment.courseId as any).title}`,
        timestamp: enrollment.updatedAt
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5)
      .map(activity => activity.message);

    const stats = {
      systemStats: {
        totalUsers,
        activeCourses: totalCourses,
        certificatesIssued: completedEnrollments,
        totalEnrollments,
      },
      userStats,
      topCourses: topCourses.map(course => ({
        name: course.name,
        enrollments: course.enrollments,
        completion: Math.round(course.completion)
      })),
      recentActivities: activities
    };
    
    return apiResponse(stats);
  } catch (error) {
    console.error('Admin stats error:', error);
    return apiError('Failed to fetch admin statistics');
  }
}
