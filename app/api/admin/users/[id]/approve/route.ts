import { NextRequest } from 'next/server';
import { requireActiveAdmin, apiResponse, apiError } from '@/lib/api/utils';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

/**
 * POST /api/admin/users/[id]/approve - Approve a pending admin account
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

    const { user: adminUser } = result;
    const { id } = await params;

    await connectDB();

    // Find the user to approve
    const userToApprove = await User.findById(id);

    if (!userToApprove) {
      return apiError('User not found', 404);
    }

    if (userToApprove.role !== 'admin') {
      return apiError('User is not an admin', 400);
    }

    if (userToApprove.status !== 'pending') {
      return apiError('User is not in pending status', 400);
    }

    // Update user status to active
    userToApprove.status = 'active';
    userToApprove.approvedBy = adminUser._id.toString();
    userToApprove.approvedAt = new Date();
    await userToApprove.save();

    return apiResponse(
      {
        user: {
          id: userToApprove._id,
          username: userToApprove.username,
          email: userToApprove.email,
          role: userToApprove.role,
          status: userToApprove.status,
          approvedBy: userToApprove.approvedBy,
          approvedAt: userToApprove.approvedAt,
        },
      },
      200,
      'Admin account approved successfully'
    );
  } catch (error: unknown) {
    console.error('Approve admin error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to approve admin',
      500
    );
  }
}
