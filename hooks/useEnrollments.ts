'use client';

import api from '@/lib/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Enrollment {
  _id: string;
  userId: string;
  courseId: string;
  completedLessons: number[];
  status: 'in-progress' | 'completed';
  enrolledAt: string;
  completedAt?: string;
  updatedAt?: string;
  createdAt?: string;
  course?: {
    title: string;
    instructor: string;
    duration: string;
  };
}

export interface EnrollmentWithCourse extends Enrollment {
  course?: {
    _id: string;
    title: string;
    instructor: string;
    duration: string;
    lessons: number;
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
 * Fetch user's enrollments with course details
 */
export function useEnrollmentsWithCourses() {
  return useQuery<EnrollmentWithCourse[]>({
    queryKey: ['enrollments', 'with-courses'],
    queryFn: async () => {
      const res = await fetch('/api/enrollments?populate=course');
      
      if (!res.ok) {
        throw new Error('Failed to fetch enrollments');
      }
      
      const data: ApiResponse<EnrollmentWithCourse[]> = await res.json();
      return data.data;
    },
  });
}

/**
 * Fetch single enrollment by ID
 */
export function useEnrollment(enrollmentId: string) {
  return useQuery<Enrollment>({
    queryKey: ['enrollment', enrollmentId],
    queryFn: async () => {
      const res = await fetch(`/api/enrollments/${enrollmentId}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch enrollment');
      }
      
      const data: ApiResponse<Enrollment> = await res.json();
      return data.data;
    },
    enabled: !!enrollmentId,
  });
}

/**
 * Update enrollment progress
 */
export function useUpdateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      enrollmentId,
      completedLessons,
    }: {
      enrollmentId: string;
      completedLessons: number[];
    }) => {
      const {data: result} = await api.patch(`/api/enrollments/${enrollmentId}`, { completedLessons });

      return result.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate enrollments list
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      // Invalidate specific enrollment
      queryClient.invalidateQueries({ queryKey: ['enrollment', variables.enrollmentId] });
    },
  });
}