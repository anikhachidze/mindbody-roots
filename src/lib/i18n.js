export const locales = ["en", "ka"];
export const defaultLocale = "en";

export function localize(value, locale = defaultLocale) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map((item) => localize(item, locale));
  if (typeof value === "object") {
    return value[locale] ?? value.en ?? Object.values(value)[0] ?? "";
  }
  return String(value);
}
