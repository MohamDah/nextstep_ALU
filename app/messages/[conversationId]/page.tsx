'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, Button } from '@/components/ui';
import { useConversation } from '@/hooks/useConversations';
import { useSendMessage } from '@/hooks/mutations/useConversations';
import { useUser } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function ChatContent() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.conversationId as string;
  
  const { data: conversation, isLoading } = useConversation(conversationId);
  const { data: user } = useUser();
  const sendMessage = useSendMessage();
  
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    try {
      await sendMessage.mutateAsync({
        conversationId,
        text: messageText.trim(),
      });
      setMessageText('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner />
        <p className="text-gray-600">Loading conversation...</p>
      </div>
    );
  }

  if (!conversation) {
    return (
      <Card className="text-center py-12">
        <div className="text-6xl mb-4">💬</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Conversation not found</h3>
        <p className="text-gray-600 mb-4">
          This conversation doesn&apos;t exist or you don&apos;t have access to it.
        </p>
        <Button variant="primary" onClick={() => router.back()}>
          Go Back
        </Button>
      </Card>
    );
  }

  const otherParticipant = conversation.otherParticipant;
  const isPending = conversation.status === 'pending';
  const isMentor = user?.role === 'mentor';

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => router.back()}
            >
              ← Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {otherParticipant?.username || 'Unknown User'}
              </h1>
              <p className="text-sm text-gray-600">
                {otherParticipant?.role === 'mentor' ? 'Mentor' : 'Learner'}
              </p>
            </div>
          </div>
          {isPending && isMentor && (
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-warning text-gray-800">
              Pending Request
            </div>
          )}
          {conversation.status === 'active' && (
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-success text-white">
              Active
            </div>
          )}
        </div>
      </Card>

      {/* Messages */}
      <Card className="min-h-[500px] max-h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversation.messages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-2">💬</div>
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            conversation.messages.map((message, index) => {
              const isOwnMessage = message.senderId === user?.id;
              const isFirstMessage = message.isFirstMessage;

              return (
                <div
                  key={index}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      isOwnMessage
                        ? 'bg-nextstep-primary text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {isFirstMessage && !isOwnMessage && (
                      <div className="text-xs opacity-75 mb-1 font-medium">
                        Connection Request
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap break-all">{message.text}</p>
                    <p className={`text-xs mt-1 ${isOwnMessage ? 'text-white/70' : 'text-gray-500'}`}>
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (Press Enter to send)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary resize-none"
              rows={2}
              maxLength={1000}
            />
            <Button
              variant="primary"
              onClick={handleSendMessage}
              disabled={!messageText.trim() || sendMessage.isPending}
            >
              {sendMessage.isPending ? 'Sending...' : 'Send'}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {messageText.length}/1000 characters
          </p>
          {sendMessage.error && (
            <p className="text-red-600 text-sm mt-2">
              {sendMessage.error.message}
            </p>
          )}
        </div>
      </Card>

      {/* Info */}
      {isPending && isMentor && (
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">ℹ️</div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">New Connection Request</h3>
              <p className="text-sm text-gray-600">
                This learner has requested to connect with you. Reply to their message to activate the conversation.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <ChatContent />
    </ProtectedRoute>
  );
}
