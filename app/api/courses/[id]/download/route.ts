import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import { getCurrentUser, apiError } from '@/lib/api/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return apiError('Unauthorized. Please login to download courses.', 401);
    }

    await connectDB();
    
    const { id } = await params;
    const course = await Course.findById(id);
    
    if (!course) {
      return apiError('Course not found', 404);
    }

    if (!course.isOfflineAvailable) {
      return apiError('This course is not available for offline download', 400);
    }

    if (!course.pdfUrl) {
      return apiError('PDF not available for this course', 404);
    }

    // Get the PDF file path
    const pdfPath = path.join(process.cwd(), 'public', 'courses', course.pdfUrl);

    // Check if file exists
    if (!fs.existsSync(pdfPath)) {
      return apiError('PDF file not found', 404);
    }

    // Read the file
    const fileBuffer = fs.readFileSync(pdfPath);

    // Return the PDF file
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${course.title.replace(/[^a-z0-9]/gi, '_')}.pdf"`,
      },
    });
  } catch (error: unknown) {
    console.error('Download course error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to download course',
      500
    );
  }
}
