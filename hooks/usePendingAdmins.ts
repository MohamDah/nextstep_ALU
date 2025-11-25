'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';

interface PendingAdmin {
  _id: string;
  username: string;
  email: string;
  role: 'admin';
  status: 'pending' | 'rejected';
  createdAt: string;
}

interface PendingAdminsResponse {
  success: boolean;
  data: {
    pending: PendingAdmin[];
    rejected: PendingAdmin[];
  };
}

/**
 * Fetch pending and rejected admins
 */
export function usePendingAdmins() {
  return useQuery<{ pending: PendingAdmin[]; rejected: PendingAdmin[] }>({
    queryKey: ['pending-admins'],
    queryFn: async () => {
      const { data } = await api.get<PendingAdminsResponse>('/api/admin/users/pending');
      return data.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

/**
 * Approve a pending admin
 */
export function useApproveAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await api.post(`/api/admin/users/${userId}/approve`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-admins'] });
    },
  });
}

/**
 * Reject a pending admin
 */
export function useRejectAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await api.post(`/api/admin/users/${userId}/reject`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-admins'] });
    },
  });
}
