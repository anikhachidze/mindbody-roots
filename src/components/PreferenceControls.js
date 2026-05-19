"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";
import { usePreferences } from "@/context/PreferencesContext";
import { siteCopy } from "@/content/siteCopy";

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const Pill = styled.button`
  min-height: 40px;
  padding: 0 14px;
  border-radius: ${theme.radii.pill};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-weight: 800;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: 180ms ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.soft};
  }
`;

const Label = styled.span`
  color: ${theme.colors.muted};
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.11em;
`;

export default function PreferenceControls() {
  const { theme: currentTheme, locale, toggleTheme, toggleLocale } = usePreferences();
  const copy = siteCopy[locale].controls;

  return (
    <Controls>
      <Label>{copy.theme}</Label>
      <Pill type="button" onClick={toggleTheme} aria-label={copy.theme} aria-pressed={currentTheme === "dark"}>
        {currentTheme === "dark" ? "🌙" : "☀️"} {currentTheme === "dark" ? copy.dark : copy.light}
      </Pill>
      <Label>{copy.language}</Label>
      <Pill type="button" onClick={toggleLocale} aria-label={copy.language}>
        {locale === "ka" ? copy.georgian : copy.english}
      </Pill>
    </Controls>
  );
}
