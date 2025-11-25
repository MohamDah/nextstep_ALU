import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple JWT payload extraction without verification (for edge runtime)
// Full verification happens in API routes
function decodeToken(token: string): { userId: string; email: string; role: string; status: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    
    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }
    
    return payload;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/register'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Home page is special - public but redirects if logged in
  const isHomePage = pathname === '/';

  // Protected routes
  const protectedRoutes = ['/dashboard', '/courses', '/mentors', '/certificates'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // If accessing a protected route
  if (isProtectedRoute) {
    // No token - redirect to login
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    // Decode token (basic check, full verification in API)
    const user = decodeToken(token);
    if (!user) {
      // Invalid or expired token - clear it and redirect to login
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete('token');
      return response;
    }

    // Check role-based access for dashboard routes
    if (pathname.startsWith('/dashboard/')) {
      const role = pathname.split('/')[2]; // Extract role from /dashboard/{role}
      
      // Allow access to status pages
      if (role === 'pending' || role === 'rejected') {
        return NextResponse.next();
      }
      
      if (role && role !== user.role) {
        // User trying to access wrong dashboard - redirect to their dashboard
        return NextResponse.redirect(new URL(`/dashboard/${user.role}`, request.url));
      }
    }
  }

  // If already logged in and trying to access auth pages or home, redirect to dashboard
  if ((isPublicRoute || isHomePage) && token) {
    const user = decodeToken(token);
    if (user) {
      return NextResponse.redirect(new URL(`/dashboard/${user.role}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (they handle their own auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)',
  ],
};
