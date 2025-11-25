import api from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export interface Message {
  senderId: string;
  text: string;
  timestamp: string;
  isFirstMessage?: boolean;
}

export interface OtherParticipant {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export interface Conversation {
  _id: string;
  participants: string[];
  messages: Message[];
  status: 'pending' | 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
  otherParticipant: OtherParticipant | null;
}

export function useConversations() {
  return useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: async () => {
      const { data } = await api.get('/api/conversations');
      return data.data;
    },
  });
}

export function useConversation(id: string, pollingInterval = 3000) {
  return useQuery<Conversation>({
    queryKey: ['conversations', id],
    queryFn: async () => {
      const { data } = await api.get(`/api/conversations/${id}`);
      return data.data;
    },
    enabled: !!id,
    refetchInterval: pollingInterval,
  });
}
