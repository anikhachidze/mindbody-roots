"use client";

import styled from "styled-components";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { theme } from "@/styles/theme";

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
  return (
    <Page>
      <SectionTitle
        eyebrow="Amazon recommendations"
        title="Tools for a healthier routine."
      >
        Product ideas for journaling, learning, movement, recovery, and daily
        consistency.
      </SectionTitle>
      <Disclosure>
        <strong>Affiliate disclosure:</strong> As an Amazon Associate, this site
        may earn from qualifying purchases. This does not affect the price you
        pay. Current links are placeholders and should be replaced with real
        affiliate URLs before launch.
      </Disclosure>
      <Grid>
        {products.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </Grid>
    </Page>
  );
}
