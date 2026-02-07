# Supabase Storage Setup Instructions

## Issue

The `codinghawks` storage bucket doesn't exist in your Supabase project, which is causing image upload errors in the admin dashboard.

## Solution: Create the Storage Bucket

### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**

   - Visit: https://supabase.com/dashboard
   - Navigate to your project: `ahvnfpqkmwbozonseqqr`

2. **Create Storage Bucket**

   - Click on "Storage" in the left sidebar
   - Click "New bucket" button
   - Enter bucket name: `codinghawks`
   - Make it **Public** (check the "Public bucket" option)
   - Click "Create bucket"

3. **Set Bucket Policies (Important!)**
   After creating the bucket, you need to set up policies:

   - Click on the `codinghawks` bucket
   - Go to "Policies" tab
   - Click "New Policy"
   - Create the following policies:

   **Policy 1: Allow Public Read Access**

   ```sql
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   USING ( bucket_id = 'codinghawks' );
   ```

   **Policy 2: Allow Authenticated Upload**

   ```sql
   CREATE POLICY "Authenticated users can upload"
   ON storage.objects FOR INSERT
   WITH CHECK ( bucket_id = 'codinghawks' );
   ```

   **Policy 3: Allow Authenticated Update**

   ```sql
   CREATE POLICY "Authenticated users can update"
   ON storage.objects FOR UPDATE
   USING ( bucket_id = 'codinghawks' );
   ```

   **Policy 4: Allow Authenticated Delete**

   ```sql
   CREATE POLICY "Authenticated users can delete"
   ON storage.objects FOR DELETE
   USING ( bucket_id = 'codinghawks' );
   ```

### Option 2: Using SQL Editor

Go to SQL Editor in Supabase Dashboard and run:

```sql
-- Create the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('codinghawks', 'codinghawks', true);

-- Set up policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'codinghawks' );

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'codinghawks' );

CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'codinghawks' );

CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'codinghawks' );
```

## Verification

After creating the bucket, test the image upload:

1. Go to `/admin/announcements`
2. Click "Add Announcement"
3. Try uploading an image
4. You should see the image upload successfully

## Bucket Configuration

- **Name**: `codinghawks`
- **Public**: Yes (allows public read access)
- **Allowed MIME types**: image/png, image/jpg, image/jpeg, image/gif, image/webp
- **File size limit**: 5MB

## Folder Structure

Images will be uploaded to:

```
codinghawks/
  └── images/
      ├── 1234567890-abc123.jpg
      ├── 1234567891-def456.png
      └── ...
```

## Public URL Format

After upload, images will be accessible at:

```
https://ahvnfpqkmwbozonseqqr.supabase.co/storage/v1/object/public/codinghawks/images/[filename]
```

## Troubleshooting

### Error: "Storage bucket 'codinghawks' not found"

- The bucket hasn't been created yet. Follow the steps above.

### Error: "new row violates row-level security policy"

- The bucket policies haven't been set up correctly. Make sure to add all 4 policies above.

### Error: "Access denied"

- Make sure the bucket is set to **Public**
- Verify that the policies are correctly applied

### Images not displaying

- Check that the bucket is public
- Verify the image URL format is correct
- Check browser console for CORS errors

## Next.js Image Configuration

The Next.js config is already set up to allow Supabase images:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "ahvnfpqkmwbozonseqqr.supabase.co",
      port: "",
      pathname: "/storage/v1/object/public/**",
    },
  ],
}
```

## Need Help?

If you encounter any issues:

1. Check the Supabase dashboard logs
2. Verify your environment variables are correct
3. Make sure you're logged in as admin when uploading
4. Check browser console for detailed error messages
