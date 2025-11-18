'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Course {
 _id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId?: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  skills: string[];
  isOfflineAvailable: boolean;
  pdfUrl?: string;
  lessons: number;
  enrolled: number;
  rating: number;
  price: string;
  createdAt: Date;
  updatedAt: Date;
  enrolledUsers: string[];
}

interface CoursesParams {
  category?: string;
  level?: string;
  search?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/**
 * Fetch all courses with optional filters
 */
export function useCourses(params?: CoursesParams) {
  const queryParams = new URLSearchParams();
  
  if (params?.category) queryParams.set('category', params.category);
  if (params?.level) queryParams.set('level', params.level);
  if (params?.search) queryParams.set('search', params.search);

  const queryString = queryParams.toString();

  return useQuery<Course[]>({
    queryKey: ['courses', params],
    queryFn: async () => {
      const res = await fetch(`/api/courses${queryString ? `?${queryString}` : ''}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch courses');
      }
      
      const data: ApiResponse<Course[]> = await res.json();
      return data.data;
    },
  });
}

/**
 * Fetch single course
 */
export function useCourse(id: string) {
  return useQuery<Course>({
    queryKey: ['course', id],
    queryFn: async () => {
      const res = await fetch(`/api/courses/${id}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch course');
      }
      
      const data: ApiResponse<Course> = await res.json();
      return data.data;
    },
    enabled: !!id,
  });
}

/**
 * Create course mutation (admin only)
 */
export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseData: Partial<Course>) => {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      const result: ApiResponse<Course> = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to create course');
      }

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

/**
 * Update course mutation
 */
export function useUpdateCourse(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseData: Partial<Course>) => {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      const result: ApiResponse<Course> = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to update course');
      }

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course', id] });
    },
  });
}

/**
 * Delete course mutation
 */
export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete course');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}
