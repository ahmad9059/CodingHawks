export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME = "light" as const;

export type ThemePreference = "light" | "dark";

export function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark";
}

export function getStoredThemePreference(): ThemePreference {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemePreference(storedTheme) ? storedTheme : DEFAULT_THEME;
}

export function applyThemePreference(theme: ThemePreference) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function storeThemePreference(theme: ThemePreference) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}
