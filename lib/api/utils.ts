import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Get the current user from the request cookies
 */
export async function getCurrentUser(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token'); // Changed from 'auth-token' to 'token'

    if (!token) {
      return null;
    }

    return verifyToken(token.value);
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

/**
 * Create a standardized success response
 */
export function apiResponse<T>(data: T, status = 200, message?: string): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message && { message }),
    },
    { status }
  );
}

/**
 * Create a standardized error response
 */
export function apiError(message: string, status = 400): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
}
