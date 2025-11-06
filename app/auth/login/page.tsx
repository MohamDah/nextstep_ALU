'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Card, Input } from '../../../components/ui';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // For demo purposes, we'll just redirect to dashboard
    // In a real app, you'd authenticate with a backend
    alert('Login successful! (This is a demo)');
    window.location.href = '/dashboard/learner';
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
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Continue your learning journey
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Enter your password"
              fullWidth
            />
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="mt-6"
            >
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-nextstep-primary hover:text-nextstep-primary-dark font-medium">
                Register here
              </Link>
            </p>
          </div>
        </Card>

        {/* Demo Login Options */}
        <Card className="mt-6" padding="sm">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Access:</h3>
          <div className="space-y-2">
            <Button
              variant="learner"
              size="sm"
              fullWidth
              onClick={() => window.location.href = '/dashboard/learner'}
            >
              Login as Learner
            </Button>
            <Button
              variant="mentor"
              size="sm"
              fullWidth
              onClick={() => window.location.href = '/dashboard/mentor'}
            >
              Login as Mentor
            </Button>
            <Button
              variant="admin"
              size="sm"
              fullWidth
              onClick={() => window.location.href = '/dashboard/admin'}
            >
              Login as Administrator
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}