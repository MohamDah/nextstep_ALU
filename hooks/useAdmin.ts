import api from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

interface SystemStats {
  totalUsers: number;
  activeCourses: number;
  certificatesIssued: number;
  totalEnrollments: number;
}

interface UserStats {
  learners: number;
  mentors: number;
  admins: number;
  newThisWeek: number;
}

interface TopCourse {
  name: string;
  enrollments: number;
  completion: number;
}

export interface AdminStats {
  systemStats: SystemStats;
  userStats: UserStats;
  topCourses: TopCourse[];
  recentActivities: string[];
}

export function useAdminStats() {
  return useQuery<AdminStats>({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const { data } = await api.get('/api/admin/stats');
      return data.data;
    },
    // Refetch every 30 seconds to keep stats fresh
    refetchInterval: 30000,
    // Keep previous data while refetching
    placeholderData: (previousData) => previousData,
  });
}
