import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import { apiResponse, apiError } from '@/lib/api/utils';

/**
 * GET /api/courses - Get all courses with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const search = searchParams.get('search');

    // Build query
    const query: Record<string, unknown> = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (level && level !== 'All') {
      query.level = level;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });

    return apiResponse(courses);
  } catch (error: unknown) {
    console.error('Get courses error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to get courses',
      500
    );
  }
}

/**
 * POST /api/courses - Create a new course (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const course = await Course.create(body);

    return apiResponse(course, 201, 'Course created successfully');
  } catch (error: unknown) {
    console.error('Create course error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to create course',
      500
    );
  }
}
