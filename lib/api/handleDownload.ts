import api from "../axios";

/**
 * Download course
 */
export const handleDownload = async (courseId: string, courseTitle: string) => {
    try {
      const response = await api.get(`/api/courses/${courseId}/download`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${courseTitle.replace(/[^a-z0-9]/gi, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to download course');
      console.error('Download error:', err);
    }
  };