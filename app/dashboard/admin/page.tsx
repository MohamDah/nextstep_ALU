import React from 'react';
import Layout from '../../../components/Layout';
import { Card, Button } from '../../../components/ui';

export default function AdminDashboard() {
  // Mock data for demo
  const systemStats = {
    totalUsers: 1248,
    activeCourses: 25,
    certificatesIssued: 342,
    systemUptime: '99.8%',
  };

  const userStats = {
    learners: 1050,
    mentors: 85,
    admins: 8,
    newThisWeek: 47,
  };

  const recentActivities = [
    'New course "Blockchain Basics" added by Ahmed Hassan',
    '15 new learners registered today',
    'Certificate issued to Amina Ochieng for Digital Marketing',
    'Mentor John Kamau completed profile verification',
    'System maintenance scheduled for next weekend',
  ];

  const topCourses = [
    { name: 'Digital Marketing Fundamentals', enrollments: 156, completion: 78 },
    { name: 'Web Development Basics', enrollments: 142, completion: 65 },
    { name: 'Mobile App Development', enrollments: 98, completion: 52 },
    { name: 'Data Analysis with Excel', enrollments: 87, completion: 82 },
  ];

  return (
    <Layout title="Admin Dashboard" userRole="admin">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-admin to-red-600 text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Admin Control Center</h1>
          <p className="text-red-200">
            Manage the NextStep Africa platform and empower our community of learners.
          </p>
        </div>

        {/* System Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="text-center">
            <div className="text-3xl font-bold text-admin">{systemStats.totalUsers}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-nextstep-primary">{systemStats.activeCourses}</div>
            <div className="text-sm text-gray-600">Active Courses</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-nextstep-secondary">{systemStats.certificatesIssued}</div>
            <div className="text-sm text-gray-600">Certificates Issued</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-success">{systemStats.systemUptime}</div>
            <div className="text-sm text-gray-600">System Uptime</div>
          </Card>
        </div>

        {/* User Distribution */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-learner bg-opacity-10 rounded-lg">
              <div className="text-2xl font-bold text-learner">{userStats.learners}</div>
              <div className="text-sm text-gray-600">Learners</div>
            </div>
            <div className="text-center p-4 bg-mentor bg-opacity-10 rounded-lg">
              <div className="text-2xl font-bold text-mentor">{userStats.mentors}</div>
              <div className="text-sm text-gray-600">Mentors</div>
            </div>
            <div className="text-center p-4 bg-admin bg-opacity-10 rounded-lg">
              <div className="text-2xl font-bold text-admin">{userStats.admins}</div>
              <div className="text-sm text-gray-600">Admins</div>
            </div>
            <div className="text-center p-4 bg-success bg-opacity-10 rounded-lg">
              <div className="text-2xl font-bold text-success">{userStats.newThisWeek}</div>
              <div className="text-sm text-gray-600">New This Week</div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Top Performing Courses</h2>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
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
            <Button variant="admin" fullWidth className="mt-4">
              View All Courses
            </Button>
          </Card>

          {/* Recent Activities & Quick Actions */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-semibold mb-4">Recent System Activity</h2>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-admin rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm text-gray-700">{activity}</p>
                  </div>
                ))}
              </div>
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
                  <span className="text-sm text-gray-600">Storage</span>
                  <span className="px-2 py-1 bg-warning text-gray-800 text-xs rounded-full">85% Used</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}