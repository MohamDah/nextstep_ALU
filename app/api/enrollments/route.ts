import { getCurrentUser, apiError, apiResponse } from '@/lib/api/utils';
import dbConnect from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';
import Course from '@/models/Course';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return apiError('Not authenticated', 401);
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const populate = searchParams.get('populate');

    let enrollments;

    if (populate === 'course') {
      // Fetch enrollments and populate course details
      enrollments = await Enrollment.find({ userId: user.userId }).lean();
      
      // Manually populate course data
      const enrollmentsWithCourses = await Promise.all(
        enrollments.map(async (enrollment) => {
          const course = await Course.findById(enrollment.courseId)
            .select('_id title instructor duration lessons')
            .lean();
          
          return {
            ...enrollment,
            course: course || undefined,
          };
        })
      );

      return apiResponse(enrollmentsWithCourses);
    } else {
      enrollments = await Enrollment.find({ userId: user.userId }).lean();
      return apiResponse(enrollments);
    }
  } catch (error) {
    console.error('Get enrollments error:', error);
    return apiError('Failed to fetch enrollments');
  }
}
