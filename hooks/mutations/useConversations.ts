import { ApiResponse } from "@/lib/api/utils";
import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Conversation } from "../useConversations";

interface CreateConversationParams {
  mentorId: string;
  message: string;
}

interface SendMessageParams {
  conversationId: string;
  text: string;
}

interface UpdateConversationParams {
  conversationId: string;
  status: 'active' | 'archived';
}

const createConversation = async (params: CreateConversationParams) => {
  const { data } = await api.post<ApiResponse<Conversation>>('/api/conversations', params);
  return data.data;
};

const sendMessage = async ({ conversationId, text }: SendMessageParams) => {
  const { data } = await api.post<ApiResponse<Conversation>>(
    `/api/conversations/${conversationId}`,
    { text }
  );
  return data.data;
};

const updateConversationStatus = async ({ conversationId, status }: UpdateConversationParams) => {
  const { data } = await api.patch<ApiResponse<Conversation>>(
    `/api/conversations/${conversationId}`,
    { status }
  );
  return data.data;
};

export function useCreateConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createConversation,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ["conversations"] }),
        queryClient.invalidateQueries({ queryKey: ["conversations", data._id] }),
      ]);
    },
  });
}

export function useUpdateConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateConversationStatus,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}
