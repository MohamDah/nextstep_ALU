'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, Button } from '../../../components/ui';
import { useCourse } from '@/hooks/useCourses';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useEnrollMutation } from '@/hooks/mutations/useEnroll';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { handleDownload } from '@/lib/api/handleDownload';
import CourseProgress from './_components/CourseProgress';
import { generateCertificate } from '@/lib/generateCertificate';
import { useUser } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id;

  const { data: course, isLoading, error } = useCourse(courseId as string);
  const { data: enrollments } = useEnrollments()
  const { mutateAsync: enroll, isPending: isEnrolling, error: enrollError } = useEnrollMutation()

  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [localEnrollError, setLocalEnrollError] = useState<string | null>(null);

  const enrollment = enrollments?.find(i => i.courseId === courseId)
  const isEnrolled = !!enrollment

  // Calculate progress
  const completedCount = enrollment?.completedLessons.length || 0;
  const progressPercentage = course && course.lessons > 0
    ? Math.round((completedCount / course.lessons) * 100)
    : 0;

  const handleEnroll = async () => {
    try {
      setLocalEnrollError(null);
      await enroll({ courseId: courseId as string });
      setShowEnrollmentModal(true);
    } catch (error) {
      console.error('Enrollment failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to enroll in the course. Please try again.';
      setLocalEnrollError(errorMessage);
    }
  };

  const { data: user } = useUser();

  const handleCertificate = () => {
    if (!course || !user) return;

    generateCertificate({
      courseTitle: course.title,
      dateCompleted: new Date().toISOString().split('T')[0],
      instructorName: course.instructor,
      learnerName: user.username
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner />
        <p className="text-gray-600">Loading course details...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load course details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <span>{course.category}</span>
              <span>•</span>
              <span>{course.level}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-gray-700 text-lg">{course.description}</p>
          </div>

          {/* Course Stats */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span>⭐</span>
              <span>{course.rating} ({course.enrolled} students)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📚</span>
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📱</span>
              <span>Offline available</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🏆</span>
              <span>Certificate included</span>
            </div>
          </div>

          {/* Course Progress (if enrolled) */}
          {isEnrolled && enrollment && (
            <Card>
              <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
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
                {progressPercentage === 100 ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-success">
                      <span>🎉</span>
                      <span className="font-medium">Course completed!</span>
                    </div>
                    <Button
                      variant="success"
                      fullWidth
                      onClick={handleCertificate}
                    >
                      📜 Claim Certificate
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    Keep going! You&apos;re making great progress.
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* What You'll Learn */}
          <Card>
            <h3 className="text-xl font-semibold mb-4">What you&apos;ll learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-success">✓</span>
                  <span className="text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Course Progress (if enrolled) */}
          {/* Progress UI omitted: no per-lesson progress in schema */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Enrollment Card */}
          <Card className="sticky top-4">
            <div className="text-center space-y-4">

              {/* Enrollment Error */}
              {(enrollError || localEnrollError) && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                  {localEnrollError || (enrollError instanceof Error ? enrollError.message : 'Enrollment failed')}
                </div>
              )}

              {!isEnrolled ? (
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleEnroll}
                    disabled={isEnrolling}
                  >
                    {isEnrolling ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enrolling...
                      </span>
                    ) : (
                      'Enroll Now'
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <div className="bg-success/10 text-success px-4 py-2 rounded-lg">
                    ✓ You&apos;re enrolled!
                  </div>
                  <Button 
                    variant="primary" 
                    fullWidth
                    onClick={() => setShowProgressModal(true)}
                  >
                    Track Progress
                  </Button>
                  <Button variant="secondary" fullWidth onClick={() => handleDownload(course._id, course.title)}>
                    Download for Offline
                  </Button>
                </>
              )}

            </div>
          </Card>

          {/* Instructor */}
          <Card>
            <h3 className="text-lg font-semibold mb-3">Your Instructor</h3>
            <div className="space-y-2">
              <div className="font-medium">{course.instructor}</div>
              <div className="text-sm text-gray-600">Experienced instructor</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Course Content */}
      <Card>
        <h3 className="text-xl font-semibold mb-4">Course Content</h3>
        <p className="text-gray-700">This course includes {course.lessons} lessons.</p>
      </Card>

      {/* Enrollment Success Modal */}
      <Dialog
        open={showEnrollmentModal}
        onClose={() => setShowEnrollmentModal(false)}
        className="relative z-50"
      >
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <DialogPanel>
            <Card className="max-w-md w-full m-4">
              <div className="text-center space-y-4">
                <div className="text-6xl">🎉</div>
                <DialogTitle className="text-xl font-semibold">Welcome to the Course!</DialogTitle>
                <Description className="text-gray-600">
                  You&apos;ve successfully enrolled in {course.title}. Start learning right away or download for offline access.
                </Description>
                <div className="space-y-2">
                  <Button variant="primary" fullWidth onClick={() => setShowEnrollmentModal(false)}>
                    Start Learning Now
                  </Button>
                  <Button variant="secondary" fullWidth onClick={() => handleDownload(course._id, course.title)}>
                    Download for Offline
                  </Button>
                </div>
              </div>
            </Card>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Course Progress Modal */}
      {course && (
        <CourseProgress
          course={course}
          isOpen={showProgressModal}
          onClose={() => setShowProgressModal(false)}
        />
      )}
    </div>
  );
}