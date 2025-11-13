import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { getCurrentUser, apiResponse, apiError } from '@/lib/api/utils';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return apiError('Not authenticated', 401);
    }

    await connectDB();

    const user = await User.findById(currentUser.userId).select('-password');

    if (!user) {
      return apiError('User not found', 404);
    }

    return apiResponse({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error: unknown) {
    console.error('Get current user error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to get user',
      500
    );
  }
}