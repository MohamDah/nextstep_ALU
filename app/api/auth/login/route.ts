import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken, apiResponse, apiError } from '@/lib/api/utils';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return apiError('Email and password are required', 400);
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return apiError('Invalid email or password', 401);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return apiError('Invalid email or password', 401);
    }

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
      200,
      'Login successful'
    );
  } catch (error: unknown) {
    console.error('Login error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Login failed',
      500
    );
  }
}
