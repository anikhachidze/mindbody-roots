"use client";

import styled from "styled-components";
import DisclaimerNotice from "@/components/DisclaimerNotice";
import ProductCard from "@/components/ProductCard";
import { getPostBySlug, posts } from "@/data/posts";
import { products } from "@/data/products";
import { theme } from "@/styles/theme";
import { usePreferences } from "@/context/PreferencesContext";
import { localize } from "@/lib/i18n";
import { siteCopy } from "@/content/siteCopy";

const Article = styled.article`
  max-width: 880px;
  margin: 0 auto;
  padding: 70px 20px;
`;

const Category = styled.p`
  margin: 0 0 14px;
  color: ${theme.colors.primary};
  font-weight: 900;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  font-size: 0.78rem;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: clamp(2.7rem, 6vw, 5rem);
  line-height: 0.98;
  letter-spacing: -0.08em;
`;

const Meta = styled.p`
  color: ${theme.colors.muted};
  margin: 18px 0 28px;
`;

const Section = styled.section`
  margin-top: 34px;

  h2 {
    font-size: 1.8rem;
    letter-spacing: -0.04em;
    margin: 0 0 12px;
  }

  p {
    color: ${theme.colors.muted};
    line-height: 1.85;
    font-size: 1.08rem;
  }
`;

const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 22px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export default function BlogPostPage({ params }) {
  const { locale } = usePreferences();
  const copy = siteCopy[locale].common;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <Article>
        <H1>{copy.notFoundTitle}</H1>
        <Meta>{copy.notFoundText}</Meta>
      </Article>
    );
  }

  const recommended = products.filter((product) => post.productTitles.en.includes(product.title.en));

  return (
    <Article>
      <Category>{localize(post.category, locale)}</Category>
      <H1>{localize(post.title, locale)}</H1>
      <Meta>
        {post.date} • {localize(post.readingTime, locale)}
      </Meta>
      <DisclaimerNotice />
      {post.sections.map((section) => (
        <Section key={section.heading.en}>
          <h2>{localize(section.heading, locale)}</h2>
          <p>{localize(section.body, locale)}</p>
        </Section>
      ))}
      <Section>
        <h2>{copy.articleToolsTitle}</h2>
        <p>{copy.articleToolsText}</p>
        <Products>
          {recommended.map((product) => (
            <ProductCard key={product.title.en} product={product} />
          ))}
        </Products>
      </Section>
    </Article>
  );
}
