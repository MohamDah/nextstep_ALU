'use client';

import React from 'react';
import { Card, Button } from '../../../components/ui';
import ProtectedRoute from '@/components/ProtectedRoute';

function MentorDashboardContent() {
  // Mock data for demo
  const mentorStats = {
    activeMentees: 8,
    totalMentees: 15,
    sessionsThisMonth: 12,
    avgRating: 4.8,
  };

  const activeMentees = [
    {
      id: 1,
      name: 'Amina Ochieng',
      course: 'Digital Marketing',
      progress: 65,
      lastContact: '2 days ago',
      status: 'active',
    },
    {
      id: 2,
      name: 'David Mwangi',
      course: 'Web Development',
      progress: 40,
      lastContact: '1 week ago',
      status: 'needs-attention',
    },
    {
      id: 3,
      name: 'Fatima Al-Hassan',
      course: 'Mobile Development',
      progress: 80,
      lastContact: '1 day ago',
      status: 'active',
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      mentee: 'Amina Ochieng',
      topic: 'Social Media Strategy Review',
      time: 'Today, 2:00 PM',
    },
    {
      id: 2,
      mentee: 'David Mwangi',
      topic: 'HTML/CSS Troubleshooting',
      time: 'Tomorrow, 10:00 AM',
    },
  ];

  return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-mentor to-purple-600 text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome, Mentor!</h1>
          <p className="text-purple-200">
            Guide the next generation of digital leaders. Your mentorship creates lasting impact.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="text-center">
            <div className="text-3xl font-bold text-mentor">{mentorStats.activeMentees}</div>
            <div className="text-sm text-gray-600">Active Mentees</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-nextstep-primary">{mentorStats.totalMentees}</div>
            <div className="text-sm text-gray-600">Total Mentees</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-nextstep-secondary">{mentorStats.sessionsThisMonth}</div>
            <div className="text-sm text-gray-600">Sessions This Month</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-success">{mentorStats.avgRating}</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Your Mentees</h2>
            <div className="space-y-4">
              {activeMentees.map((mentee) => (
                <div key={mentee.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{mentee.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mentee.status === 'active' 
                        ? 'bg-success text-white' 
                        : 'bg-warning text-gray-800'
                    }`}>
                      {mentee.status === 'active' ? 'Active' : 'Needs Attention'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Course: {mentee.course}</p>
                  <p className="text-sm text-gray-600">Last contact: {mentee.lastContact}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{mentee.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-mentor h-2 rounded-full transition-all duration-300"
                        style={{ width: `${mentee.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="mentor" size="sm">
                      Message
                    </Button>
                    <Button variant="secondary" size="sm">
                      Schedule Session
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="primary" fullWidth className="mt-4">
              View All Mentees
            </Button>
          </Card>

          {/* Upcoming Sessions & Quick Actions */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="border-l-4 border-mentor pl-4 py-2">
                    <h3 className="font-medium text-gray-900">{session.topic}</h3>
                    <p className="text-sm text-gray-600">with {session.mentee}</p>
                    <p className="text-sm text-mentor font-medium">{session.time}</p>
                  </div>
                ))}
              </div>
              <Button variant="mentor" fullWidth className="mt-4">
                View All Sessions
              </Button>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button variant="primary" fullWidth>
                  Accept New Mentees
                </Button>
                <Button variant="secondary" fullWidth>
                  Create Resource Material
                </Button>
                <Button variant="success" fullWidth>
                  View Feedback & Ratings
                </Button>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold mb-4">Mentoring Tips</h2>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-mentor rounded-full mt-2 shrink-0"></div>
                  <p>Regular check-ins help maintain momentum</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-mentor rounded-full mt-2 shrink-0"></div>
                  <p>Celebrate small wins with your mentees</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-mentor rounded-full mt-2 shrink-0"></div>
                  <p>Share real-world experiences and examples</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
  );
}

export default function MentorDashboard() {
  return (
    <ProtectedRoute requiredRole="mentor">
      <MentorDashboardContent />
    </ProtectedRoute>
  );
}