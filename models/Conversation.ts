import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage {
  senderId: string;
  text: string;
  timestamp: Date;
  isFirstMessage?: boolean;
}

export interface IConversation extends Document {
  _id: string;
  participants: string[]; // [learnerId, mentorId]
  messages: IMessage[];
  status: 'pending' | 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  senderId: {
    type: String,
    required: true,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isFirstMessage: {
    type: Boolean,
    default: false,
  },
}, { _id: false });

const ConversationSchema = new Schema<IConversation>(
  {
    participants: {
      type: [String],
      required: true,
      validate: {
        validator: function(v: string[]) {
          return v.length === 2;
        },
        message: 'Conversation must have exactly 2 participants',
      },
    },
    messages: {
      type: [MessageSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'archived'],
      default: 'pending',
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for querying conversations by participant  
ConversationSchema.index({ participants: 1, status: 1 });

// Index for sorting by last message
ConversationSchema.index({ lastMessageAt: -1 });

const Conversation: Model<IConversation> = mongoose.models.Conversation || 
  mongoose.model<IConversation>('Conversation', ConversationSchema);

export default Conversation;
