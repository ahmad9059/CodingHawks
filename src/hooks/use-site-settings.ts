"use client";

import { useEffect, useState } from "react";

type SiteSettings = {
  [key: string]: string;
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch("/api/settings");
        if (!response.ok) {
          throw new Error("Failed to fetch settings");
        }
        const data = await response.json();
        setSettings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Failed to fetch site settings:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { settings, loading, error };
}
