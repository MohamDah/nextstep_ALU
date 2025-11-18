import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import { getCurrentUser, apiError } from '@/lib/api/utils';
import { getBucket } from '@/lib/gcs';

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

    const bucket = getBucket()
    // Get file from GCS
    const file = bucket.file(course.pdfUrl);
    
    // Check if file exists
    const [exists] = await file.exists();
    if (!exists) {
      return apiError('PDF file not found', 404);
    }

    // Download file content
    const [fileBuffer] = await file.download();

    // Get metadata
    const [metadata] = await file.getMetadata();

    // Return the PDF file
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new NextResponse(fileBuffer as any, {
      headers: {
        'Content-Type': metadata.contentType || 'application/pdf',
        'Content-Disposition': `attachment; filename="${course.title.replace(/[^a-z0-9]/gi, '_')}.pdf"`,
        'Content-Length': metadata.size?.toString() || '',
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
