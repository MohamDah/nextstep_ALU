import { cookies } from 'next/headers';
import { apiResponse } from '@/lib/api/utils';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('token');

    return apiResponse(null, 200, 'Logged out successfully');
  } catch (error: unknown) {
    console.error('Logout error:', error);
    return apiResponse(null, 500, 'Logout failed');
  }
}