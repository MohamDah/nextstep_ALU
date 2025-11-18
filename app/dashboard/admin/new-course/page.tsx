'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Card, Button } from '@/components/ui';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useCreateCourse } from '@/hooks/useCourses';
import { uploadFile } from '@/lib/api/uploadFile';

interface CourseFormData {
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  skills: string;
  isOfflineAvailable: boolean;
  lessons: number;
  price: string;
}

function NewCourseContent() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CourseFormData>({
    defaultValues: {
      level: 'Beginner',
      isOfflineAvailable: true,
      price: 'Free',
      lessons: 0,
    },
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const createCourse = useCreateCourse();
  const isOfflineAvailable = watch('isOfflineAvailable');

  const onSubmit = async (data: CourseFormData) => {
    try {
      setUploadError(null);
      let pdfUrl: string | undefined;

      // Upload PDF if provided and offline available
      if (pdfFile && data.isOfflineAvailable) {
        setIsUploading(true);
        try {
          const uploadResult = await uploadFile(pdfFile);
          pdfUrl = uploadResult.filename;
        } catch (error) {
          setUploadError(error instanceof Error ? error.message : 'File upload failed');
          setIsUploading(false);
          return;
        }
        setIsUploading(false);
      }

      // Parse skills from comma-separated string
      const skillsArray = data.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

      // Create course
      await createCourse.mutateAsync({
        ...data,
        skills: skillsArray,
        pdfUrl,
      });

      // Redirect to courses page
      router.push('/courses');
    } catch (error) {
      console.error('Failed to create course:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        setUploadError('Please select a PDF file');
        setPdfFile(null);
        return;
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setUploadError('File size must be less than 10MB');
        setPdfFile(null);
        return;
      }

      setUploadError(null);
      setPdfFile(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
        <p className="text-gray-600 mt-2">
          Add a new course to the NextStep Africa platform
        </p>
      </div>

      {/* Form */}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Error Messages */}
          {createCourse.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {createCourse.error.message}
            </div>
          )}

          {uploadError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {uploadError}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Title *
              </label>
              <input
                type="text"
                {...register('title', { required: 'Course title is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary"
                placeholder="e.g., Web Development Basics"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary"
                placeholder="Describe what students will learn in this course..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructor Name *
                </label>
                <input
                  type="text"
                  {...register('instructor', { required: 'Instructor name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary"
                  placeholder="e.g., John Doe"
                />
                {errors.instructor && (
                  <p className="text-red-500 text-sm mt-1">{errors.instructor.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration *
                </label>
                <input
                  type="text"
                  {...register('duration', { required: 'Duration is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary"
                  placeholder="e.g., 8 weeks"
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Course Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level *
                </label>
                <select
                  {...register('level')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary"
                >
                  <option value="">Select category</option>
                  <option value="Programming">Programming</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Business">Business</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Lessons
                </label>
                <input
                  type="number"
                  {...register('lessons', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills (comma-separated) *
              </label>
              <input
                type="text"
                {...register('skills', { required: 'At least one skill is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary"
                placeholder="e.g., HTML, CSS, JavaScript, React"
              />
              {errors.skills && (
                <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Separate each skill with a comma
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="text"
                {...register('price')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary"
                placeholder="Free"
              />
            </div>
          </div>

          {/* Offline Availability */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Offline Access</h3>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                {...register('isOfflineAvailable')}
                className="mt-1"
              />
              <div>
                <label className="font-medium text-gray-900">
                  Make available for offline download
                </label>
                <p className="text-sm text-gray-600">
                  Students will be able to download this course as a PDF for offline learning
                </p>
              </div>
            </div>

            {isOfflineAvailable && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course PDF (Optional)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary"
                />
                {pdfFile && (
                  <p className="text-sm text-green-600 mt-1">
                    ✓ {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Maximum file size: 10MB. Only PDF files are allowed.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 border-t">
            <Button
              type="submit"
              variant="primary"
              disabled={createCourse.isPending || isUploading}
              className="flex-1"
            >
              {isUploading ? 'Uploading PDF...' : createCourse.isPending ? 'Creating Course...' : 'Create Course'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              disabled={createCourse.isPending || isUploading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function NewCoursePage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <NewCourseContent />
    </ProtectedRoute>
  );
}
