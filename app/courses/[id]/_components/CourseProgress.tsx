'use client';

import { Course } from '@/hooks/useCourses';
import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { Button } from '@/components/ui';
import { useState, useEffect } from 'react';
import { useEnrollments, useUpdateProgress } from '@/hooks/useEnrollments';
import { generateCertificate } from '@/lib/generateCertificate';
import { useUser } from '@/hooks/useAuth';

interface CourseProgressProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

interface LessonProgress {
  lessonNumber: number;
  completed: boolean;
}

export default function CourseProgress({ course, isOpen, onClose }: CourseProgressProps) {
  const [lessons, setLessons] = useState<LessonProgress[]>([]);
  const { data: enrollments } = useEnrollments();
  const { mutate: updateProgress, isPending: isSaving } = useUpdateProgress();
  const { data: user } = useUser()

  const enrollment = enrollments?.find(e => e.courseId === course._id);

  const handleCertificate = () => {
    if (!course || !user) return

    generateCertificate({
      courseTitle: course.title,
      dateCompleted: new Date().toISOString().split('T')[0],
      instructorName: course.instructor,
      learnerName: user.username
    })
  }


  // Initialize lessons from enrollment data or create new
  useEffect(() => {
    if (enrollment) {
      // Load from backend enrollment data
      const lessonsFromEnrollment: LessonProgress[] = Array.from(
        { length: course.lessons },
        (_, index) => ({
          lessonNumber: index + 1,
          completed: enrollment.completedLessons.includes(index + 1),
        })
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLessons(lessonsFromEnrollment);
    } else {
      // Generate lesson list based on course.lessons count
      const initialLessons: LessonProgress[] = Array.from(
        { length: course.lessons },
        (_, index) => ({
          lessonNumber: index + 1,
          completed: false,
        })
      );
      setLessons(initialLessons);
    }
  }, [enrollment, course.lessons, course._id]);

  // Calculate progress percentage
  const completedCount = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = course.lessons > 0
    ? Math.round((completedCount / course.lessons) * 100)
    : 0;

  // Find the first uncompleted lesson
  const nextLessonNumber = lessons.findIndex(lesson => !lesson.completed) + 1;

  // Check if a lesson can be toggled
  const canToggleLesson = (lessonNumber: number): boolean => {
    const lesson = lessons.find(l => l.lessonNumber === lessonNumber);
    if (!lesson) return false;

    // If already completed, allow unchecking
    if (lesson.completed) {
      return true;
    }

    // If not completed, allow checking only if it's the next lesson
    return lessonNumber === nextLessonNumber;
  };

  // Toggle lesson completion
  const toggleLesson = (lessonNumber: number) => {
    if (!canToggleLesson(lessonNumber)) {
      return;
    }

    const lesson = lessons.find(l => l.lessonNumber === lessonNumber);
    if (!lesson) return;

    if (lesson.completed) {
      // Unchecking - remove this lesson and all after it
      setLessons(prev =>
        prev.map(l =>
          l.lessonNumber >= lessonNumber
            ? { ...l, completed: false }
            : l
        )
      );
    } else {
      // Checking - mark as completed
      setLessons(prev =>
        prev.map(l =>
          l.lessonNumber === lessonNumber
            ? { ...l, completed: true }
            : l
        )
      );
    }
  };

  // Save progress to backend
  const saveProgress = async () => {
    if (!enrollment) {
      console.error('No enrollment found');
      return;
    }

    const completedLessons = lessons
      .filter(lesson => lesson.completed)
      .map(lesson => lesson.lessonNumber);

    updateProgress(
      {
        enrollmentId: enrollment._id,
        completedLessons,
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            onClose();
          }, 500);
        },
        onError: (error) => {
          console.error('Failed to save progress:', error);
          alert('Failed to save progress. Please try again.');
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              Course Progress
            </DialogTitle>
            <Description className="text-gray-600 mb-4">
              Track your learning journey for {course.title}
            </Description>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {completedCount} of {course.lessons} lessons completed
                </span>
                <span className="font-semibold text-nextstep-primary">
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-nextstep-primary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Info Message */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-medium">ℹ️ Complete lessons in order:</span> {' '}
                {progressPercentage === 100
                  ? 'All lessons completed! 🎉'
                  : `Next lesson to complete: Lesson ${nextLessonNumber}`
                }
              </p>
            </div>
          </div>

          {/* Lesson Checklist */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {lessons.map((lesson) => {
                const isClickable = canToggleLesson(lesson.lessonNumber);
                const isNextLesson = lesson.lessonNumber === nextLessonNumber && !lesson.completed;
                const isLocked = !lesson.completed && lesson.lessonNumber > nextLessonNumber;

                return (
                  <button
                    key={lesson.lessonNumber}
                    onClick={() => toggleLesson(lesson.lessonNumber)}
                    disabled={!isClickable}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all relative ${lesson.completed
                      ? 'bg-green-50 border-green-400 text-green-700 cursor-pointer hover:bg-green-100'
                      : isNextLesson
                        ? 'bg-blue-50 border-blue-400 text-blue-700 cursor-pointer hover:bg-blue-100 ring-2 ring-blue-300'
                        : isLocked
                          ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                          : 'bg-white border-gray-200 text-gray-600'
                      }`}
                  >
                    {/* Lock icon for locked lessons */}
                    {isLocked && (
                      <div className="absolute top-2 right-2 text-gray-400">
                        🔒
                      </div>
                    )}

                    {/* Pulse animation for next lesson */}
                    {isNextLesson && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping" />
                    )}

                    <div className="text-2xl font-bold mb-1">
                      {lesson.lessonNumber}
                    </div>
                    {lesson.completed ? (
                      <div className="flex items-center text-xs font-medium">
                        <span>✓</span>
                        <span className="ml-1">Done</span>
                      </div>
                    ) : isNextLesson ? (
                      <div className="text-xs font-medium text-blue-700">
                        Next
                      </div>
                    ) : isLocked ? (
                      <div className="text-xs text-gray-400">
                        Locked
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500">
                        Lesson
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Completion Message */}
            {progressPercentage === 100 && (
              <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg text-center space-y-4">
                <div className="text-4xl mb-2">🎉</div>
                <h4 className="text-lg font-bold text-green-900 mb-1">
                  Congratulations!
                </h4>
                <p className="text-sm text-green-700">
                  You&apos;ve completed all lessons in this course.
                  You&apos;re ready to earn your certificate!
                </p>
                
                {/* Certificate Download Button */}
                <Button
                  variant="success"
                  onClick={handleCertificate}
                  className="mt-3"
                >
                  📜 Download Certificate
                </Button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 flex gap-3">
            <Button
              variant="primary"
              onClick={saveProgress}
              disabled={isSaving || !enrollment}
              className="flex-1"
            >
              {isSaving ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Progress'
              )}
            </Button>
            {progressPercentage === 100 && (
              <Button 
                variant="success" 
                onClick={handleCertificate}
                disabled={isSaving}
              >
                📜 Certificate
              </Button>
            )}
            <Button variant="secondary" onClick={onClose} disabled={isSaving}>
              Close
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
