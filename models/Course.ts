import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourse extends Document {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId?: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  skills: string[];
  isOfflineAvailable: boolean;
  pdfUrl?: string;
  lessons: number;
  enrolled: number;
  rating: number;
  price: string;
  createdAt: Date;
  updatedAt: Date;
  enrolledUsers: string[]; // New field for tracking enrolled users
}

const CourseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
    },
    instructor: {
      type: String,
      required: [true, 'Instructor name is required'],
    },
    instructorId: {
      type: String,
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    skills: {
      type: [String],
      default: [],
    },
    isOfflineAvailable: {
      type: Boolean,
      default: true,
    },
    pdfUrl: {
      type: String,
      required: false,
    },
    lessons: {
      type: Number,
      default: 0,
    },
    enrolled: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    price: {
      type: String,
      default: 'Free',
    },
    enrolledUsers: {
      type: [String], // Array of user IDs
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;