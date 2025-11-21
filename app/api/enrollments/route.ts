import connectDB from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';
import Course from '@/models/Course';
import { getCurrentUser, apiResponse, apiError } from '@/lib/api/utils';

/**
 * GET /api/enrollments - Get user's enrollments
 */
export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return apiError('Not authenticated', 401);
    }

    await connectDB();

    const enrollments = await Enrollment.find({ userId: currentUser.userId })
      .sort({ enrolledAt: -1 });

    // Populate course details
    const enrollmentsWithCourses = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = await Course.findById(enrollment.courseId);
        return {
          ...enrollment.toObject(),
          course,
        };
      })
    );

    return apiResponse(enrollmentsWithCourses);
  } catch (error: unknown) {
    console.error('Get enrollments error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to get enrollments',
      500
    );
  }
}
