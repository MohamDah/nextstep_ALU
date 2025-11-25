# 🚀 NextStep Africa - Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- pnpm (or npm/yarn)

## Installation Steps

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
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/nextstep

# For MongoDB Atlas (replace <password> and <cluster>)
# MONGODB_URI=mongodb+srv://username:<password>@<cluster>.mongodb.net/nextstep?retryWrites=true&w=majority

JWT_SECRET=your-super-secret-jwt-key-change-in-production
NEXT_PUBLIC_API_URL=http://localhost:3005

# Google Cloud Storage (for course PDF uploads)
GCP_PROJECT_ID=your-gcp-project-id
GCS_BUCKET_NAME=nextstep-courses
GCS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GCS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key\n-----END PRIVATE KEY-----\n"
```

### 3a. Setup Google Cloud Storage

1. **Create GCP Project**
   - Go to https://console.cloud.google.com
   - Create a new project or select existing one

2. **Enable Cloud Storage API**
   - Navigate to APIs & Services
   - Enable Cloud Storage API

3. **Create Storage Bucket**
   - Use the web console to create a bucket

4. **Create Service Account**
   - Go to IAM & Admin → Service Accounts
   - Create new service account
   - Grant "Storage Object Admin" role
   - Create and download JSON key

5. **Configure Environment Variables**
   - Copy values from the JSON key file:
     - `project_id` → `GCP_PROJECT_ID`
     - `client_email` → `GCS_CLIENT_EMAIL`
     - `private_key` → `GCS_PRIVATE_KEY`
   - Set bucket name: `GCS_BUCKET_NAME`

### 4. Seed the Database (Optional but Recommended)

Add sample courses to your database:
```bash
pnpm seed
```

You should see:
```
🌱 Starting database seed...
✅ Cleared existing courses
✅ Inserted 6 courses
🎉 Seed completed successfully!
```

### 5. Start Development Server

```bash
pnpm dev
```

Open http://localhost:3005 in your browser
