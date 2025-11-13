import { NextRequest } from 'next/server';
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

/**
 * POST /api/enrollments - Enroll in a course
 */
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return apiError('Not authenticated', 401);
    }

    await connectDB();

    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return apiError('Course ID is required', 400);
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return apiError('Course not found', 404);
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      userId: currentUser.userId,
      courseId,
    });

    if (existingEnrollment) {
      return apiError('Already enrolled in this course', 409);
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      userId: currentUser.userId,
      courseId,
    });

    // Increment course enrollment count
    await Course.findByIdAndUpdate(courseId, {
      $inc: { enrolled: 1 },
    });

    return apiResponse(enrollment, 201, 'Enrolled successfully');
  } catch (error: unknown) {
    console.error('Enrollment error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to enroll',
      500
    );
  }
}