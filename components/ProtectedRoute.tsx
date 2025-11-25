'use client';

import { useUser } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from './ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'learner' | 'mentor' | 'admin';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { data: user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Check status and redirect if needed
      if (user.status === 'pending') {
        router.push('/dashboard/pending');
      } else if (user.status === 'rejected') {
        router.push('/dashboard/rejected');
      }
    }
  }, [user, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Middleware handles redirects, so if we get here with no user or wrong role,
  // just show loading (middleware will redirect on next render)
  if (!user || (requiredRole && user.role !== requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Check status before rendering content
  if (user.status === 'pending' || user.status === 'rejected') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Authenticated and authorized - render the protected content
  return <>{children}</>;
}
