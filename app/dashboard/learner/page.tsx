'use client';

import { Card, Button } from '../../../components/ui';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useEnrollmentsWithCourses } from '@/hooks/useEnrollments';
import { useRouter } from 'next/navigation';
import MyCourseCard from './_components/MyCourseCard';

function LearnerDashboardContent() {
  const router = useRouter();
  const { data: enrollments = [], isLoading, error } = useEnrollmentsWithCourses();

  // Calculate statistics from enrollments
  const learnerStats = {
    enrolledCourses: enrollments?.length || 0,
    completedCourses: enrollments?.filter(e => e.status === 'completed').length || 0,
    certificates: enrollments?.filter(e => e.status === 'completed').length || 0,
    hoursLearned: enrollments?.reduce((total, e) => {
      // Estimate hours based on completed lessons (assuming 1 hour per lesson)
      return total + (e.completedLessons.length || 0);
    }, 0) || 0,
  };

  const recentActivities = [
    'Completed lesson: "Introduction to SEO"',
    'Enrolled in "Mobile App Development"',
    'Earned certificate for "Basic Computer Skills"',
    'Connected with mentor: John Kamau',
  ];

  return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-nextstep-primary to-nextstep-primary-light text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Learner!</h1>
          <p>
            Continue your journey to digital excellence. Your next opportunity awaits!
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="text-center">
            <div className="text-3xl font-bold text-learner">{learnerStats.enrolledCourses}</div>
            <div className="text-sm text-gray-600">Enrolled Courses</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-success">{learnerStats.completedCourses}</div>
            <div className="text-sm text-gray-600">Completed Courses</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-nextstep-secondary">{learnerStats.certificates}</div>
            <div className="text-sm text-gray-600">Certificates Earned</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-nextstep-primary">{learnerStats.hoursLearned}</div>
            <div className="text-sm text-gray-600">Hours Learned</div>
          </Card>
        </div>

        {/* Current Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
            
            {isLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nextstep-primary mx-auto mb-2"></div>
                <p className="text-gray-600 text-sm">Loading your courses...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                Failed to load courses. Please try again.
              </div>
            )}

            {!isLoading && !error && enrollments.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You haven&apos;t enrolled in any courses yet.</p>
                <Button variant="primary" onClick={() => router.push('/courses')}>
                  Browse Courses
                </Button>
              </div>
            )}

            {!isLoading && !error && enrollments.length > 0 && (
              <>
                <div className="space-y-4">
                  {enrollments.map((enrollment) => (
                    <MyCourseCard key={enrollment._id} enrollment={enrollment} />
                  ))}
                </div>
                <Button 
                  variant="primary" 
                  fullWidth 
                  className="mt-4"
                  onClick={() => router.push('/courses')}
                >
                  Browse More Courses
                </Button>
              </>
            )}
          </Card>

          {/* Recent Activity & Quick Actions */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-nextstep-primary rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm text-gray-700">{activity}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button variant="primary" fullWidth>
                  Find a Mentor
                </Button>
                <Button variant="secondary" fullWidth>
                  Download Courses for Offline
                </Button>
                <Button variant="success" fullWidth>
                  View My Certificates
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
  );
}

export default function LearnerDashboard() {
  return (
    <ProtectedRoute requiredRole="learner">
      <LearnerDashboardContent />
    </ProtectedRoute>
  );
}