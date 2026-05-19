"use client";

import styled from "styled-components";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import BlogCard from "@/components/BlogCard";
import QuoteCard from "@/components/QuoteCard";
import ProductCard from "@/components/ProductCard";
import DisclaimerNotice from "@/components/DisclaimerNotice";
import { posts } from "@/data/posts";
import { quotes } from "@/data/quotes";
import { products } from "@/data/products";
import { usePreferences } from "@/context/PreferencesContext";
import { siteCopy } from "@/content/siteCopy";

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
  const copy = siteCopy[locale].common;

  return (
    <>
      <Hero />
      <Section>
        <SectionTitle eyebrow={copy.featuredEyebrow} title={copy.featuredTitle}>
          {copy.featuredText}
        </SectionTitle>
        <Grid>{posts.map((post) => <BlogCard key={post.slug} post={post} />)}</Grid>
      </Section>
      <Section>
        <Two>
          <QuoteCard quote={quotes[0]} />
          <DisclaimerNotice />
        </Two>
      </Section>
      <Section>
        <SectionTitle eyebrow={copy.toolsEyebrow} title={copy.toolsTitle}>
          {copy.toolsText}
        </SectionTitle>
        <Grid>{products.slice(0, 3).map((product) => <ProductCard key={product.title.en} product={product} />)}</Grid>
      </Section>
    </>
  );
}
