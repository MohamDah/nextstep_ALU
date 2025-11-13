import mongoose from 'mongoose';
import connectDB from '../lib/mongodb';
import Course from '../models/Course';

const sampleCourses = [
  {
    title: 'Digital Marketing Fundamentals',
    description: 'Learn the basics of digital marketing including SEO, social media, and content marketing. Perfect for beginners looking to enter the digital economy.',
    instructor: 'Sarah Mwangi',
    duration: '6 weeks',
    lessons: 24,
    level: 'Beginner',
    category: 'Marketing',
    skills: ['SEO', 'Social Media', 'Content Marketing', 'Email Marketing'],
    isOfflineAvailable: true,
    enrolled: 156,
    rating: 4.8,
    price: 'Free',
  },
  {
    title: 'Web Development Basics',
    description: 'Start your journey in web development with HTML, CSS, and JavaScript. Build your first websites and understand how the web works.',
    instructor: 'Ahmed Hassan',
    duration: '8 weeks',
    lessons: 32,
    level: 'Beginner',
    category: 'Programming',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    isOfflineAvailable: true,
    enrolled: 142,
    rating: 4.7,
    price: 'Free',
  },
  {
    title: 'Mobile App Development',
    description: 'Create mobile apps using React Native. Learn to build cross-platform applications for iOS and Android.',
    instructor: 'Grace Otieno',
    duration: '10 weeks',
    lessons: 40,
    level: 'Intermediate',
    category: 'Programming',
    skills: ['React Native', 'Mobile Design', 'App Store', 'API Integration'],
    isOfflineAvailable: false,
    enrolled: 98,
    rating: 4.6,
    price: 'Free',
  },
  {
    title: 'Data Analysis with Excel',
    description: 'Master Excel for data analysis. Learn formulas, pivot tables, charts, and data visualization techniques.',
    instructor: 'Michael Oduya',
    duration: '4 weeks',
    lessons: 16,
    level: 'Beginner',
    category: 'Data Science',
    skills: ['Excel', 'Data Analysis', 'Pivot Tables', 'Charts'],
    isOfflineAvailable: true,
    enrolled: 87,
    rating: 4.9,
    price: 'Free',
  },
  {
    title: 'Graphic Design Essentials',
    description: 'Learn graphic design principles using free tools. Create logos, posters, and social media graphics.',
    instructor: 'Fatima Al-Hassan',
    duration: '5 weeks',
    lessons: 20,
    level: 'Beginner',
    category: 'Design',
    skills: ['Canva', 'Design Principles', 'Branding', 'Typography'],
    isOfflineAvailable: true,
    enrolled: 73,
    rating: 4.5,
    price: 'Free',
  },
  {
    title: 'E-commerce Business Setup',
    description: 'Start your online business. Learn to set up online stores, manage inventory, and handle payments.',
    instructor: 'John Kamau',
    duration: '6 weeks',
    lessons: 24,
    level: 'Intermediate',
    category: 'Business',
    skills: ['E-commerce', 'Online Payments', 'Inventory Management', 'Customer Service'],
    isOfflineAvailable: false,
    enrolled: 65,
    rating: 4.7,
    price: 'Free',
  },
];

async function seed() {
  try {
    console.log('🌱 Starting database seed...');
    
    await connectDB();
    
    // Clear existing courses
    await Course.deleteMany({});
    console.log('✅ Cleared existing courses');
    
    // Insert sample courses
    const courses = await Course.insertMany(sampleCourses);
    console.log(`✅ Inserted ${courses.length} courses`);
    
    console.log('🎉 Seed completed successfully!');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();