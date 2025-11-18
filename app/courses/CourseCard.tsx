import { Course } from '@/hooks/useCourses'
import Link from 'next/link';
import { Card, Button } from '../../components/ui';
import { handleDownload } from '@/lib/api/handleDownload';
import { useEnrollments } from '@/hooks/useEnrollments';

export default function CourseCard({ course }: { course: Course }) {
  const {data: enrollments} = useEnrollments()

  const isEnrolled = enrollments?.find(i => i.courseId === course._id)
  
  return (
    <Card key={course._id} className="flex flex-col h-full">
      <div className="flex-1 space-y-4">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
            <div className="flex gap-2">
              {isEnrolled && (
                <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  Enrolled
                </span>
              )}
              <span className={`px-2 py-1 rounded text-xs font-medium ${course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                {course.level}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600">{course.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Instructor:</span>
            <span className="ml-2">{course.instructor}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Duration:</span>
            <span className="ml-2">{course.duration}</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
          <div className="flex flex-wrap gap-2">
            {course.skills.map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-nextstep-primary-light text-white text-xs rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {course.isOfflineAvailable && (
          <div className="inline-flex items-center text-sm text-green-600">
            <span className="mr-1">📱</span>
            Available offline
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Link href={`/courses/${course._id}`}>
          <Button variant="primary" fullWidth>View Course</Button>
        </Link>
        {course.isOfflineAvailable && course.pdfUrl && (
          <Button variant="secondary" fullWidth onClick={() => handleDownload(course._id, course.title)}>
            Download PDF
          </Button>
        )}
      </div>
    </Card>
  )
}
