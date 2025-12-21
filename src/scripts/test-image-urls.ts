import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testImageUrls() {
  try {
    console.log("🔍 Testing different URL formats for Supabase images...");

    // Test different URL formats
    const testUrls = [
      `${supabaseUrl}/storage/v1/object/public/codinghawks/ch-1.webp`,
      `${supabaseUrl}/storage/v1/object/codinghawks/ch-1.webp`,
      `${supabaseUrl}/storage/v1/public/codinghawks/ch-1.webp`,
    ];

    for (const url of testUrls) {
      console.log(`\n🌐 Testing: ${url}`);

      try {
        const response = await fetch(url);
        console.log(`   Status: ${response.status} ${response.statusText}`);

        if (response.ok) {
          console.log(`   ✅ SUCCESS! This URL works.`);
          return url;
        } else {
          const errorText = await response.text();
          console.log(`   ❌ Error: ${errorText}`);
        }
      } catch (error) {
        console.log(`   ❌ Network error: ${error}`);
      }
    }

    // Try using Supabase client to get public URL
    console.log(`\n🔧 Trying Supabase client method...`);
    const { data } = supabase.storage
      .from("codinghawks")
      .getPublicUrl("ch-1.webp");

    console.log(`   Generated URL: ${data.publicUrl}`);

    try {
      const response = await fetch(data.publicUrl);
      console.log(`   Status: ${response.status} ${response.statusText}`);

      if (response.ok) {
        console.log(`   ✅ SUCCESS! Supabase client URL works.`);
        return data.publicUrl;
      }
    } catch (error) {
      console.log(`   ❌ Supabase client URL failed: ${error}`);
    }

    console.log(
      `\n❌ None of the URL formats worked. The bucket might not be public.`
    );
    return null;
  } catch (error) {
    console.error("💥 Error testing URLs:", error);
    return null;
  }
}

// Run the function
if (require.main === module) {
  testImageUrls()
    .then((workingUrl) => {
      if (workingUrl) {
        console.log(`\n🎉 Working URL found: ${workingUrl}`);
      } else {
        console.log(
          `\n💡 Please make the 'codinghawks' bucket public in Supabase Dashboard.`
        );
      }
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Test failed:", error);
      process.exit(1);
    });
}

export { testImageUrls };
