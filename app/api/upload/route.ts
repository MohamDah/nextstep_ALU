import { NextRequest } from 'next/server';
import { requireActiveAdmin, apiError, apiResponse } from '@/lib/api/utils';
import { getBucket } from '@/lib/gcs';

export async function POST(request: NextRequest) {
  try {
    const result = await requireActiveAdmin();

    if ('error' in result) {
      return result.error;
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return apiError('No file provided', 400);
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return apiError('Only PDF files are allowed', 400);
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return apiError('File size must be less than 10MB', 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-z0-9.]/gi, '_');
    const filename = `courses/${timestamp}_${sanitizedName}`;

    const bucket = getBucket()
    // Upload to Google Cloud Storage
    const blob = bucket.file(filename);
    
    await blob.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          uploadedBy: user.userId,
          uploadedAt: new Date().toISOString(),
        },
      },
    });

    // Make the file publicly accessible
    await blob.makePublic();

    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

    return apiResponse({ 
      filename: filename,
      url: publicUrl
    }, 201, 'File uploaded successfully');
  } catch (error: unknown) {
    console.error('Upload error:', error);
    return apiError(
      error instanceof Error ? error.message : 'Failed to upload file',
      500
    );
  }
}
