import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import { apiResponse, apiError } from '@/lib/api/utils';

/**
 * POST /api/courses/[id]/enroll - Enroll a user in a course
 */
export async function POST(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return apiError('Unauthorized. User ID is required.', 401);
    }

    const course = await Course.findById((await params).id);
    if (!course) {
      return apiError('Course not found', 404);
    }

    if (course.enrolledUsers.includes(userId)) {
      return apiError('User already enrolled in this course', 400);
    }

    course.enrolledUsers.push(userId);
    course.enrolled += 1;
    await course.save();

    return apiResponse({ message: 'User successfully enrolled in the course.' });
  } catch (error: unknown) {
    console.error('Enroll user error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to enroll user',
      500
    );
  }
}