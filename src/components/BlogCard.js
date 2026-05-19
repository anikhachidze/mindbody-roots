"use client";

import Link from "next/link";
import styled from "styled-components";
import { theme } from "@/styles/theme";

const Card = styled.article`
  background: ${theme.colors.surface}; border: 1px solid ${theme.colors.border}; border-radius: ${theme.radii.card};
  padding: 24px; box-shadow: ${theme.shadows.soft}; display: flex; flex-direction: column; min-height: 100%; transition: 180ms ease;
  &:hover { transform: translateY(-4px); box-shadow: ${theme.shadows.hover}; }
`;
const Category = styled.p`
  margin: 0 0 12px; color: ${theme.colors.primary}; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
`;
const Title = styled.h3`
  margin: 0; font-size: 1.55rem; letter-spacing: -0.05em; line-height: 1.1;
`;
const Excerpt = styled.p`
  color: ${theme.colors.muted}; line-height: 1.65; margin: 14px 0 18px;
`;
const Meta = styled.p`
  margin: auto 0 18px; color: ${theme.colors.muted}; font-size: 0.92rem;
`;
const Read = styled(Link)`
  color: ${theme.colors.primaryDark}; font-weight: 800;
`;

export default function BlogCard({ post }) {
  return (
    <Card>
      <Category>{post.category}</Category>
      <Title>{post.title}</Title>
      <Excerpt>{post.excerpt}</Excerpt>
      <Meta>{post.date} • {post.readingTime}</Meta>
      <Read href={`/blog/${post.slug}`}>Read article →</Read>
    </Card>
  );
}
