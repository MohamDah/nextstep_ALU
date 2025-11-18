'use client';

import React from 'react';
import Link from 'next/link';
import { useLogout, useUser } from '@/hooks/useAuth';
import logo from '@/public/logo.png'
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'NextStep Africa',
}) => {
  const {data: user} = useUser()
  const roleColors = {
    learner: 'bg-learner',
    mentor: 'bg-mentor',
    admin: 'bg-admin',
  };

  const userRole = user?.role

  const showNavigation = !!user

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href={"/"}>
                <Image src={logo} alt='Logo' className='w-36' />
              </Link>
              {title !== 'NextStep Africa' && (
                <span className="text-gray-500 ml-2">- {title}</span>
              )}
            </div>

            <UserSection userRole={userRole} roleColors={roleColors} />
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

function UserSection({ userRole, roleColors }: { userRole?: string; roleColors: Record<string, string> }) {
  const { data: user } = useUser();
  const { mutate: logout, isPending } = useLogout();

  if (!user && !userRole) {
    return null;
  }

  const displayRole = userRole || user?.role;

  return (
    <div className="flex items-center space-x-4">
      {displayRole && (
        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${roleColors[displayRole as keyof typeof roleColors]}`}>
          {displayRole.charAt(0).toUpperCase() + displayRole.slice(1)}
        </span>
      )}
      {user && (
        <>
          <span className="text-sm text-gray-600">{user.username}</span>
          <button
            onClick={() => logout()}
            disabled={isPending}
            className="text-sm text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
          >
            {isPending ? 'Logging out...' : 'Logout'}
          </button>
        </>
      )}
    </div>
  );
}

export default Layout;