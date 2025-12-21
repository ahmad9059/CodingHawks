/**
 * Utility functions for URL handling
 */

/**
 * Ensures a URL has the proper protocol (https://)
 * @param url - The URL to process
 * @returns The URL with proper protocol or null if input is null/empty
 */
export function ensureAbsoluteUrl(
  url: string | null | undefined
): string | null {
  if (!url || url.trim() === "") return null;

  const trimmedUrl = url.trim();

  // If URL already has protocol, return as is
  if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
    return trimmedUrl;
  }

  // If URL starts with www., add https://
  if (trimmedUrl.startsWith("www.")) {
    return `https://${trimmedUrl}`;
  }

  // For social media domains, add https://
  const socialDomains = [
    "linkedin.com",
    "instagram.com",
    "github.com",
    "twitter.com",
    "facebook.com",
    "youtube.com",
  ];

  for (const domain of socialDomains) {
    if (trimmedUrl.includes(domain)) {
      return `https://${trimmedUrl}`;
    }
  }

  // For other cases, assume it needs https://
  return `https://${trimmedUrl}`;
}

/**
 * Validates if a URL is properly formatted
 * @param url - The URL to validate
 * @returns True if the URL is valid, false otherwise
 */
export function isValidUrl(url: string | null | undefined): boolean {
  if (!url) return false;

  try {
    const absoluteUrl = ensureAbsoluteUrl(url);
    if (!absoluteUrl) return false;

    new URL(absoluteUrl);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extracts the domain from a URL
 * @param url - The URL to extract domain from
 * @returns The domain or null if invalid
 */
export function extractDomain(url: string | null | undefined): string | null {
  if (!url) return null;

  try {
    const absoluteUrl = ensureAbsoluteUrl(url);
    if (!absoluteUrl) return null;

    const urlObj = new URL(absoluteUrl);
    return urlObj.hostname;
  } catch {
    return null;
  }
}
