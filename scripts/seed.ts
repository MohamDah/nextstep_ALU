import mongoose from 'mongoose';
import Course from '../models/Course';
import connectDB from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';


const seedCourses = async () => {
  const courses = [
    {
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming using Python.',
      instructor: 'John Doe',
      duration: '6 weeks',
      level: 'Beginner',
      category: 'Programming',
      skills: ['Python', 'Problem Solving'],
      lessons: 12,
      enrolled: 0,
      rating: 4.5,
      pdfUrl: 'courses/1763816050762_sample_local_pdf.pdf'
    },
    {
      title: 'Advanced Web Development',
      description: 'Master modern web development techniques.',
      instructor: 'Jane Smith',
      duration: '8 weeks',
      level: 'Advanced',
      category: 'Web Development',
      skills: ['React', 'Node.js', 'GraphQL'],
      lessons: 18,
      enrolled: 0,
      rating: 4.8,
      pdfUrl: 'courses/1763816050762_sample_local_pdf.pdf'
    },
    {
      title: 'Data Science Fundamentals',
      description: 'Introduction to data analysis and machine learning.',
      instructor: 'Dr. Sarah Johnson',
      duration: '10 weeks',
      level: 'Intermediate',
      category: 'Data Science',
      skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning'],
      lessons: 20,
      enrolled: 0,
      rating: 4.7,
      pdfUrl: 'courses/1763816050762_sample_local_pdf.pdf'
    },
    {
      title: 'Mobile App Development with React Native',
      description: 'Build cross-platform mobile applications.',
      instructor: 'Michael Chen',
      duration: '7 weeks',
      level: 'Intermediate',
      category: 'Mobile Development',
      skills: ['React Native', 'JavaScript', 'Mobile UI/UX'],
      lessons: 15,
      enrolled: 0,
      rating: 4.6,
      pdfUrl: 'courses/1763816050762_sample_local_pdf.pdf'
    },
    {
      title: 'DevOps Engineering Essentials',
      description: 'Learn CI/CD, containerization, and cloud deployment.',
      instructor: 'Alex Martinez',
      duration: '9 weeks',
      level: 'Advanced',
      category: 'DevOps',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      lessons: 22,
      enrolled: 0,
      rating: 4.9,
      pdfUrl: 'courses/1763816050762_sample_local_pdf.pdf'
    },
    {
      title: 'UI/UX Design Principles',
      description: 'Master user interface and user experience design.',
      instructor: 'Emily Brown',
      duration: '5 weeks',
      level: 'Beginner',
      category: 'Design',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      lessons: 10,
      enrolled: 0,
      rating: 4.4,
      pdfUrl: 'courses/1763816050762_sample_local_pdf.pdf'
    },
    {
      title: 'Cybersecurity Fundamentals',
      description: 'Learn to protect systems and networks from cyber threats.',
      instructor: 'David Wilson',
      duration: '8 weeks',
      level: 'Intermediate',
      category: 'Security',
      skills: ['Network Security', 'Ethical Hacking', 'Cryptography'],
      lessons: 16,
      enrolled: 0,
      rating: 4.7,
      pdfUrl: 'courses/1763816050762_sample_local_pdf.pdf'
    },
    {
      title: 'Full Stack JavaScript Development',
      description: 'Build complete web applications from frontend to backend.',
      instructor: 'Lisa Anderson',
      duration: '12 weeks',
      level: 'Intermediate',
      category: 'Web Development',
      skills: ['JavaScript', 'TypeScript', 'Next.js', 'MongoDB'],
      lessons: 25,
      enrolled: 0,
      rating: 4.8,
      pdfUrl: 'courses/1763816050762_sample_local_pdf.pdf'
    },
    {
      title: 'Cloud Architecture with AWS',
      description: 'Design and deploy scalable cloud solutions.',
      instructor: 'Robert Taylor',
      duration: '10 weeks',
      level: 'Advanced',
      category: 'Cloud Computing',
      skills: ['AWS', 'Cloud Architecture', 'Serverless', 'Infrastructure as Code'],
      lessons: 20,
      enrolled: 0,
      rating: 4.9,
      pdfUrl: 'courses/1763816050762_sample_local_pdf.pdf'
    },
    {
      title: 'Artificial Intelligence and Deep Learning',
      description: 'Explore neural networks and AI applications.',
      instructor: 'Dr. Karen Lee',
      duration: '14 weeks',
      level: 'Advanced',
      category: 'Artificial Intelligence',
      skills: ['TensorFlow', 'PyTorch', 'Deep Learning', 'Computer Vision'],
      lessons: 28,
      enrolled: 0,
      rating: 4.9,
      pdfUrl: 'courses/1763816050762_sample_local_pdf.pdf'
    },
    {
      title: 'Database Design and SQL',
      description: 'Master relational databases and SQL queries.',
      instructor: 'Thomas Garcia',
      duration: '6 weeks',
      level: 'Beginner',
      category: 'Database',
      skills: ['SQL', 'PostgreSQL', 'Database Design', 'Data Modeling'],
      lessons: 14,
      enrolled: 0,
      rating: 4.5,
      pdfUrl: 'courses/1763816050762_sample_local_pdf.pdf'
    },
    {
      title: 'Agile Project Management',
      description: 'Learn Scrum, Kanban, and agile methodologies.',
      instructor: 'Patricia Martinez',
      duration: '4 weeks',
      level: 'Beginner',
      category: 'Project Management',
      skills: ['Scrum', 'Kanban', 'Agile', 'Team Leadership'],
      lessons: 8,
      enrolled: 0,
      rating: 4.3,
      pdfUrl: 'courses/1763816050762_sample_local_pdf.pdf'
    }
  ];

  try {
    await connectDB()


    console.log('Clearing existing courses...');
    await Course.deleteMany({});

    await Enrollment.deleteMany({})

    console.log('Seeding new courses...');
    await Course.insertMany(courses);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
  }
};

seedCourses();