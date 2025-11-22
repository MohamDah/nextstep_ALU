import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnrollment extends Document {
  _id: string;
  userId: string;
  courseId: string;
  completedLessons: number[]; // Array of completed lesson numbers
  status: 'in-progress' | 'completed';
  enrolledAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
    courseId: {
      type: String,
      required: [true, 'Course ID is required'],
      ref: 'Course',
    },
    completedLessons: {
      type: [Number],
      default: [],
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed'],
      default: 'in-progress',
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure a user can only enroll once per course
EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const Enrollment: Model<IEnrollment> = mongoose.models.Enrollment || mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);

export default Enrollment;