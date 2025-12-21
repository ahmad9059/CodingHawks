import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase environment variables!");
  console.log(
    "Make sure you have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSupabaseStorage() {
  try {
    console.log("🔍 Checking Supabase Storage configuration...");
    console.log(`📍 Supabase URL: ${supabaseUrl}`);

    // List all buckets
    console.log("\n📦 Listing storage buckets...");
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      console.error("❌ Error listing buckets:", error);
      return;
    }

    if (buckets && buckets.length > 0) {
      console.log("✅ Found buckets:");
      buckets.forEach((bucket, index) => {
        console.log(
          `  ${index + 1}. ${bucket.name} (${
            bucket.public ? "Public" : "Private"
          })`
        );
      });
    } else {
      console.log("⚠️  No storage buckets found!");
      console.log("\n📋 To create a storage bucket:");
      console.log("1. Go to your Supabase dashboard");
      console.log("2. Navigate to Storage");
      console.log("3. Click 'New bucket'");
      console.log(
        "4. Name it 'uploads' (or update the code to use your bucket name)"
      );
      console.log("5. Make it public if you want direct access to images");
    }
  } catch (error) {
    console.error("💥 Error checking Supabase Storage:", error);
  }
}

// Run the check
if (require.main === module) {
  checkSupabaseStorage()
    .then(() => {
      console.log("\n✨ Storage check completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Check failed:", error);
      process.exit(1);
    });
}

export { checkSupabaseStorage };
