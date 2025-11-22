import { Button, Card } from '@/components/ui'
import { EnrollmentWithCourse } from '@/hooks/useEnrollments';
import { useRouter } from 'next/navigation';
import { generateCertificate } from '@/lib/generateCertificate';
import { useUser } from '@/hooks/useAuth';

export default function MyCourseCard({ enrollment }: { enrollment: EnrollmentWithCourse }) {
  const router = useRouter();
  const { data: user } = useUser();

  const progress = enrollment.course?.lessons
    ? Math.round((enrollment.completedLessons.length / enrollment.course.lessons) * 100)
    : 0;

  const nextLessonNumber = enrollment.completedLessons.length + 1;
  const isCompleted = enrollment.status === 'completed' || progress === 100;

  const course = {
    id: enrollment._id,
    title: enrollment.course?.title || 'Unknown Course',
    progress,
    nextLesson: `Lesson ${nextLessonNumber}`,
    instructor: enrollment.course?.instructor || 'Unknown Instructor',
    courseId: enrollment.courseId,
  };

  const handleCertificate = () => {
    if (!enrollment.course || !user) return;

    generateCertificate({
      courseTitle: enrollment.course.title,
      dateCompleted: enrollment.completedAt 
        ? new Date(enrollment.completedAt).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      instructorName: enrollment.course.instructor,
      learnerName: user.username
    });
  };

  return (
    <Card className={`border rounded-lg p-4 ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
      <div className="flex items-start justify-between">
        <h3 className="font-medium text-gray-900">{course.title}</h3>
        {isCompleted && (
          <span className="px-2 py-1 bg-success text-white text-xs rounded-full flex items-center gap-1">
            🎉 Completed
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
      
      <div className="mt-2">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span className={isCompleted ? 'text-success font-semibold' : ''}>{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isCompleted ? 'bg-success' : 'bg-learner'
            }`}
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>

      {isCompleted ? (
        <div className="mt-3 flex gap-2">
          <Button
            variant="success"
            size="sm"
            fullWidth
            onClick={handleCertificate}
          >
            📜 Download Certificate
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push(`/courses/${course.courseId}`)}
          >
            Review
          </Button>
        </div>
      ) : (
        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Next: {course.nextLesson}
          </span>
          <Button
            variant="learner"
            size="sm"
            onClick={() => router.push(`/courses/${course.courseId}`)}
          >
            Continue
          </Button>
        </div>
      )}
    </Card>
  )
}
