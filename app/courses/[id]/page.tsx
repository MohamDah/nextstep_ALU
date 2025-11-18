'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, Button } from '../../../components/ui';
import { useCourse } from '@/hooks/useCourses';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useEnrollMutation } from '@/hooks/mutations/useEnroll';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id;

  const { data: course, isLoading, error } = useCourse(courseId as string);
  const { data: enrollments } = useEnrollments()
  const { mutateAsync: enroll } = useEnrollMutation()

  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  const enrollment = enrollments?.find(i => i.courseId === courseId)
  const isEnrolled = !!enrollment

  const handleEnroll = async () => {
    try {
      await enroll({ courseId: courseId as string });
      setShowEnrollmentModal(true);
    } catch (error) {
      console.error('Enrollment failed:', error);
      alert('Failed to enroll in the course. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nextstep-primary mx-auto mb-4"></div>
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
              <div className="text-3xl font-bold text-nextstep-primary">{course.price}</div>

              {!isEnrolled ? (
                <>
                  <Button variant="primary" size="lg" fullWidth onClick={handleEnroll}>
                    Enroll Now
                  </Button>
                  <Button variant="secondary" fullWidth>
                    Preview Course
                  </Button>
                </>
              ) : (
                <>
                  <div className="bg-success/10 text-success px-4 py-2 rounded-lg">
                    ✓ You&apos;re enrolled!
                  </div>
                  <Button variant="primary" fullWidth>
                    Continue Learning
                  </Button>
                  <Button variant="secondary" fullWidth>
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
      {showEnrollmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowEnrollmentModal(false)}>
          <Card className="max-w-md w-full m-4">
            <div className="text-center space-y-4">
              <div className="text-6xl">🎉</div>
              <h3 className="text-xl font-semibold">Welcome to the Course!</h3>
              <p className="text-gray-600">
                You&apos;ve successfully enrolled in {course.title}. Start learning right away or download for offline access.
              </p>
              <div className="space-y-2">
                <Button variant="primary" fullWidth onClick={() => setShowEnrollmentModal(false)}>
                  Start Learning Now
                </Button>
                <Button variant="secondary" fullWidth onClick={() => setShowEnrollmentModal(false)}>
                  Download for Offline
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}