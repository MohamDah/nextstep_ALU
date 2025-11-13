import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import { apiResponse, apiError } from '@/lib/api/utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/courses/[id] - Get a single course
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();
    
    const { id } = await params;

    const course = await Course.findById(id);

    if (!course) {
      return apiError('Course not found', 404);
    }

    return apiResponse(course);
  } catch (error: unknown) {
    console.error('Get course error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to get course',
      500
    );
  }
}

/**
 * PUT /api/courses/[id] - Update a course
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const body = await request.json();

    const course = await Course.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return apiError('Course not found', 404);
    }

    return apiResponse(course, 200, 'Course updated successfully');
  } catch (error: unknown) {
    console.error('Update course error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to update course',
      500
    );
  }
}

/**
 * DELETE /api/courses/[id] - Delete a course
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();
    
    const { id } = await params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return apiError('Course not found', 404);
    }

    return apiResponse(null, 200, 'Course deleted successfully');
  } catch (error: unknown) {
    console.error('Delete course error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to delete course',
      500
    );
  }
}