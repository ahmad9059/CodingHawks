# Supabase Storage Bucket Setup Guide

## Current Status ✅

- **Slider Working**: Using local images from `/ch` folder
- **Database Populated**: 8 slider entries with local paths
- **Admin Dashboard**: Fully functional for managing slider content

## Issue with Supabase Storage

Your bucket "codinghawks" exists but is **not publicly accessible**, causing 404 errors when trying to load images.

## How to Fix Supabase Storage

### Method 1: Make Bucket Public (Recommended)

1. **Go to Supabase Dashboard**

   - URL: https://supabase.com/dashboard
   - Project: `ahvnfpqkmwbozonseqqr`

2. **Navigate to Storage**

   - Click "Storage" in the left sidebar
   - You should see your "codinghawks" bucket

3. **Edit Bucket Settings**

   - Click on the **gear icon (⚙️)** or **three dots (⋯)** next to "codinghawks"
   - Select **"Bucket settings"** or **"Edit bucket"**

4. **Enable Public Access**

   - Find the **"Public bucket"** toggle/checkbox
   - **✅ Turn it ON** (enable it)
   - Click **"Save"** or **"Update bucket"**

5. **Verify the Fix**
   ```bash
   npm run test:urls
   ```
   This should now show successful responses.

### Method 2: Set Up Bucket Policies

If Method 1 doesn't work, you need to create a storage policy:

1. **Go to Storage → Policies** in Supabase Dashboard

2. **Create New Policy**

   - Click "New Policy"
   - Select "For full customization"

3. **Policy Configuration**

   - **Policy name**: `Public read access`
   - **Allowed operation**: `SELECT`
   - **Target roles**: `public`
   - **Policy definition**:
     ```sql
     bucket_id = 'codinghawks'
     ```

4. **Save Policy**

### Method 3: Check Authentication Settings

1. **Go to Authentication → Policies**
2. **Ensure storage is not restricted** to authenticated users only
3. **Check RLS (Row Level Security)** settings

## After Making Bucket Public

Once your bucket is public, run these commands:

### 1. Test URLs

```bash
npm run test:urls
```

Should show: ✅ SUCCESS! This URL works.

### 2. Update Database with Supabase URLs

```bash
npm run create:slider
```

This will update all slider entries to use Supabase Storage URLs.

### 3. Verify in Browser

Visit your website and check if images load from Supabase.

## Troubleshooting

### Images Still Not Loading?

**Check 1: Verify Bucket is Public**

```bash
curl -I "https://ahvnfpqkmwbozonseqqr.supabase.co/storage/v1/object/public/codinghawks/ch-1.webp"
```

Should return: `HTTP/2 200` (not 400 or 404)

**Check 2: Verify Image Names**
Make sure your images are named exactly:

- ch-1.webp
- ch-2.webp
- ch-3.webp
- ch-4.webp
- ch-5.webp
- ch-6.webp
- ch-7.webp
- ch-8.webp

**Check 3: Clear Browser Cache**
Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

## Current Workaround

Your website is currently using **local images** from the `/ch` folder, which works perfectly fine. The slider is:

- ✅ Fully functional
- ✅ Manageable via admin dashboard
- ✅ Fast loading (no external requests)

You can continue using local images or switch to Supabase Storage later when you have time to configure the bucket properly.

## Benefits of Each Approach

### Local Images (Current)

- ✅ Works immediately
- ✅ Fast loading
- ✅ No external dependencies
- ❌ Images stored in codebase
- ❌ Larger deployment size

### Supabase Storage (Future)

- ✅ Images separate from code
- ✅ CDN performance
- ✅ Unlimited storage
- ✅ Admin can upload via dashboard
- ❌ Requires proper bucket configuration

## Quick Commands Reference

```bash
# Check bucket status
npm run list:buckets

# Test image URLs
npm run test:urls

# Use local images (current)
npm run create:slider-local

# Use Supabase images (after bucket is public)
npm run create:slider

# Clear all slider entries
npm run clear:slider
```

## Need Help?

If you're still having issues:

1. Take a screenshot of your Supabase Storage settings
2. Check if there's a "Public" badge on your bucket
3. Try creating a new bucket with "Public" enabled from the start
4. Contact Supabase support if policies aren't working
