import { EnrollmentWithCourse } from "@/hooks/useEnrollments";
import { useMemo } from "react";

export const useRecentActivity = (enrollments: EnrollmentWithCourse[]) => {
  return useMemo(() => {
      const activities: { message: string; timestamp: Date; type: string }[] = [];
  
      enrollments.forEach(enrollment => {
        const courseName = enrollment.course?.title || 'Unknown Course';
        
        // Activity: Completed course
        if (enrollment.status === 'completed' && enrollment.completedAt) {
          activities.push({
            message: `Earned certificate for "${courseName}"`,
            timestamp: new Date(enrollment.completedAt),
            type: 'completion'
          });
        }
        
        // Activity: Recent lesson completion
        if (enrollment.completedLessons.length > 0) {
          const progress = enrollment.course?.lessons 
            ? Math.round((enrollment.completedLessons.length / enrollment.course.lessons) * 100)
            : 0;
          
          if (progress > 0 && progress < 100) {
            activities.push({
              message: `Completed ${enrollment.completedLessons.length} lesson${enrollment.completedLessons.length > 1 ? 's' : ''} in "${courseName}"`,
              timestamp: new Date(enrollment.updatedAt || enrollment.enrolledAt),
              type: 'progress'
            });
          }
        }
        
        // Activity: Enrollment
        activities.push({
          message: `Enrolled in "${courseName}"`,
          timestamp: new Date(enrollment.enrolledAt),
          type: 'enrollment'
        });
      });
  
      // Sort by timestamp (most recent first) and take top 5
      return activities
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 5)
        .map(activity => activity.message);
    }, [enrollments]);
  
}