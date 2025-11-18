'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Button } from '../components/ui';

export default function Home() {
  // Middleware handles redirect for authenticated users
  const features = [
    {
      title: 'Offline-First Learning',
      description: 'Download courses and learn without internet connectivity. Perfect for areas with limited bandwidth.',
      icon: '📱',
    },
    {
      title: 'Expert Mentorship',
      description: 'Connect with experienced professionals who guide your learning journey and career development.',
      icon: '👨‍🏫',
    },
    {
      title: 'Recognized Certificates',
      description: 'Earn certificates that validate your skills and open doors to employment opportunities.',
      icon: '🏆',
    },
    {
      title: 'Community Support',
      description: 'Join a supportive community of learners, mentors, and peers from across Africa.',
      icon: '🤝',
    },
  ];

  const stats = [
    { number: '1,200+', label: 'Active Learners' },
    { number: '85+', label: 'Expert Mentors' },
    { number: '25+', label: 'Digital Courses' },
    { number: '340+', label: 'Certificates Issued' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Empowering <span className="text-nextstep-primary">Displaced Youth</span><br />
          with <span className="text-nextstep-secondary">Digital Skills</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          NextStep Africa bridges educational gaps, fosters resilience, and empowers learners
          to secure opportunities in freelancing, remote jobs, and entrepreneurship.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Start Learning Today
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-nextstep-primary">{stat.number}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Why Choose NextStep Africa?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Problem Statement */}
      <Card className="bg-gray-50 border-l-4 border-nextstep-primary">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge We Address</h2>
        <p className="text-gray-700 mb-4">
          Displaced youth across Africa face significant barriers to accessing quality education and
          employment opportunities. With over 40 million displaced people in Africa, many lack:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Financial resources for quality education</li>
          <li>Stable internet access for online learning</li>
          <li>Culturally relevant and localized content</li>
          <li>Mentorship and career guidance</li>
        </ul>
        <p className="text-gray-700">
          NextStep Africa is specifically designed to overcome these barriers and create pathways
          to digital opportunities.
        </p>
      </Card>

      {/* User Types */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Join Our Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-learner rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">L</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Learners</h3>
            <p className="text-gray-600 mb-4">
              Access courses, connect with mentors, track progress, and earn certificates
            </p>
            <Link href="/auth/register">
              <Button variant="learner" fullWidth>
                Join as Learner
              </Button>
            </Link>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-mentor rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">M</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Mentors</h3>
            <p className="text-gray-600 mb-4">
              Guide learners, share expertise, and make a lasting impact on lives
            </p>
            <Link href="/auth/register">
              <Button variant="mentor" fullWidth>
                Become a Mentor
              </Button>
            </Link>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-admin rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">A</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Administrators</h3>
            <p className="text-gray-600 mb-4">
              Manage platform content, users, and ensure system reliability
            </p>
            <Link href="/auth/register">
              <Button variant="admin" fullWidth>
                Admin Access
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-linear-to-r from-nextstep-primary to-nextstep-secondary text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Digital Journey?</h2>
        <p className="text-xl mb-6 text-green-100">
          Join thousands of learners building their future with digital skills
        </p>
        <Link href="/auth/register">
          <Button variant="secondary" size="lg">
            Get Started Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
