import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Conversation from '@/models/Conversation';
import User from '@/models/User';
import { apiResponse, apiError, getCurrentUser } from '@/lib/api/utils';

/**
 * GET /api/conversations - Get all conversations for the current user
 */
export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return apiError('Not authenticated', 401);
    }

    await connectDB();

    // Find all conversations where user is a participant
    const conversations = await Conversation.find({
      participants: currentUser.userId,
    })
      .sort({ lastMessageAt: -1 })
      .lean();

    // Populate participant details
    const conversationsWithDetails = await Promise.all(
      conversations.map(async (conv) => {
        const otherParticipantId = conv.participants.find(
          (id) => id !== currentUser.userId
        );

        const otherUser = await User.findById(otherParticipantId).select(
          'username email role'
        );

        return {
          ...conv,
          otherParticipant: otherUser
            ? {
                _id: otherUser._id,
                username: otherUser.username,
                email: otherUser.email,
                role: otherUser.role,
              }
            : null,
        };
      })
    );

    return apiResponse(conversationsWithDetails);
  } catch (error: unknown) {
    console.error('Get conversations error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to fetch conversations',
      500
    );
  }
}

/**
 * POST /api/conversations - Create a new conversation
 */
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return apiError('Not authenticated', 401);
    }

    await connectDB();

    const body = await request.json();
    const { mentorId, message } = body;

    if (!mentorId || !message) {
      return apiError('Mentor ID and message are required', 400);
    }

    // Verify mentor exists and is actually a mentor
    const mentor = await User.findById(mentorId);
    if (!mentor) {
      return apiError('Mentor not found', 404);
    }

    if (mentor.role !== 'mentor') {
      return apiError('User is not a mentor', 400);
    }

    // Check if conversation already exists
    const existingConversation = await Conversation.findOne({
      participants: { $all: [currentUser.userId, mentorId] },
    });

    if (existingConversation) {
      return apiError('Conversation already exists', 409);
    }

    // Create new conversation with first message
    const conversation = await Conversation.create({
      participants: [currentUser.userId, mentorId],
      messages: [
        {
          senderId: currentUser.userId,
          text: message,
          timestamp: new Date(),
          isFirstMessage: true,
        },
      ],
      status: 'pending',
      lastMessageAt: new Date(),
    });

    return apiResponse(conversation, 201, 'Connection request sent');
  } catch (error: unknown) {
    console.error('Create conversation error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to create conversation',
      500
    );
  }
}
