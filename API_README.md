# NextStep Africa - API Setup Guide

## Architecture Overview

This project uses a clean, maintainable backend architecture with:
- **MongoDB + Mongoose** for database
- **Next.js Route Handlers** for API endpoints
- **Tanstack Query (React Query)** for data fetching and caching
- **JWT Authentication** with HTTP-only cookies

## Project Structure

```
app/api/
├── auth/
│   ├── login/route.ts       # POST /api/auth/login
│   ├── register/route.ts    # POST /api/auth/register
│   ├── logout/route.ts      # POST /api/auth/logout
│   └── me/route.ts          # GET /api/auth/me
├── courses/
│   ├── route.ts             # GET, POST /api/courses
│   └── [id]/route.ts        # GET, PUT, DELETE /api/courses/:id
└── enrollments/
    └── route.ts             # GET, POST /api/enrollments

lib/
├── mongodb.ts               # MongoDB connection utility
└── api/
    └── utils.ts             # API helper functions (JWT, responses)

models/
├── User.ts                  # User model with password hashing
├── Course.ts                # Course model
└── Enrollment.ts            # Enrollment model

hooks/
├── useAuth.ts               # Authentication hooks
├── useCourses.ts            # Course data hooks
└── useEnrollments.ts        # Enrollment hooks

providers/
└── query-provider.tsx       # React Query provider setup
```

## Setup Instructions

### 1. Install MongoDB

**Option A: Local MongoDB**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Linux
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string

### 2. Environment Variables

Create `.env.local` file:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
```env
MONGODB_URI=mongodb://localhost:27017/nextstep
JWT_SECRET=your-random-secret-key
```

### 3. Start Development Server

```bash
pnpm dev
```

## API Endpoints

### Authentication

**Register**
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "learner"
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get Current User**
```http
GET /api/auth/me
```

**Logout**
```http
POST /api/auth/logout
```

### Courses

**Get All Courses**
```http
GET /api/courses?category=Programming&level=Beginner&search=web
```

**Get Single Course**
```http
GET /api/courses/:id
```

**Create Course** (Admin only)
```http
POST /api/courses
Content-Type: application/json

{
  "title": "Web Development Basics",
  "description": "Learn HTML, CSS, and JavaScript",
  "instructor": "John Doe",
  "duration": "8 weeks",
  "level": "Beginner",
  "category": "Programming",
  "skills": ["HTML", "CSS", "JavaScript"],
  "isOfflineAvailable": true,
  "lessons": 32,
  "price": "Free"
}
```

### Enrollments

**Get My Enrollments**
```http
GET /api/enrollments
```

**Enroll in Course**
```http
POST /api/enrollments
Content-Type: application/json

{
  "courseId": "course_id_here"
}
```

## Using React Query Hooks

### Authentication

```tsx
import { useLogin, useRegister, useLogout, useUser } from '@/hooks/useAuth';

function LoginForm() {
  const login = useLogin();
  
  const handleSubmit = (data) => {
    login.mutate(data, {
      onSuccess: () => {
        console.log('Logged in!');
      },
      onError: (error) => {
        console.error(error.message);
      }
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={login.isPending}>
        {login.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// Get current user
function Profile() {
  const { data: user, isLoading } = useUser();
  
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;
  
  return <div>Hello {user.username}!</div>;
}
```

### Courses

```tsx
import { useCourses, useCourse, useEnroll } from '@/hooks/useCourses';

function CourseList() {
  const { data: courses, isLoading } = useCourses({
    category: 'Programming',
    level: 'Beginner'
  });
  
  if (isLoading) return <div>Loading courses...</div>;
  
  return (
    <div>
      {courses?.map(course => (
        <div key={course._id}>{course.title}</div>
      ))}
    </div>
  );
}

// Enroll in course
function EnrollButton({ courseId }: { courseId: string }) {
  const enroll = useEnroll();
  
  const handleEnroll = () => {
    enroll.mutate(courseId, {
      onSuccess: () => {
        alert('Enrolled successfully!');
      },
      onError: (error) => {
        alert(error.message);
      }
    });
  };
  
  return (
    <button onClick={handleEnroll} disabled={enroll.isPending}>
      {enroll.isPending ? 'Enrolling...' : 'Enroll Now'}
    </button>
  );
}
```

## Extending the API

### Adding a New Model

1. Create model in `models/NewModel.ts`:
```typescript
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INewModel extends Document {
  // your fields
}

const NewModelSchema = new Schema<INewModel>({
  // your schema
}, { timestamps: true });

const NewModel: Model<INewModel> = mongoose.models.NewModel || 
  mongoose.model<INewModel>('NewModel', NewModelSchema);

export default NewModel;
```

2. Create API route in `app/api/newroute/route.ts`:
```typescript
import connectDB from '@/lib/mongodb';
import NewModel from '@/models/NewModel';
import { apiResponse, apiError } from '@/lib/api/utils';

export async function GET() {
  try {
    await connectDB();
    const items = await NewModel.find();
    return apiResponse(items);
  } catch (error) {
    return apiError('Failed to fetch items', 500);
  }
}
```

3. Create custom hook in `hooks/useNewModel.ts`:
```typescript
import { useQuery } from '@tanstack/react-query';

export function useNewModel() {
  return useQuery({
    queryKey: ['newmodel'],
    queryFn: async () => {
      const res = await fetch('/api/newroute');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      return data.data;
    },
  });
}
```

## Best Practices

1. **Always connect to DB** before querying
2. **Use error handling** in all routes
3. **Validate input data** before processing
4. **Invalidate queries** after mutations
5. **Use TypeScript types** for type safety
6. **Keep routes simple** - complex logic in separate files
7. **Use middleware** for authentication checks (optional enhancement)

## Testing the API

Use tools like:
- **Postman** or **Insomnia** for API testing
- **Thunder Client** (VS Code extension)
- **cURL** from command line

Example with cURL:
```bash
# Register
curl -X POST http://localhost:3005/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123","role":"learner"}'

# Login
curl -X POST http://localhost:3005/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Troubleshooting

**MongoDB connection issues:**
- Check if MongoDB is running
- Verify MONGODB_URI in .env.local
- Check firewall/network settings

**Authentication issues:**
- Clear cookies
- Check JWT_SECRET is set
- Verify token is being sent with requests

**Query not updating:**
- Check if queryKey is correct
- Use React Query DevTools to debug
- Verify invalidateQueries is called after mutations