import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken, apiResponse, apiError } from '@/lib/api/utils';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { username, email, password, role = 'learner' } = body;

    // Validation
    if (!username || !email || !password) {
      return apiError('Username, email, and password are required', 400);
    }

    if (password.length < 6) {
      return apiError('Password must be at least 6 characters', 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return apiError('User with this email or username already exists', 409);
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      role,
    });

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return apiResponse(
      {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token,
      },
      201,
      'User registered successfully'
    );
  } catch (error: unknown) {
    console.error('Registration error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Registration failed',
      500
    );
  }
}
