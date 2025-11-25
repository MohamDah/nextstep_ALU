"use client"
import React, { useState } from 'react';
import { Card, Button } from '../../components/ui';
import { useMentors } from '@/hooks/useMentors';
import { useCreateConversation } from '@/hooks/mutations/useConversations';
import { useConversations } from '@/hooks/useConversations';
import { useUser } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: mentors, isLoading } = useMentors(searchTerm);
  const { data: user } = useUser();
  const { data: conversations } = useConversations();
  const createConversation = useCreateConversation();
  const router = useRouter();

  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [connectMessage, setConnectMessage] = useState('');
  const [showConnectModal, setShowConnectModal] = useState(false);

  const handleConnectClick = (mentorId: string) => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (user.role !== 'learner') {
      alert('Only learners can connect with mentors');
      return;
    }

    setSelectedMentor(mentorId);
    setShowConnectModal(true);
    setConnectMessage('');
  };

  const handleSendRequest = async () => {
    if (!selectedMentor || !connectMessage.trim()) return;

    try {
      const result = await createConversation.mutateAsync({
        mentorId: selectedMentor,
        message: connectMessage.trim(),
      });

      setShowConnectModal(false);
      setConnectMessage('');
      setSelectedMentor(null);

      // Navigate to the conversation
      router.push(`/messages/${result._id}`);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const isAlreadyConnected = (mentorId: string) => {
    return conversations?.some(conv => 
      conv.participants.includes(mentorId)
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner />
        <p className="text-gray-600">Loading mentors...</p>
      </div>
    );
  }

  const filteredMentors = mentors || [];

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Connect with Expert Mentors</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized guidance from experienced professionals. 
            All mentoring is free and designed to help you succeed in your digital journey.
          </p>
        </div>

        {/* Search */}
        <Card>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search mentors by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary focus:border-transparent"
              />
            </div>
          </div>
        </Card>

        {/* Results Summary */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMentors.map(mentor => {
            const alreadyConnected = isAlreadyConnected(mentor._id);
            
            return (
              <Card key={mentor._id} className="hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  {/* Mentor Header */}
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">👤</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{mentor.username}</h3>
                          <p className="text-mentor font-medium">Mentor</p>
                          <p className="text-sm text-gray-600">{mentor.email}</p>
                        </div>
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-success text-white">
                          Available
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-700 text-sm">
                    Experienced mentor ready to help you achieve your learning goals.
                  </p>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    {alreadyConnected ? (
                      <Button 
                        variant="secondary" 
                        className="flex-1"
                        onClick={() => {
                          const conv = conversations?.find(c => c.participants.includes(mentor._id));
                          if (conv) router.push(`/messages/${conv._id}`);
                        }}
                      >
                        View Conversation
                      </Button>
                    ) : (
                      <Button 
                        variant="mentor" 
                        className="flex-1"
                        onClick={() => handleConnectClick(mentor._id)}
                        disabled={createConversation.isPending}
                      >
                        {createConversation.isPending ? 'Connecting...' : 'Connect'}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredMentors.length === 0 && !isLoading && (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms to find the right mentor for you.
            </p>
            <Button 
              variant="primary" 
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </Button>
          </Card>
        )}

        {/* Connect Modal */}
        <Dialog
          open={showConnectModal}
          onClose={() => setShowConnectModal(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <DialogPanel className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">
                Connect with Mentor
              </DialogTitle>
              <Description className="text-gray-600 mb-4">
                Introduce yourself and explain why you&apos;d like to connect. This helps the mentor understand your goals.
              </Description>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={connectMessage}
                    onChange={(e) => setConnectMessage(e.target.value)}
                    placeholder="Hi! I'm interested in learning about... I'd love your guidance on..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary min-h-[120px]"
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {connectMessage.length}/500 characters
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="primary"
                    onClick={handleSendRequest}
                    disabled={!connectMessage.trim() || createConversation.isPending}
                    className="flex-1"
                  >
                    {createConversation.isPending ? 'Sending...' : 'Send Request'}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowConnectModal(false)}
                    disabled={createConversation.isPending}
                  >
                    Cancel
                  </Button>
                </div>

                {createConversation.error && (
                  <p className="text-red-600 text-sm">
                    {createConversation.error.message}
                  </p>
                )}
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* How Mentorship Works */}
        <Card className="bg-nextstep-primary/10 border-nextstep-primary">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">How Mentorship Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <div className="text-3xl">🤝</div>
                <div className="font-medium">Connect</div>
                <div className="text-gray-600">Send a connection request to a mentor that matches your goals</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">💬</div>
                <div className="font-medium">Communicate</div>
                <div className="text-gray-600">Chat with your mentor and get personalized guidance</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">🎯</div>
                <div className="font-medium">Succeed</div>
                <div className="text-gray-600">Achieve your learning goals with expert support and feedback</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
  );
}
