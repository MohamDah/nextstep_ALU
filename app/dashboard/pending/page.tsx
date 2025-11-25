'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useLogout } from '@/hooks/useAuth';
import { Button } from '@/components/ui';

export default function PendingPage() {
  const router = useRouter();
  const { data: user, isLoading } = useUser();
  const logout = useLogout();

  useEffect(() => {
    if (!isLoading && user) {
      // If user is active, redirect to admin dashboard
      if (user.status === 'active') {
        router.push('/dashboard/admin');
      }
      // If user is rejected, redirect to rejected page
      else if (user.status === 'rejected') {
        router.push('/dashboard/rejected');
      }
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    await logout.mutateAsync();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
            <svg
              className="h-8 w-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Account Pending Approval
          </h1>
          
          <p className="text-gray-600 mb-6">
            Your admin account has been created and is awaiting approval from an existing administrator.
            You&apos;ll be able to access the admin dashboard once your account has been approved.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>What&apos;s next?</strong><br />
              An active admin will review your registration request. 
              Once approved, refresh this page to access your admin dashboard.
            </p>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
