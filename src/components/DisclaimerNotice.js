"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";
import { usePreferences } from "@/context/PreferencesContext";
import { useLocalizedSiteCopy } from "@/context/ContentContext";

const Notice = styled.aside`
  border: 1px solid ${theme.colors.border};
  background: rgba(245, 231, 194, 0.45);
  border-radius: ${theme.radii.card};
  padding: 18px 20px;
  color: ${theme.colors.muted};
  line-height: 1.65;

  strong {
    color: ${theme.colors.text};
  }
`;

export default function DisclaimerNotice() {
  const { locale } = usePreferences();
  const copy = useLocalizedSiteCopy(locale).common;

  return (
    <Notice>
      <strong>{copy.healthDisclaimerTitle}</strong> {copy.healthDisclaimerBody}
    </Notice>
  );
}
