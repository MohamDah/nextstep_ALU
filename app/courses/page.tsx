"use client"
import React from 'react';
import Layout from '../../components/Layout';
import { Card, Button } from '../../components/ui';

export default function CoursesPage() {
  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: 'Digital Marketing Fundamentals',
      description: 'Learn the basics of digital marketing including SEO, social media, and content marketing. Perfect for beginners looking to enter the digital economy.',
      instructor: 'Sarah Mwangi',
      duration: '6 weeks',
      lessons: 24,
      level: 'Beginner',
      enrolled: 156,
      rating: 4.8,
      category: 'Marketing',
      skills: ['SEO', 'Social Media', 'Content Marketing', 'Email Marketing'],
      isOfflineAvailable: true,
    },
    {
      id: 2,
      title: 'Web Development Basics',
      description: 'Start your journey in web development with HTML, CSS, and JavaScript. Build your first websites and understand how the web works.',
      instructor: 'Ahmed Hassan',
      duration: '8 weeks',
      lessons: 32,
      level: 'Beginner',
      enrolled: 142,
      rating: 4.7,
      category: 'Programming',
      skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      isOfflineAvailable: true,
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Create mobile apps using React Native. Learn to build cross-platform applications for iOS and Android.',
      instructor: 'Grace Otieno',
      duration: '10 weeks',
      lessons: 40,
      level: 'Intermediate',
      enrolled: 98,
      rating: 4.6,
      category: 'Programming',
      skills: ['React Native', 'Mobile Design', 'App Store', 'API Integration'],
      isOfflineAvailable: false,
    },
    {
      id: 4,
      title: 'Data Analysis with Excel',
      description: 'Master Excel for data analysis. Learn formulas, pivot tables, charts, and data visualization techniques.',
      instructor: 'Michael Oduya',
      duration: '4 weeks',
      lessons: 16,
      level: 'Beginner',
      enrolled: 87,
      rating: 4.9,
      category: 'Data Science',
      skills: ['Excel', 'Data Analysis', 'Pivot Tables', 'Charts'],
      isOfflineAvailable: true,
    },
    {
      id: 5,
      title: 'Graphic Design Essentials',
      description: 'Learn graphic design principles using free tools. Create logos, posters, and social media graphics.',
      instructor: 'Fatima Al-Hassan',
      duration: '5 weeks',
      lessons: 20,
      level: 'Beginner',
      enrolled: 73,
      rating: 4.5,
      category: 'Design',
      skills: ['Canva', 'Design Principles', 'Branding', 'Typography'],
      isOfflineAvailable: true,
    },
    {
      id: 6,
      title: 'E-commerce Business Setup',
      description: 'Start your online business. Learn to set up online stores, manage inventory, and handle payments.',
      instructor: 'John Kamau',
      duration: '6 weeks',
      lessons: 24,
      level: 'Intermediate',
      enrolled: 65,
      rating: 4.7,
      category: 'Business',
      skills: ['E-commerce', 'Online Payments', 'Inventory Management', 'Customer Service'],
      isOfflineAvailable: false,
    },
  ];

  const categories = ['All', 'Programming', 'Marketing', 'Design', 'Data Science', 'Business'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedLevel, setSelectedLevel] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <Layout title="Browse Courses" userRole="learner">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Discover Your Next Skill</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our curated selection of courses designed specifically for African learners. 
            All courses support offline learning and provide practical, job-ready skills.
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <div className="space-y-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search courses, skills, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Summary */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>📱 Offline Available</span>
            <span>•</span>
            <span>⭐ Highly Rated</span>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map(course => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Course Header */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600">by {course.instructor}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {course.isOfflineAvailable && (
                      <span className="text-lg" title="Offline Available">📱</span>
                    )}
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Course Description */}
                <p className="text-gray-700 text-sm">{course.description}</p>

                {/* Course Meta */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>📚 {course.lessons} lessons</div>
                  <div>⏱️ {course.duration}</div>
                  <div>🎯 {course.level}</div>
                  <div>👥 {course.enrolled} enrolled</div>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">You&apos;ll learn:</p>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-nextstep-primary bg-opacity-10 text-white text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button variant="primary" className="flex-1">
                    Enroll Now
                  </Button>
                  <Button variant="secondary" size="md">
                    Preview
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you&apos;re looking for.
            </p>
            <Button 
              variant="primary" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}

        {/* Call to Action for Offline Learning */}
        <Card className="bg-nextstep-primary bg-opacity-10 border-nextstep-primary">
          <div className="text-center space-y-4">
            <div className="text-4xl">📱</div>
            <h3 className="text-xl font-semibold text-gray-900">Learn Anywhere, Even Offline</h3>
            <p className="text-gray-700">
              Most of our courses can be downloaded for offline learning. Perfect for areas with 
              limited internet connectivity. Start your course online, then continue learning offline.
            </p>
            <Button variant="primary">
              Learn About Offline Learning
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}