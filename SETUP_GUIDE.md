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

**Option A: Local MongoDB**

Install and start MongoDB:
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu
sudo apt install mongodb
sudo systemctl start mongodb

# Windows
# Download from mongodb.com and install
```

**Option B: MongoDB Atlas (Cloud - Recommended for beginners)**

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### 3. Configure Environment Variables

Copy the example file:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
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
   ```bash
   # Using gcloud CLI
   gcloud storage buckets create gs://nextstep-courses --location=us-central1
   ```
   Or use the web console to create a bucket

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

## 🎯 Testing the Backend

### Test Registration

1. Go to http://localhost:3005/auth/register
2. Fill in the form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Role: Select any role
3. Click "Create Account"
4. You should be redirected to the dashboard

### Test Login

1. Go to http://localhost:3005/auth/login
2. Use the credentials you just created
3. Click "Sign In"

### View Courses

1. Navigate to http://localhost:3005/courses
2. You should see all seeded courses
3. Try filtering by category or level

### Test API Directly

Using curl:
```bash
# Register a new user
curl -X POST http://localhost:3005/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"apitest","email":"apitest@example.com","password":"password123","role":"learner"}'

# Login
curl -X POST http://localhost:3005/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"apitest@example.com","password":"password123"}'

# Get all courses
curl http://localhost:3005/api/courses
```

## 📚 Available API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses (with optional filters)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (admin only)
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Enrollments
- `GET /api/enrollments` - Get user's enrollments
- `POST /api/enrollments` - Enroll in a course

## 🛠 Using React Query Hooks

The project includes custom hooks that make API calls super easy:

```tsx
// In your component
import { useLogin, useUser } from '@/hooks/useAuth';
import { useCourses } from '@/hooks/useCourses';

function MyComponent() {
  // Get current user
  const { data: user, isLoading } = useUser();
  
  // Get all courses
  const { data: courses } = useCourses();
  
  // Login mutation
  const login = useLogin();
  
  const handleLogin = () => {
    login.mutate({ email, password });
  };
  
  return (
    <div>
      {user ? `Welcome ${user.username}` : 'Not logged in'}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
```

## 🔧 Troubleshooting

### MongoDB connection error

**Error:** `MongoServerError: Authentication failed`

**Solution:**
- Check your MONGODB_URI is correct
- For Atlas, ensure password doesn't have special characters
- Make sure you whitelisted your IP in Atlas

### Port already in use

**Error:** `EADDRINUSE: address already in use :::3005`

**Solution:**
```bash
# Find and kill the process
lsof -i :3005
kill -9 <PID>

# Or use a different port
pnpm dev -- -p 3006
```

### JWT token issues

**Error:** Token verification failed

**Solution:**
- Clear your browser cookies
- Make sure JWT_SECRET is set in .env.local
- Try logging in again

## 📝 Next Steps

1. **Add More Models**: Create models for Mentors, Certificates, etc.
2. **Add Middleware**: Protect routes with authentication middleware
3. **File Uploads**: Add course material uploads
4. **Real-time Features**: Add WebSocket for chat
5. **Testing**: Add Jest/Vitest tests

## 🎓 Learn More

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [Tanstack Query](https://tanstack.com/query/latest)
- [MongoDB Tutorial](https://www.mongodb.com/docs/manual/tutorial/)

## 🐛 Common Patterns

### Adding a New API Endpoint

1. Create route handler: `app/api/your-endpoint/route.ts`
2. Create model: `models/YourModel.ts`
3. Create hook: `hooks/useYourData.ts`
4. Use in component

### Protecting Routes

Add authentication check:
```typescript
import { getCurrentUser, apiError } from '@/lib/api/utils';

export async function GET() {
  const user = await getCurrentUser();
  
  if (!user) {
    return apiError('Not authenticated', 401);
  }
  
  // Your logic here
}
```

### Query with Filters

```typescript
// Hook
export function useCourses(filters: { category?: string }) {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters);
      const res = await fetch(`/api/courses?${params}`);
      return res.json();
    },
  });
}

// Component
const { data } = useCourses({ category: 'Programming' });
```

## 📦 Project Structure

```
nextstep/
├── app/
│   ├── api/              # API route handlers
│   ├── auth/             # Auth pages
│   ├── courses/          # Course pages
│   ├── dashboard/        # Dashboards
│   └── layout.tsx        # Root layout with QueryProvider
├── components/           # Reusable components
├── hooks/               # Custom React Query hooks
├── lib/                 # Utilities
│   ├── mongodb.ts      # DB connection
│   └── api/
│       └── utils.ts    # API helpers
├── models/             # Mongoose models
├── providers/          # Context providers
├── scripts/            # Utility scripts
│   └── seed.ts        # Database seeding
└── .env.local         # Environment variables
```

---

**Happy Coding! 🚀**

For issues or questions, check the API_README.md file.