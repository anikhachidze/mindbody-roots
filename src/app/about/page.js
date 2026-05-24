"use client";

import styled from "styled-components";
import SectionTitle from "@/components/SectionTitle";
import DisclaimerNotice from "@/components/DisclaimerNotice";
import { theme } from "@/styles/theme";
import { usePreferences } from "@/context/PreferencesContext";
import { useLocalizedSiteCopy } from "@/context/ContentContext";

const Page = styled.section`
  max-width: 880px;
  margin: 0 auto;
  padding: 70px 20px;
`;

const Copy = styled.div`
  p {
    color: ${theme.colors.muted};
    line-height: 1.85;
    font-size: 1.1rem;
  }
`;

export default function AboutPage() {
  const { locale } = usePreferences();
  const copy = useLocalizedSiteCopy(locale).common;

  return (
    <Page>
      <SectionTitle eyebrow={copy.aboutEyebrow} title={copy.aboutTitle}>
        {copy.aboutLead}
      </SectionTitle>
      <Copy>
        <p>{copy.aboutBody1}</p>
        <p>{copy.aboutBody2}</p>
      </Copy>
      <DisclaimerNotice />
    </Page>
  );
}
