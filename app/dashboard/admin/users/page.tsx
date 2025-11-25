'use client';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Card, Button } from '../../../../components/ui';
import ProtectedRoute from '@/components/ProtectedRoute';
import { usePendingAdmins, useApproveAdmin, useRejectAdmin } from '@/hooks/usePendingAdmins';
import Link from 'next/link';
import { useState } from 'react';

function AdminUsersContent() {
  const { data: pendingData, isLoading, error } = usePendingAdmins();
  const approveAdmin = useApproveAdmin();
  const rejectAdmin = useRejectAdmin();
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const handleApprove = async (userId: string, username: string) => {
    try {
      await approveAdmin.mutateAsync(userId);
      setActionMessage(`${username} has been approved.`);
      setTimeout(() => setActionMessage(null), 5000);
    } catch (error) {
      console.error('Failed to approve admin:', error);
    }
  };

  const handleReject = async (userId: string, username: string) => {
    try {
      await rejectAdmin.mutateAsync(userId);
      setActionMessage(`${username} has been rejected.`);
      setTimeout(() => setActionMessage(null), 5000);
    } catch (error) {
      console.error('Failed to reject admin:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
        <LoadingSpinner />
          <p className="text-gray-600">Loading admin users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard/admin">
            <Button variant="secondary" size="sm">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <h3 className="font-semibold mb-2">Failed to load admin users</h3>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!pendingData) {
    return null;
  }

  const hasPendingOrRejected = pendingData.pending.length > 0 || pendingData.rejected.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard/admin">
            <Button variant="secondary" size="sm">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-linear-to-r from-admin to-red-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Admin User Management</h1>
        <p className="text-red-200">
          Approve or reject pending admin registrations
        </p>
      </div>

      {/* Action Message */}
      {actionMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg">
          <p className="text-sm">{actionMessage}</p>
        </div>
      )}

      {/* Pending Admin Approvals */}
      {!hasPendingOrRejected ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600">No pending or rejected admin users at this time.</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Pending Admins */}
          {pendingData.pending.length > 0 && (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Pending Approvals</h2>
                <span className="px-3 py-1 bg-warning text-gray-800 text-sm rounded-full font-medium">
                  {pendingData.pending.length} {pendingData.pending.length === 1 ? 'User' : 'Users'}
                </span>
              </div>
              
              <div className="space-y-4">
                {pendingData.pending.map((admin) => (
                  <div key={admin._id} className="border rounded-lg p-4 bg-yellow-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-lg">{admin.username}</h4>
                        <p className="text-sm text-gray-600 mt-1">{admin.email}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Registered: {new Date(admin.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleApprove(admin._id, admin.username)}
                          disabled={approveAdmin.isPending || rejectAdmin.isPending}
                        >
                          ✓ Approve
                        </Button>
                        <Button
                          variant="error"
                          size="sm"
                          onClick={() => handleReject(admin._id, admin.username)}
                          disabled={approveAdmin.isPending || rejectAdmin.isPending}
                        >
                          ✗ Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Rejected Admins */}
          {pendingData.rejected.length > 0 && (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Rejected Admins</h2>
                <span className="px-3 py-1 bg-error text-white text-sm rounded-full font-medium">
                  {pendingData.rejected.length} {pendingData.rejected.length === 1 ? 'User' : 'Users'}
                </span>
              </div>
              
              <div className="space-y-3">
                {pendingData.rejected.map((admin) => (
                  <div key={admin._id} className="border rounded-lg p-4 bg-red-50">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{admin.username}</h4>
                        <p className="text-sm text-gray-600 mt-1">{admin.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Registered: {new Date(admin.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-error text-white text-xs rounded-full font-medium">
                        Rejected
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      {/* Information Card */}
      <Card>
        <h3 className="font-semibold text-gray-900 mb-3">About Admin Approvals</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong className="text-gray-900">Pending:</strong> New admin registrations awaiting your approval. Approve to grant full admin access.
          </p>
          <p>
            <strong className="text-gray-900">Rejected:</strong> Admin requests that have been declined. Rejection is permanent.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminUsersContent />
    </ProtectedRoute>
  );
}
