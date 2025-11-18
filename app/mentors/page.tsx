"use client"
import React from 'react';
import { Card, Button } from '../../components/ui';

export default function MentorsPage() {
  // Mock data for mentors
  const mentors = [
    {
      id: 1,
      name: 'Sarah Mwangi',
      avatar: '👩‍💼',
      title: 'Digital Marketing Expert',
      company: 'Kenyan Digital Solutions',
      expertise: ['Digital Marketing', 'Social Media', 'SEO', 'Content Strategy'],
      experience: '8+ years',
      students: 200,
      rating: 4.9,
      languages: ['English', 'Swahili'],
      bio: 'Helping African entrepreneurs build successful online businesses. Specialized in low-cost marketing strategies perfect for emerging markets.',
      availability: 'Available',
      price: 'Free',
    },
    {
      id: 2,
      name: 'Ahmed Hassan',
      avatar: '👨‍💻',
      title: 'Senior Web Developer',
      company: 'Cairo Tech Hub',
      expertise: ['Web Development', 'JavaScript', 'React', 'Node.js'],
      experience: '10+ years',
      students: 150,
      rating: 4.8,
      languages: ['English', 'Arabic'],
      bio: 'Full-stack developer passionate about teaching coding to African youth. Focus on practical, job-ready skills.',
      availability: 'Available',
      price: 'Free',
    },
    {
      id: 3,
      name: 'Grace Otieno',
      avatar: '👩‍🔬',
      title: 'Mobile App Developer',
      company: 'Nairobi Innovation Labs',
      expertise: ['React Native', 'Flutter', 'iOS Development', 'Android Development'],
      experience: '6+ years',
      students: 120,
      rating: 4.7,
      languages: ['English', 'Swahili'],
      bio: 'Mobile app developer building solutions for African challenges. Mentor focused on practical mobile development skills.',
      availability: 'Limited',
      price: 'Free',
    },
    {
      id: 4,
      name: 'John Kamau',
      avatar: '👨‍💼',
      title: 'E-commerce Specialist',
      company: 'African E-commerce Solutions',
      expertise: ['E-commerce', 'Business Strategy', 'Online Payments', 'Supply Chain'],
      experience: '12+ years',
      students: 180,
      rating: 4.9,
      languages: ['English', 'Swahili'],
      bio: 'E-commerce expert helping small businesses go online. Specialist in African payment systems and logistics.',
      availability: 'Available',
      price: 'Free',
    },
    {
      id: 5,
      name: 'Fatima Al-Hassan',
      avatar: '👩‍🎨',
      title: 'Graphic Designer & Brand Strategist',
      company: 'Cairo Creative Studio',
      expertise: ['Graphic Design', 'Branding', 'UI/UX Design', 'Visual Communication'],
      experience: '7+ years',
      students: 95,
      rating: 4.6,
      languages: ['English', 'Arabic', 'French'],
      bio: 'Creative professional specializing in African-inspired designs. Focus on building strong brands for local businesses.',
      availability: 'Available',
      price: 'Free',
    },
    {
      id: 6,
      name: 'Michael Oduya',
      avatar: '👨‍📊',
      title: 'Data Analyst',
      company: 'Lagos Data Science',
      expertise: ['Data Analysis', 'Excel', 'Python', 'Business Intelligence'],
      experience: '5+ years',
      students: 85,
      rating: 4.8,
      languages: ['English'],
      bio: 'Data analyst helping businesses make informed decisions. Expert in accessible data tools and practical analysis techniques.',
      availability: 'Available',
      price: 'Free',
    },
  ];

  const [selectedExpertise, setSelectedExpertise] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  // Get unique expertise areas
  const expertiseAreas = ['All', ...Array.from(new Set(mentors.flatMap(mentor => mentor.expertise)))];

  const filteredMentors = mentors.filter(mentor => {
    const matchesExpertise = selectedExpertise === 'All' || mentor.expertise.includes(selectedExpertise);
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesExpertise && matchesSearch;
  });

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Connect with Expert Mentors</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized guidance from experienced professionals across Africa. 
            All mentoring is free and designed to help you succeed in your digital journey.
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search mentors by name, title, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary focus:border-transparent"
              />
            </div>

            {/* Expertise Filter */}
            <div>
              <select
                value={selectedExpertise}
                onChange={(e) => setSelectedExpertise(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nextstep-primary"
              >
                {expertiseAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Results Summary */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''} available
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>🟢 Available</span>
            <span>•</span>
            <span>🟡 Limited</span>
            <span>•</span>
            <span>💬 Free</span>
          </div>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMentors.map(mentor => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Mentor Header */}
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{mentor.avatar}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{mentor.name}</h3>
                        <p className="text-mentor font-medium">{mentor.title}</p>
                        <p className="text-sm text-gray-600">{mentor.company}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-sm font-medium">{mentor.rating}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          mentor.availability === 'Available' 
                            ? 'bg-success text-white' 
                            : 'bg-warning text-gray-800'
                        }`}>
                          {mentor.availability}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-700 text-sm">{mentor.bio}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 text-center">
                  <div>
                    <div className="font-medium text-gray-900">{mentor.experience}</div>
                    <div>Experience</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{mentor.students}</div>
                    <div>Students</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{mentor.price}</div>
                    <div>Mentoring</div>
                  </div>
                </div>

                {/* Expertise */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-mentor/10 text-white text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Languages:</p>
                  <p className="text-sm text-gray-600">{mentor.languages.join(', ')}</p>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button 
                    variant="mentor" 
                    className="flex-1"
                    disabled={mentor.availability !== 'Available'}
                  >
                    Connect
                  </Button>
                  <Button variant="secondary">
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMentors.length === 0 && (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find the right mentor for you.
            </p>
            <Button 
              variant="primary" 
              onClick={() => {
                setSearchTerm('');
                setSelectedExpertise('All');
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}

        {/* How Mentorship Works */}
        <Card className="bg-nextstep-primary/10 border-nextstep-primary">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">How Mentorship Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <div className="text-3xl">🤝</div>
                <div className="font-medium">Connect</div>
                <div className="text-gray-600">Find a mentor that matches your goals and expertise needs</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">💬</div>
                <div className="font-medium">Communicate</div>
                <div className="text-gray-600">Schedule regular check-ins and get personalized guidance</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">🎯</div>
                <div className="font-medium">Succeed</div>
                <div className="text-gray-600">Achieve your learning goals with expert support and feedback</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
  );
}