'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Enrollment {
  _id: string;
  userId: string;
  courseId: string;
  progress: number;
  completed: boolean;
  enrolledAt: string;
  completedAt?: string;
  course?: {
    title: string;
    instructor: string;
    duration: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/**
 * Fetch user's enrollments
 */
export function useEnrollments() {
  return useQuery<Enrollment[]>({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const res = await fetch('/api/enrollments');
      
      if (!res.ok) {
        throw new Error('Failed to fetch enrollments');
      }
      
      const data: ApiResponse<Enrollment[]> = await res.json();
      return data.data;
    },
  });
}

/**
 * Enroll in a course
 */
export function useEnroll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });

      const result: ApiResponse<Enrollment> = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to enroll');
      }

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}