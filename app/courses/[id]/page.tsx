'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '../../../components/Layout';
import { Card, Button } from '../../../components/ui';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id;

  // Mock data - in real app, this would come from API based on courseId
  const course = {
    id: courseId,
    title: 'Digital Marketing Fundamentals',
    description: 'Master the essentials of digital marketing in this comprehensive course designed for African entrepreneurs and displaced youth. Learn practical skills that can immediately be applied to start your own business or secure remote work opportunities.',
    instructor: {
      name: 'Sarah Mwangi',
      avatar: '👩‍💼',
      bio: 'Digital Marketing Expert with 8+ years experience helping African businesses grow online. Mentor to 200+ successful entrepreneurs.',
      rating: 4.9,
      students: 1200,
    },
    duration: '6 weeks',
    lessons: 24,
    level: 'Beginner',
    enrolled: 156,
    rating: 4.8,
    category: 'Marketing',
    price: 'Free',
    skills: ['SEO', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'Google Analytics', 'Facebook Ads'],
    isOfflineAvailable: true,
    estimatedHours: 30,
    certificate: true,
    language: 'English with Swahili subtitles',
  };

  const lessons = [
    {
      id: 1,
      title: 'Introduction to Digital Marketing',
      duration: '45 min',
      type: 'video',
      completed: true,
      preview: true,
    },
    {
      id: 2,
      title: 'Understanding Your African Market',
      duration: '30 min',
      type: 'video',
      completed: true,
      preview: false,
    },
    {
      id: 3,
      title: 'Setting Up Your Online Presence',
      duration: '60 min',
      type: 'video',
      completed: false,
      preview: false,
    },
    {
      id: 4,
      title: 'Social Media Strategy for African Businesses',
      duration: '50 min',
      type: 'video',
      completed: false,
      preview: true,
    },
    {
      id: 5,
      title: 'Content Creation on a Budget',
      duration: '40 min',
      type: 'video',
      completed: false,
      preview: false,
    },
    {
      id: 6,
      title: 'Mobile-First Marketing Strategies',
      duration: '35 min',
      type: 'video',
      completed: false,
      preview: false,
    },
    // More lessons would be here...
  ];

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  const handleEnroll = () => {
    setIsEnrolled(true);
    setShowEnrollmentModal(true);
  };

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  return (
    <Layout title={course.title} userRole="learner">
      <div className="space-y-6">
        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <span>{course.category}</span>
                <span>•</span>
                <span>{course.level}</span>
                <span>•</span>
                <span>{course.language}</span>
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
                <span>⏱️</span>
                <span>{course.estimatedHours} hours</span>
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
            {isEnrolled && (
              <Card>
                <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Completed: {completedLessons} of {lessons.length} lessons</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-success h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Keep going! You&apos;re making great progress.
                  </p>
                </div>
              </Card>
            )}
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
                    <div className="bg-success bg-opacity-10 text-success px-4 py-2 rounded-lg">
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
                
                <div className="text-xs text-gray-500">
                  30-day money-back guarantee
                </div>
              </div>
            </Card>

            {/* Instructor */}
            <Card>
              <h3 className="text-lg font-semibold mb-3">Your Instructor</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{course.instructor.avatar}</div>
                  <div>
                    <div className="font-medium">{course.instructor.name}</div>
                    <div className="text-sm text-gray-600">
                      {course.instructor.rating} ⭐ ({course.instructor.students} students)
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{course.instructor.bio}</p>
                <Button variant="secondary" size="sm" fullWidth>
                  View Profile
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Course Content */}
        <Card>
          <h3 className="text-xl font-semibold mb-4">Course Content</h3>
          <div className="space-y-1">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-sm font-medium">
                    {lesson.completed ? (
                      <span className="text-success">✓</span>
                    ) : (
                      <span className="text-gray-500">{index + 1}</span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{lesson.title}</div>
                    <div className="text-sm text-gray-600">{lesson.duration}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {lesson.preview && (
                    <span className="text-xs text-nextstep-primary bg-nextstep-primary bg-opacity-10 px-2 py-1 rounded">
                      Preview
                    </span>
                  )}
                  {isEnrolled || lesson.preview ? (
                    <Button variant="primary" size="sm">
                      {lesson.completed ? 'Review' : 'Watch'}
                    </Button>
                  ) : (
                    <Button variant="secondary" size="sm" disabled>
                      Locked
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Enrollment Success Modal */}
        {showEnrollmentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowEnrollmentModal(false)}>
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
    </Layout>
  );
}