import { NextRequest } from 'next/server';
import { requireActiveAdmin, apiResponse, apiError } from '@/lib/api/utils';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

/**
 * POST /api/admin/users/[id]/reject - Reject a pending admin account
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const result = await requireActiveAdmin();

    if ('error' in result) {
      return result.error;
    }

    const { id } = await params;

    await connectDB();

    // Find the user to reject
    const userToReject = await User.findById(id);

    if (!userToReject) {
      return apiError('User not found', 404);
    }

    if (userToReject.role !== 'admin') {
      return apiError('User is not an admin', 400);
    }

    if (userToReject.status !== 'pending') {
      return apiError('User is not in pending status', 400);
    }

    // Update user status to rejected
    userToReject.status = 'rejected';
    await userToReject.save();

    return apiResponse(
      {
        user: {
          id: userToReject._id,
          username: userToReject.username,
          email: userToReject.email,
          role: userToReject.role,
          status: userToReject.status,
        },
      },
      200,
      'Admin account rejected successfully'
    );
  } catch (error: unknown) {
    console.error('Reject admin error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to reject admin',
      500
    );
  }
}
