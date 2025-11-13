'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'learner' | 'mentor' | 'admin';
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: 'learner' | 'mentor' | 'admin';
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/**
 * Fetch current user
 */
export function useUser() {
  return useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const { data } = await api.get<ApiResponse<User>>('/api/auth/me');
        return data.data;
      } catch {
        return null;
      }
    },
    retry: false,
  });
}

/**
 * Login mutation
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginData) => {
      const { data } = await api.post<ApiResponse<{ user: User; token: string }>>(
        '/api/auth/login',
        credentials
      );
      return data.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      router.push(`/dashboard/${data.user.role}`);
    },
  });
}

/**
 * Register mutation
 */
export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (userData: RegisterData) => {
      const { data } = await api.post<ApiResponse<{ user: User; token: string }>>(
        '/api/auth/register',
        userData
      );
      return data.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      router.push(`/dashboard/${data.user.role}`);
    },
  });
}

/**
 * Logout mutation
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await api.post('/api/auth/logout');
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.clear();
      router.push('/auth/login');
    },
  });
}
