'use client';

import { Card, Button } from '../../../components/ui';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAdminStats } from '@/hooks/useAdmin';

function AdminDashboardContent() {
  const { data: stats, isLoading, error } = useAdminStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-admin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <h3 className="font-semibold mb-2">Failed to load statistics</h3>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-admin to-red-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Admin Control Center</h1>
        <p className="text-red-200">
          Manage the NextStep Africa platform and empower our community of learners.
        </p>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="text-center">
          <div className="text-3xl font-bold text-admin">{stats.systemStats.totalUsers}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-nextstep-primary">{stats.systemStats.activeCourses}</div>
          <div className="text-sm text-gray-600">Active Courses</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-nextstep-secondary">{stats.systemStats.certificatesIssued}</div>
          <div className="text-sm text-gray-600">Certificates Issued</div>
        </Card>
      </div>

      {/* User Distribution */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-learner/10 rounded-lg">
            <div className="text-2xl font-bold text-learner">{stats.userStats.learners}</div>
            <div className="text-sm text-gray-600">Learners</div>
          </div>
          <div className="text-center p-4 bg-mentor/10 rounded-lg">
            <div className="text-2xl font-bold text-mentor">{stats.userStats.mentors}</div>
            <div className="text-sm text-gray-600">Mentors</div>
          </div>
          <div className="text-center p-4 bg-admin/10 rounded-lg">
            <div className="text-2xl font-bold text-admin">{stats.userStats.admins}</div>
            <div className="text-sm text-gray-600">Admins</div>
          </div>
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <div className="text-2xl font-bold text-success">{stats.userStats.newThisWeek}</div>
            <div className="text-sm text-gray-600">New This Week</div>
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Top Performing Courses</h2>
          {stats.topCourses.length > 0 ? (
            <div className="space-y-4">
              {stats.topCourses.map((course, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">{course.name}</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Enrollments: </span>
                      <span className="font-medium text-nextstep-primary">{course.enrollments}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Completion: </span>
                      <span className="font-medium text-success">{course.completion}%</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.completion}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No course data available</p>
          )}
          <Button variant="admin" fullWidth className="mt-4">
            View All Courses
          </Button>
        </Card>

        {/* Recent Activities & Quick Actions */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Recent System Activity</h2>
            {stats.recentActivities.length > 0 ? (
              <div className="space-y-3">
                {stats.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-admin rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm text-gray-700">{activity}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activities</p>
            )}
            <Button variant="admin" fullWidth className="mt-4">
              View Activity Log
            </Button>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button variant="primary" fullWidth>
                Add New Course
              </Button>
              <Button variant="secondary" fullWidth>
                Manage Users
              </Button>
              <Button variant="warning" fullWidth>
                System Maintenance
              </Button>
              <Button variant="success" fullWidth>
                Generate Reports
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">System Health</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Server Status</span>
                <span className="px-2 py-1 bg-success text-white text-xs rounded-full">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Database</span>
                <span className="px-2 py-1 bg-success text-white text-xs rounded-full">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Enrollments</span>
                <span className="px-2 py-1 bg-success text-white text-xs rounded-full">{stats.systemStats.totalEnrollments}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}