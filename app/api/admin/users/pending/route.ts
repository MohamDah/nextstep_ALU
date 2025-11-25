import { requireActiveAdmin, apiResponse } from '@/lib/api/utils';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

/**
 * GET /api/admin/users/pending - Get all pending and rejected admin accounts
 */
export async function GET() {
  try {
    const result = await requireActiveAdmin();

    if ('error' in result) {
      return result.error;
    }

    await connectDB();

    // Find all admin users with pending or rejected status
    const pendingAdmins = await User.find({
      role: 'admin',
      status: { $in: ['pending', 'rejected'] }
    })
      .select('-password')
      .sort({ createdAt: -1 });

    return apiResponse({
      pending: pendingAdmins.filter(u => u.status === 'pending'),
      rejected: pendingAdmins.filter(u => u.status === 'rejected'),
    });
  } catch (error: unknown) {
    console.error('Get pending admins error:', error);
    return apiResponse(
      { error: error instanceof Error ? error.message : 'Failed to get pending admins' },
      500
    );
  }
}
