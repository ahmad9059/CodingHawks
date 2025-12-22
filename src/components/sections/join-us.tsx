"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/use-site-settings";

export function JoinUs() {
  const { settings, loading } = useSiteSettings();
  const joinUsUrl = settings.join_us || "https://docs.google.com/forms"; // Fallback URL

  return (
    <section
      id="join-us"
      className="py-20 lg:py-32"
      style={{ backgroundColor: "#5D1A75" }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Main heading */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-headline text-white mb-6"
            style={{ fontWeight: 700 }}
          >
            Ready to Code Your Future?
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of others and take the first step towards a better
            coding future. It's free and takes only 5 minutes.
          </p>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="bg-white text-[#5D1A75] hover:bg-white/90 px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={loading}
            >
              <Link
                href={joinUsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans"
              >
                Apply to Join →
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
