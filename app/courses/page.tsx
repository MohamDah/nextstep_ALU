'use client';

import { useState } from 'react';
import { Card } from '../../components/ui';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useCourses } from '@/hooks/useCourses';
import CourseCard from './CourseCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function CoursesContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: courses, isLoading, error } = useCourses({
    category: selectedCategory,
    level: selectedLevel,
    search: searchQuery,
  });

  const categories = ['All', 'Programming', 'Marketing', 'Design', 'Data Science', 'Business'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Discover Courses</h1>
          <p className="text-gray-600 mt-2">
            Explore our catalog of digital skills courses
          </p>
        </div>

        <Card>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === 'All' ? '' : cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      (cat === 'All' && !selectedCategory) || selectedCategory === cat
                        ? 'bg-nextstep-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <div className="flex flex-wrap gap-2">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl === 'All' ? '' : lvl)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      (lvl === 'All' && !selectedLevel) || selectedLevel === lvl
                        ? 'bg-nextstep-secondary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {isLoading && (
          <div className="text-center py-12">
            <LoadingSpinner />
            <p className="text-gray-600">Loading courses...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Failed to load courses
          </div>
        )}

        {!isLoading && !error && courses && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => <CourseCard key={course._id} course={course} />)}
          </div>
        )}
      </div>
  );
}

export default function CoursesPage() {
  return (
    <ProtectedRoute>
      <CoursesContent />
    </ProtectedRoute>
  );
}
