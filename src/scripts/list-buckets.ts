import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase environment variables!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listBuckets() {
  try {
    console.log("🔍 Checking available storage buckets...");

    // List all buckets
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

      // Check files in each bucket
      for (const bucket of buckets) {
        console.log(`\n📁 Files in "${bucket.name}":`);
        const { data: files, error: filesError } = await supabase.storage
          .from(bucket.name)
          .list("", { limit: 10 });

        if (filesError) {
          console.log(`   ❌ Error: ${filesError.message}`);
        } else if (files && files.length > 0) {
          files.forEach((file, index) => {
            console.log(`   ${index + 1}. ${file.name}`);
          });
        } else {
          console.log(`   📭 Empty bucket`);
        }
      }
    } else {
      console.log("⚠️  No storage buckets found!");
    }
  } catch (error) {
    console.error("💥 Error:", error);
  }
}

// Run the function
if (require.main === module) {
  listBuckets()
    .then(() => {
      console.log("\n✨ Bucket check completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Check failed:", error);
      process.exit(1);
    });
}

export { listBuckets };
