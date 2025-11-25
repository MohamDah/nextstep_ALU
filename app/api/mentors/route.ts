import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { apiResponse, apiError } from '@/lib/api/utils';

/**
 * GET /api/mentors - Get list of all mentors
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    // Build query for mentors
    const query: Record<string, unknown> = { role: 'mentor' };

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const mentors = await User.find(query)
      .select('username email role createdAt')
      .sort({ createdAt: -1 });

    return apiResponse(mentors);
  } catch (error: unknown) {
    console.error('Get mentors error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to fetch mentors',
      500
    );
  }
}
