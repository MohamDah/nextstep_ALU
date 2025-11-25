import api from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export interface Mentor {
  _id: string;
  username: string;
  email: string;
  role: 'mentor';
  createdAt: string;
}

export function useMentors(search?: string) {
  return useQuery<Mentor[]>({
    queryKey: ['mentors', search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      
      const { data } = await api.get(`/api/mentors?${params.toString()}`);
      return data.data;
    },
  });
}

export function useMentor(id: string) {
  return useQuery<Mentor>({
    queryKey: ['mentors', id],
    queryFn: async () => {
      const { data } = await api.get(`/api/mentors/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}
