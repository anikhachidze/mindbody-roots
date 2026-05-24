"use client";

import styled from "styled-components";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import BlogCard from "@/components/BlogCard";
import QuoteCard from "@/components/QuoteCard";
import ProductCard from "@/components/ProductCard";
import DisclaimerNotice from "@/components/DisclaimerNotice";
import HomeVideoSection from "@/components/HomeVideoSection";
import { usePreferences } from "@/context/PreferencesContext";
import { useContent } from "@/context/ContentContext";
import { localize } from "@/lib/i18n";

const Section = styled.section`
  max-width: 1160px;
  margin: 0 auto;
  padding: 42px 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Two = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 20px;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export default function Home() {
  const { locale } = usePreferences();
  const { homePage } = useContent();
  const featured = homePage.featuredArticlesSection;
  const tools = homePage.recommendationsSection;

  return (
    <>
      <Hero />
      <Section>
        <SectionTitle eyebrow={localize(featured.eyebrow, locale)} title={localize(featured.title, locale)}>
          {localize(featured.body, locale)}
        </SectionTitle>
        <Grid>{homePage.featuredArticles.map((post) => <BlogCard key={post.slug} post={post} />)}</Grid>
      </Section>
      {homePage.spotlightQuote && (
        <Section>
          <Two>
            <QuoteCard quote={homePage.spotlightQuote} />
            <DisclaimerNotice />
          </Two>
        </Section>
      )}
      <Section>
        <SectionTitle eyebrow={localize(tools.eyebrow, locale)} title={localize(tools.title, locale)}>
          {localize(tools.body, locale)}
        </SectionTitle>
        <Grid>{homePage.featuredProducts.map((product) => <ProductCard key={product.documentId || product.url} product={product} />)}</Grid>
      </Section>
      <HomeVideoSection video={homePage.promoVideo} />
    </>
  );
}
