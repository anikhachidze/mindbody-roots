"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";

const Card = styled.article`
  background: ${theme.colors.surface}; border: 1px solid ${theme.colors.border}; border-radius: ${theme.radii.card};
  padding: 24px; box-shadow: ${theme.shadows.soft}; display: flex; flex-direction: column; min-height: 100%;
`;
const Category = styled.p`
  margin: 0 0 12px; color: ${theme.colors.accent}; font-size: 0.78rem; font-weight: 900; letter-spacing: 0.13em; text-transform: uppercase;
`;
const Title = styled.h3`
  margin: 0; font-size: 1.35rem; letter-spacing: -0.04em;
`;
const Desc = styled.p`
  color: ${theme.colors.muted}; line-height: 1.65; margin: 12px 0 18px;
`;
const Button = styled.a`
  margin-top: auto; display: inline-flex; justify-content: center; align-items: center; min-height: 46px;
  border-radius: ${theme.radii.pill}; background: ${theme.colors.primary}; color: white; font-weight: 850; transition: 180ms ease;
  &:hover { background: ${theme.colors.primaryDark}; transform: translateY(-2px); }
`;
const Note = styled.p`
  color: ${theme.colors.muted}; font-size: 0.82rem; line-height: 1.5; margin: 12px 0 0;
`;

export default function ProductCard({ product }) {
  return (
    <Card>
      <Category>{product.category}</Category>
      <Title>{product.title}</Title>
      <Desc>{product.description}</Desc>
      <Button href={product.url} target="_blank" rel="nofollow sponsored noopener noreferrer">View on Amazon</Button>
      <Note>Affiliate placeholder link. Replace with your real Amazon Associates URL before launch.</Note>
    </Card>
  );
}
