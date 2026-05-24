"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";
import { usePreferences } from "@/context/PreferencesContext";
import { localize } from "@/lib/i18n";

const Card = styled.figure`
  margin: 0;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.card};
  padding: 24px;
  box-shadow: ${theme.shadows.soft};
`;

const Text = styled.blockquote`
  margin: 0;
  color: ${theme.colors.text};
  font-size: 1.35rem;
  line-height: 1.35;
  letter-spacing: -0.04em;
  font-weight: 800;
`;

const Author = styled.figcaption`
  margin-top: 16px;
  color: ${theme.colors.muted};
`;

export default function QuoteCard({ quote }) {
  const { locale } = usePreferences();
  return (
    <Card>
      <Text>“{localize(quote.text, locale)}”</Text>
      {quote.author && <Author>— {localize(quote.author, locale)}</Author>}
    </Card>
  );
}
