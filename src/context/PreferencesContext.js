"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale } from "@/lib/i18n";

const STORAGE_THEME_KEY = "mindbody-roots-theme";
const STORAGE_LOCALE_KEY = "mindbody-roots-locale";

const PreferencesContext = createContext(null);

function readStoredPreference(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function applyTheme(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function applyLocale(locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale === "ka" ? "ka" : "en";
}

export function PreferencesProvider({ children }) {
  const [theme, setThemeState] = useState("light");
  const [locale, setLocaleState] = useState(defaultLocale);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedTheme = readStoredPreference(STORAGE_THEME_KEY, "light");
    const storedLocale = readStoredPreference(STORAGE_LOCALE_KEY, defaultLocale);
    setThemeState(storedTheme === "dark" ? "dark" : "light");
    setLocaleState(storedLocale === "ka" ? "ka" : defaultLocale);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    applyTheme(theme);
    try {
      window.localStorage.setItem(STORAGE_THEME_KEY, theme);
    } catch {
      /* ignore storage failures */
    }
  }, [hydrated, theme]);

  useEffect(() => {
    if (!hydrated) return;
    applyLocale(locale);
    try {
      window.localStorage.setItem(STORAGE_LOCALE_KEY, locale);
    } catch {
      /* ignore storage failures */
    }
  }, [hydrated, locale]);

  const value = useMemo(
    () => ({
      theme,
      locale,
      hydrated,
      setTheme: (nextTheme) => setThemeState(nextTheme),
      toggleTheme: () => setThemeState((current) => (current === "dark" ? "light" : "dark")),
      setLocale: (nextLocale) => setLocaleState(nextLocale),
      toggleLocale: () => setLocaleState((current) => (current === "ka" ? "en" : "ka")),
    }),
    [hydrated, locale, theme],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}
