# NextStep Africa

> Empowering displaced youth across Africa with accessible digital skills education

**Live Demo:** [https://nextstep-orcin.vercel.app](https://nextstep-orcin.vercel.app)

## 🌟 Overview

NextStep Africa is an offline-first learning platform designed specifically for displaced youth and refugees across Africa. The platform bridges educational gaps by providing digital skills training, mentorship opportunities, and recognized certifications - even in areas with limited internet connectivity.

## 🚀 Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS
- React Query (TanStack Query)
- React Hook Form

**Backend:**
- Next.js API Routes
- MongoDB (Mongoose ODM)
- JWT Authentication
- Google Cloud Storage (PDF uploads)

**Deployment:**
- Vercel (Frontend & API)
- MongoDB Atlas (Database)
- GCS (File Storage)

## ✨ Key Features

- **Offline-First Learning:** Download courses for offline access
- **Role-Based Access:** Learners, Mentors, and Admins with specific capabilities
- **Real-Time Messaging:** Direct mentor-learner communication
- **Course Management:** Upload PDFs, track progress, manage enrollments
- **Certificate Generation:** Automated certificate creation on course completion
- **Admin Dashboard:** Platform analytics and user management
- **Responsive Design:** Works seamlessly on mobile and desktop

## 🛠️ Quick Start Guide

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- pnpm (or npm/yarn)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup MongoDB

**MongoDB Atlas**

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### 3. Configure Environment Variables

Copy the example file:
```bash
cp env.example .env.local
```

Edit `.env.local`:
```sh
# MongoDB
MONGODB_URI=mongodb+srv://username:<password>@<cluster>.mongodb.net/nextstep

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NEXT_PUBLIC_API_URL=http://localhost:3005

# Google Cloud Storage (for course PDF uploads)
GCP_PROJECT_ID=your-gcp-project-id
GCS_BUCKET_NAME=nextstep-courses
GCS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GCS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key\n-----END PRIVATE KEY-----\n"
```

### 3a. Setup Google Cloud Storage

1. Create GCP project at https://console.cloud.google.com
2. Enable Cloud Storage API
3. Create storage bucket
4. Create service account with "Storage Object Admin" role
5. Download JSON key and add credentials to `.env.local`

### 4. Seed the Database

Add sample courses:
```bash
pnpm seed
```

### 5. Start Development Server

```bash
pnpm dev
```

Open http://localhost:3005

## 👥 User Roles

- **Learner:** Browse courses, enroll, connect with mentors, earn certificates
- **Mentor:** Guide learners, respond to requests, provide mentorship
- **Admin:** Manage courses, users, and platform content (requires approval)

## 🚀 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Built to empower displaced youth across Africa with digital skills and opportunities.

---

- **Contact:** mohammedfaiseldhb@gmail.com
- **Website:** https://nextstep-orcin.vercel.app
