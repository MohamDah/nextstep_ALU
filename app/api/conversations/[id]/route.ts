import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Conversation from '@/models/Conversation';
import User from '@/models/User';
import { apiResponse, apiError, getCurrentUser } from '@/lib/api/utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/conversations/[id] - Get a specific conversation with messages
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return apiError('Not authenticated', 401);
    }

    await connectDB();

    const { id } = await params;

    const conversation = await Conversation.findById(id).lean();

    if (!conversation) {
      return apiError('Conversation not found', 404);
    }

    // Verify user is a participant
    if (!conversation.participants.includes(currentUser.userId)) {
      return apiError('Unauthorized to access this conversation', 403);
    }

    // Get other participant details
    const otherParticipantId = conversation.participants.find(
      (id) => id !== currentUser.userId
    );

    const otherUser = await User.findById(otherParticipantId).select(
      'username email role'
    );

    return apiResponse({
      ...conversation,
      otherParticipant: otherUser
        ? {
            _id: otherUser._id,
            username: otherUser.username,
            email: otherUser.email,
            role: otherUser.role,
          }
        : null,
    });
  } catch (error: unknown) {
    console.error('Get conversation error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to fetch conversation',
      500
    );
  }
}

/**
 * POST /api/conversations/[id] - Send a message in a conversation
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return apiError('Not authenticated', 401);
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { text } = body;

    if (!text || !text.trim()) {
      return apiError('Message text is required', 400);
    }

    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return apiError('Conversation not found', 404);
    }

    // Verify user is a participant
    if (!conversation.participants.includes(currentUser.userId)) {
      return apiError('Unauthorized to send messages in this conversation', 403);
    }

    // Add message to conversation
    conversation.messages.push({
      senderId: currentUser.userId,
      text: text.trim(),
      timestamp: new Date(),
    });

    // Update status to active if it was pending and this is from the mentor
    if (conversation.status === 'pending') {
      const [, mentorId] = conversation.participants;
      if (currentUser.userId === mentorId) {
        conversation.status = 'active';
      }
    }

    conversation.lastMessageAt = new Date();
    await conversation.save();

    return apiResponse(conversation, 201, 'Message sent');
  } catch (error: unknown) {
    console.error('Send message error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to send message',
      500
    );
  }
}

/**
 * PATCH /api/conversations/[id] - Update conversation status
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return apiError('Not authenticated', 401);
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['active', 'archived'].includes(status)) {
      return apiError('Valid status is required (active or archived)', 400);
    }

    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return apiError('Conversation not found', 404);
    }

    // Verify user is a participant
    if (!conversation.participants.includes(currentUser.userId)) {
      return apiError('Unauthorized to update this conversation', 403);
    }

    conversation.status = status;
    await conversation.save();

    return apiResponse(conversation, 200, 'Conversation status updated');
  } catch (error: unknown) {
    console.error('Update conversation error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to update conversation',
      500
    );
  }
}
