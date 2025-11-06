import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  userRole?: 'learner' | 'mentor' | 'admin';
  showNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'NextStep Africa',
  userRole,
  showNavigation = true,
}) => {
  const roleColors = {
    learner: 'bg-learner',
    mentor: 'bg-mentor',
    admin: 'bg-admin',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-nextstep-primary">
                NextStep Africa
              </h1>
              {title !== 'NextStep Africa' && (
                <span className="text-gray-500 ml-2">- {title}</span>
              )}
            </div>
            
            {userRole && (
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${roleColors[userRole]}`}>
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      {showNavigation && (
        <nav className="bg-nextstep-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              <Link href="/" className="px-3 py-4 text-sm font-medium hover:bg-nextstep-primary-dark transition-colors">
                Dashboard
              </Link>
              <Link href="/courses" className="px-3 py-4 text-sm font-medium hover:bg-nextstep-primary-dark transition-colors">
                Courses
              </Link>
              {userRole === 'learner' && (
                <Link href="/mentors" className="px-3 py-4 text-sm font-medium hover:bg-nextstep-primary-dark transition-colors">
                  Mentors
                </Link>
              )}
              <Link href="/certificates" className="px-3 py-4 text-sm font-medium hover:bg-nextstep-primary-dark transition-colors">
                Certificates
              </Link>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-700 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm">
              © 2025 NextStep Africa - Empowering Displaced Youth with Digital Skills
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Building bridges to opportunities across Africa
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;