'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Card, Input } from '../../../components/ui';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'learner' as 'learner' | 'mentor' | 'admin',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // For demo purposes, we'll just redirect to dashboard
    // In a real app, you'd register with a backend
    alert(`Registration successful! Welcome ${formData.username}! (This is a demo)`);
    window.location.href = `/dashboard/${formData.role}`;
  };

  const roleDescriptions = {
    learner: 'Access courses, connect with mentors, and earn certificates',
    mentor: 'Guide learners, share expertise, and build community',
    admin: 'Manage platform content, users, and system operations',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-nextstep-primary mb-2">
            NextStep Africa
          </h1>
          <h2 className="text-xl text-gray-600">
            Join Our Community
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Empowering displaced youth with digital skills
          </p>
        </div>

        {/* Registration Form */}
        <Card className="shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              placeholder="Choose a username"
              fullWidth
            />
            
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Enter your email"
              fullWidth
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Create a password"
              helperText="Must be at least 6 characters"
              fullWidth
            />
            
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Confirm your password"
              fullWidth
            />
            
            {/* Role Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Choose Your Role
              </label>
              <div className="space-y-2">
                {(['learner', 'mentor', 'admin'] as const).map((role) => (
                  <label key={role} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={formData.role === role}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900 capitalize">
                        {role}
                      </div>
                      <div className="text-sm text-gray-500">
                        {roleDescriptions[role]}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="mt-6"
            >
              Create Account
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-nextstep-primary hover:text-nextstep-primary-dark font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}