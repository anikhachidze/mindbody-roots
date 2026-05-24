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

  strong {
    color: ${theme.colors.text};
  }
`;

export default function AffiliateDisclosurePage() {
  const { locale } = usePreferences();
  const copy = useLocalizedSiteCopy(locale).common;

  return (
    <Page>
      <SectionTitle eyebrow={copy.affiliateDisclosureLabel} title={copy.affiliateDisclosureTitle} />
      <Copy>
        <p>
          <strong>{copy.affiliateDisclosureStrong}</strong>
        </p>
        <p>{copy.affiliateDisclosureBody}</p>
        <p>{copy.affiliateDisclosureExtra1}</p>
        <p>{copy.affiliateDisclosureExtra2}</p>
      </Copy>
    </Page>
  );
}
