'use client';

import { useUser } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'learner' | 'mentor' | 'admin';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { data: user, isLoading } = useUser();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nextstep-primary mx-auto mb-4"></div>
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nextstep-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Authenticated and authorized - render the protected content
  return <>{children}</>;
}
