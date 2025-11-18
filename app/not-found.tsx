import Link from 'next/link';
import { Button, Card } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        <Card className="shadow-lg">
          <div className="space-y-6">
            {/* 404 Icon */}
            <div className="text-8xl">🧭</div>
            
            {/* Error Code */}
            <div>
              <h1 className="text-6xl font-bold text-nextstep-primary mb-2">404</h1>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Page Not Found
              </h2>
              <p className="text-gray-600">
                Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
            </div>

            {/* Suggestions */}
            <div className="bg-gray-50 rounded-lg p-6 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Here&apos;s what you can do:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-nextstep-primary mt-1">✓</span>
                  <span>Check the URL for typos</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-nextstep-primary mt-1">✓</span>
                  <span>Return to the homepage and navigate from there</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-nextstep-primary mt-1">✓</span>
                  <span>Browse our available courses</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button variant="primary" size="lg">
                  Go to Homepage
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="secondary" size="lg">
                  Browse Courses
                </Button>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Quick Links:</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link href="/auth/login" className="text-nextstep-primary hover:underline">
                  Login
                </Link>
                <Link href="/auth/register" className="text-nextstep-primary hover:underline">
                  Register
                </Link>
                <Link href="/mentors" className="text-nextstep-primary hover:underline">
                  Find Mentors
                </Link>
                <Link href="/certificates" className="text-nextstep-primary hover:underline">
                  Certificates
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
