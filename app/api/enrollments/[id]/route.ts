import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';
import Course from '@/models/Course';
import { getCurrentUser, apiResponse, apiError } from '@/lib/api/utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/enrollments/[id] - Update enrollment progress
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return apiError('Not authenticated', 401);
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { completedLessons } = body;

    if (!Array.isArray(completedLessons)) {
      return apiError('completedLessons must be an array of lesson numbers', 400);
    }

    // Find enrollment and verify ownership
    const enrollment = await Enrollment.findById(id);

    if (!enrollment) {
      return apiError('Enrollment not found', 404);
    }

    if (enrollment.userId !== currentUser.userId) {
      return apiError('Unauthorized to update this enrollment', 403);
    }

    // Get course to check total lessons
    const course = await Course.findById(enrollment.courseId);

    if (!course) {
      return apiError('Course not found', 404);
    }

    // Validate lesson numbers
    const invalidLessons = completedLessons.filter(
      (lessonNum: number) => lessonNum < 1 || lessonNum > course.lessons
    );

    if (invalidLessons.length > 0) {
      return apiError(
        `Invalid lesson numbers: ${invalidLessons.join(', ')}. Course has ${course.lessons} lessons.`,
        400
      );
    }

    // Update enrollment
    enrollment.completedLessons = completedLessons;

    // Check if all lessons are completed
    if (completedLessons.length === course.lessons) {
      enrollment.status = 'completed';
      if (!enrollment.completedAt) {
        enrollment.completedAt = new Date();
      }
    } else {
      enrollment.status = 'in-progress';
      enrollment.completedAt = undefined;
    }

    await enrollment.save();

    return apiResponse(enrollment, 200, 'Progress updated successfully');
  } catch (error: unknown) {
    console.error('Update enrollment error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to update enrollment',
      500
    );
  }
}

/**
 * GET /api/enrollments/[id] - Get single enrollment
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return apiError('Not authenticated', 401);
    }

    await connectDB();

    const { id } = await params;

    const enrollment = await Enrollment.findById(id);

    if (!enrollment) {
      return apiError('Enrollment not found', 404);
    }

    if (enrollment.userId !== currentUser.userId) {
      return apiError('Unauthorized to view this enrollment', 403);
    }

    // Populate course details
    const course = await Course.findById(enrollment.courseId);

    return apiResponse({
      ...enrollment.toObject(),
      course,
    });
  } catch (error: unknown) {
    console.error('Get enrollment error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to get enrollment',
      500
    );
  }
}
