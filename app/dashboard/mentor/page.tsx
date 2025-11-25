'use client';

import React from 'react';
import { Card, Button } from '../../../components/ui';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useConversations } from '@/hooks/useConversations';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function MentorDashboardContent() {
  const { data: conversations, isLoading } = useConversations();
  const { data: user } = useUser();
  const router = useRouter();

  const pendingRequests = conversations?.filter(c => c.status === 'pending') || [];
  const activeConversations = conversations?.filter(c => c.status === 'active') || [];

  const mentorStats = {
    activeMentees: activeConversations.length,
    totalMentees: conversations?.length || 0,
    pendingRequests: pendingRequests.length,
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner />
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-mentor to-purple-600 text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome, {user?.username}!</h1>
          <p className="text-purple-200">
            Guide the next generation of digital leaders. Your mentorship creates lasting impact.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center">
            <div className="text-3xl font-bold text-mentor">{mentorStats.activeMentees}</div>
            <div className="text-sm text-gray-600">Active Conversations</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-nextstep-primary">{mentorStats.totalMentees}</div>
            <div className="text-sm text-gray-600">Total Connections</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-warning">{mentorStats.pendingRequests}</div>
            <div className="text-sm text-gray-600">Pending Requests</div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Requests */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Pending Connection Requests</h2>
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">✅</div>
                <p>No pending requests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((conv) => (
                  <div key={conv._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {conv.otherParticipant?.username || 'Unknown Learner'}
                        </h3>
                        <p className="text-sm text-gray-600">{conv.otherParticipant?.email}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-warning text-gray-800">
                        New
                      </span>
                    </div>
                    {conv.messages.length > 0 && (
                      <p className="text-sm text-gray-700 mb-3 italic">
                        &quot;{conv.messages[0].text.substring(0, 100)}
                        {conv.messages[0].text.length > 100 ? '...' : ''}&quot;
                      </p>
                    )}
                    <Button
                      variant="mentor"
                      size="sm"
                      fullWidth
                      onClick={() => router.push(`/messages/${conv._id}`)}
                    >
                      View & Respond
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Active Conversations */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Active Conversations</h2>
            {activeConversations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">💬</div>
                <p>No active conversations yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeConversations.slice(0, 5).map((conv) => {
                  const lastMessage = conv.messages[conv.messages.length - 1];
                  return (
                    <div key={conv._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">
                          {conv.otherParticipant?.username || 'Unknown Learner'}
                        </h3>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-success text-white">
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Last message: {new Date(conv.lastMessageAt).toLocaleDateString()}
                      </p>
                      {lastMessage && (
                        <p className="text-sm text-gray-700 mb-3">
                          {lastMessage.text.substring(0, 60)}
                          {lastMessage.text.length > 60 ? '...' : ''}
                        </p>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        fullWidth
                        onClick={() => router.push(`/messages/${conv._id}`)}
                      >
                        Open Chat
                      </Button>
                    </div>
                  );
                })}
                {activeConversations.length > 5 && (
                  <p className="text-center text-sm text-gray-500">
                    +{activeConversations.length - 5} more conversations
                  </p>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Mentoring Tips */}
        <Card className="bg-mentor/10 border-mentor">
          <h2 className="text-xl font-semibold mb-4">Mentoring Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-mentor rounded-full mt-2 shrink-0"></div>
              <p>Respond to new requests within 24 hours to show commitment</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-mentor rounded-full mt-2 shrink-0"></div>
              <p>Ask questions to understand learner goals and challenges</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-mentor rounded-full mt-2 shrink-0"></div>
              <p>Celebrate small wins and provide encouragement</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-mentor rounded-full mt-2 shrink-0"></div>
              <p>Share real-world experiences and practical advice</p>
            </div>
          </div>
        </Card>
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
