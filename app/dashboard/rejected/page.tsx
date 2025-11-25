'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useLogout } from '@/hooks/useAuth';
import { Button } from '@/components/ui';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function RejectedPage() {
  const router = useRouter();
  const { data: user, isLoading } = useUser();
  const logout = useLogout();

  useEffect(() => {
    if (!isLoading && user) {
      // If user is active, redirect to admin dashboard
      if (user.status === 'active') {
        router.push('/dashboard/admin');
      }
      // If user is pending, redirect to pending page
      else if (user.status === 'pending') {
        router.push('/dashboard/pending');
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
          <LoadingSpinner />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Account Rejected
          </h1>
          
          <p className="text-gray-600 mb-6">
            Your admin registration request has been reviewed and rejected by an administrator.
            You will not be able to access admin features with this account.
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">
              If you believe this was a mistake, please contact an administrator directly
              or create a new account with a different email address.
            </p>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="error"
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
