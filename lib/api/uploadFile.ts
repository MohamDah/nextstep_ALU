export async function uploadFile(file: File): Promise<{ filename: string; url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'File upload failed');
  }

  const data = await response.json();
  return data.data;
}
