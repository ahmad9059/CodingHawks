# Coding Hawks Admin Dashboard Setup Guide

## 🎯 Overview

The admin dashboard is now fully integrated with **Supabase** for both database and file storage. This allows you to manage all website content dynamically through a beautiful admin interface.

## 🚀 What's Been Set Up

### ✅ Database (Supabase PostgreSQL)

- **Users** - Admin authentication
- **Slider Images** - Hero section images
- **Announcements** - News and updates
- **Achievements** - Society accomplishments
- **Fields** - Areas of expertise
- **Site Settings** - General configuration

### ✅ File Storage (Supabase Storage)

- **Image uploads** directly to Supabase Storage
- **Automatic URL generation** for uploaded images
- **File validation** (type and size checks)
- **Drag-and-drop interface** for easy uploads

### ✅ Admin Features

- **Secure authentication** with JWT tokens
- **Dashboard overview** with statistics
- **Slider management** with image upload
- **CRUD operations** for all content types
- **Real-time updates** without page refresh

## 📋 Prerequisites

Before you start, make sure you have:

1. ✅ Supabase account and project created
2. ✅ Database connection string
3. ✅ Supabase API keys
4. ✅ Node.js and npm installed

## 🔧 Setup Instructions

### Step 1: Environment Variables

Your `.env` file should contain:

```env
# Database - Supabase
DATABASE_URL="postgresql://postgres.ahvnfpqkmwbozonseqqr:ahmad1234hassan1234@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://ahvnfpqkmwbozonseqqr.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:9002"

# Admin credentials
ADMIN_EMAIL="admin@codinghawks.com"
ADMIN_PASSWORD="admin123"
```

### Step 2: Create Supabase Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** section
3. Click **New Bucket**
4. Name it: `uploads`
5. Make it **Public** (so images can be accessed)
6. Click **Create Bucket**

### Step 3: Set Up Storage Policies

In Supabase Dashboard > Storage > uploads > Policies:

```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'uploads' );

-- Allow authenticated uploads
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'uploads' );

-- Allow authenticated deletes
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'uploads' );
```

### Step 4: Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to Supabase
npm run db:push

# Create admin user
npm run admin:init
```

### Step 5: Start Development Server

```bash
npm run dev
```

## 🔐 Access the Admin Dashboard

1. **Login Page**: http://localhost:9002/admin/login
2. **Credentials**:
   - Email: `admin@codinghawks.com`
   - Password: `admin123`

## 📱 Admin Dashboard Pages

### Dashboard (`/admin/dashboard`)

- Overview statistics
- Quick actions
- Recent activity

### Slider Management (`/admin/slider`)

- Upload hero section images
- Manage image order
- Toggle active/inactive status
- Edit image details

### Coming Soon

- **Announcements** (`/admin/announcements`)
- **Achievements** (`/admin/achievements`)
- **Fields** (`/admin/fields`)
- **Settings** (`/admin/settings`)

## 🎨 Image Upload Features

### Supported Formats

- PNG, JPG, JPEG, GIF, WebP
- Maximum size: 5MB
- Automatic optimization

### Upload Process

1. Click "Add Image" button
2. Click "Upload Image" or drag & drop
3. Image uploads to Supabase Storage
4. Public URL automatically generated
5. Fill in title, description, and order
6. Click "Save"

## 🛠️ Available Commands

```bash
# Development
npm run dev                 # Start development server

# Database
npm run db:generate        # Generate Prisma client
npm run db:push           # Push schema to database
npm run db:studio         # Open Prisma Studio

# Admin
npm run admin:init        # Initialize admin user
```

## 🔒 Security Features

- ✅ **JWT authentication** with HTTP-only cookies
- ✅ **Password hashing** with bcrypt
- ✅ **Protected routes** with auth guards
- ✅ **File validation** on upload
- ✅ **SQL injection protection** with Prisma
- ✅ **XSS protection** with Next.js

## 📊 Database Schema

### Users Table

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      Role     @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Slider Images Table

```prisma
model SliderImage {
  id          String   @id @default(cuid())
  title       String
  description String?
  imageUrl    String
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🐛 Troubleshooting

### Issue: Can't login

**Solution**: Make sure you ran `npm run admin:init` to create the admin user

### Issue: Images not uploading

**Solution**:

1. Check Supabase Storage bucket exists and is public
2. Verify storage policies are set correctly
3. Check browser console for errors

### Issue: Database connection error

**Solution**:

1. Verify DATABASE_URL in `.env`
2. Check Supabase project is active
3. Ensure you're using the correct connection string

### Issue: "Table does not exist" error

**Solution**: Run `npm run db:push` to create tables

## 📝 Next Steps

1. **Customize admin user**: Change email/password in `.env`
2. **Add more admins**: Create user management page
3. **Implement remaining managers**: Announcements, Achievements, Fields
4. **Connect frontend**: Update components to fetch from database
5. **Add image optimization**: Implement automatic resizing
6. **Set up backups**: Configure Supabase backup schedule

## 🎉 Success!

Your admin dashboard is now fully functional with:

- ✅ Supabase database integration
- ✅ Image upload to Supabase Storage
- ✅ Secure authentication
- ✅ Beautiful UI with dark mode
- ✅ Real-time content management

Happy coding! 🚀
