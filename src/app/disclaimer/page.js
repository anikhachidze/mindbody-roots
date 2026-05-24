"use client";

import styled from "styled-components";
import SectionTitle from "@/components/SectionTitle";
import { theme } from "@/styles/theme";
import { usePreferences } from "@/context/PreferencesContext";
import { useLocalizedSiteCopy } from "@/context/ContentContext";

const Page = styled.section`
  max-width: 880px;
  margin: 0 auto;
  padding: 70px 20px;
`;

const Copy = styled.div`
  p,
  li {
    color: ${theme.colors.muted};
    line-height: 1.85;
    font-size: 1.06rem;
  }
`;

export default function DisclaimerPage() {
  const { locale } = usePreferences();
  const copy = useLocalizedSiteCopy(locale).common;

  return (
    <Page>
      <SectionTitle eyebrow={copy.disclaimerEyebrow} title={copy.disclaimerTitle} />
      <Copy>
        <p>{copy.disclaimerBody}</p>
        <ul>
          {copy.disclaimerItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Copy>
    </Page>
  );
}
