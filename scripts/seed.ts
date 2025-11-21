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
      isOfflineAvailable: true,
      lessons: 12,
      enrolled: 0,
      rating: 4.5,
      price: 'Free',
    },
    {
      title: 'Advanced Web Development',
      description: 'Master modern web development techniques.',
      instructor: 'Jane Smith',
      duration: '8 weeks',
      level: 'Advanced',
      category: 'Web Development',
      skills: ['React', 'Node.js', 'GraphQL'],
      isOfflineAvailable: false,
      lessons: 18,
      enrolled: 0,
      rating: 4.8,
      price: '$99',
    },
  ];

  try {
    await connectDB()

    await Enrollment.deleteMany({})
    return 
    console.log('Clearing existing courses...');
    await Course.deleteMany({});

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