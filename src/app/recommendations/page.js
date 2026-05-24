"use client";

import styled from "styled-components";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";
import { useContent, useLocalizedSiteCopy } from "@/context/ContentContext";
import { theme } from "@/styles/theme";
import { usePreferences } from "@/context/PreferencesContext";

const Page = styled.section`
  max-width: 1160px;
  margin: 0 auto;
  padding: 70px 20px;
`;

const Disclosure = styled.div`
  border: 1px solid ${theme.colors.border};
  background: rgba(47, 125, 92, 0.08);
  border-radius: ${theme.radii.card};
  padding: 18px 20px;
  color: ${theme.colors.muted};
  line-height: 1.65;
  margin-bottom: 28px;

  strong {
    color: ${theme.colors.text};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export default function RecommendationsPage() {
  const { locale } = usePreferences();
  const copy = useLocalizedSiteCopy(locale).common;
  const { products } = useContent();

  return (
    <Page>
      <SectionTitle eyebrow={copy.recommendationsEyebrow} title={copy.recommendationsTitle}>
        {copy.recommendationsLead}
      </SectionTitle>
      <Disclosure>
        <strong>{copy.affiliateDisclosureLabel}</strong> {copy.affiliateDisclosureBody}
      </Disclosure>
      <Grid>
        {products.map((product) => (
          <ProductCard key={product.title.en} product={product} />
        ))}
      </Grid>
    </Page>
  );
}
