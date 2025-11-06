import React from 'react';
import Layout from '../../../components/Layout';
import { Card, Button } from '../../../components/ui';

export default function LearnerDashboard() {
  // Mock data for demo
  const learnerStats = {
    enrolledCourses: 3,
    completedCourses: 1,
    certificates: 1,
    hoursLearned: 24,
  };

  const enrolledCourses = [
    {
      id: 1,
      title: 'Digital Marketing Fundamentals',
      progress: 75,
      nextLesson: 'Social Media Strategy',
      instructor: 'Sarah Mwangi',
    },
    {
      id: 2,
      title: 'Web Development Basics',
      progress: 45,
      nextLesson: 'HTML & CSS',
      instructor: 'Ahmed Hassan',
    },
    {
      id: 3,
      title: 'Mobile App Development',
      progress: 20,
      nextLesson: 'Introduction to React Native',
      instructor: 'Grace Otieno',
    },
  ];

  const recentActivities = [
    'Completed lesson: "Introduction to SEO"',
    'Enrolled in "Mobile App Development"',
    'Earned certificate for "Basic Computer Skills"',
    'Connected with mentor: John Kamau',
  ];

  return (
    <Layout title="Learner Dashboard" userRole="learner">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-nextstep-primary to-nextstep-primary-light text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Learner!</h1>
          <p className="text-nextstep-primary-light">
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
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-learner h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Next: {course.nextLesson}
                    </span>
                    <Button variant="learner" size="sm">
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="primary" fullWidth className="mt-4">
              Browse More Courses
            </Button>
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
    </Layout>
  );
}