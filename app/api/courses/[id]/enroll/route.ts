import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import { apiResponse, apiError, getCurrentUser } from '@/lib/api/utils';
import Enrollment from '@/models/Enrollment';

/**
 * POST /api/courses/[id]/enroll - Enroll a user in a course
 */
export async function POST(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return apiError('Not authenticated', 401);
    }

    await connectDB();

    const {id: courseId} = await params
    
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