"use client";

import Link from "next/link";
import styled from "styled-components";
import { theme } from "@/styles/theme";

const Wrap = styled.section`
  max-width: 1160px; margin: 0 auto; padding: 86px 20px 54px;
  display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 46px; align-items: center;
  @media (max-width: 860px) { grid-template-columns: 1fr; padding-top: 58px; }
`;
const Badge = styled.p`
  display: inline-flex; margin: 0 0 18px; padding: 8px 14px; border-radius: ${theme.radii.pill};
  background: rgba(47, 125, 92, 0.1); color: ${theme.colors.primaryDark}; font-weight: 800;
`;
const H1 = styled.h1`
  margin: 0; font-size: clamp(3rem, 7vw, 5.9rem); line-height: 0.95; letter-spacing: -0.055em;
`;
const Lead = styled.p`
  margin: 24px 0 0; max-width: 640px; color: ${theme.colors.muted}; font-size: clamp(1.08rem, 2vw, 1.3rem); line-height: 1.75;
`;
const Actions = styled.div`
  display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px;
`;
const Button = styled(Link)`
  display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 0 20px;
  border-radius: ${theme.radii.pill}; font-weight: 800; transition: 180ms ease;
  background: ${({ $secondary }) => ($secondary ? "transparent" : theme.colors.primary)};
  color: ${({ $secondary }) => ($secondary ? theme.colors.primaryDark : "white")};
  border: 1px solid ${({ $secondary }) => ($secondary ? theme.colors.border : theme.colors.primary)};
  &:hover { transform: translateY(-2px); box-shadow: ${theme.shadows.soft}; }
`;
const Card = styled.div`
  background: rgba(255, 255, 255, 0.76); border: 1px solid ${theme.colors.border}; border-radius: 34px;
  padding: 30px; box-shadow: ${theme.shadows.soft};
`;
const Quote = styled.blockquote`
  margin: 0; font-size: clamp(1.6rem, 3vw, 2.4rem); line-height: 1.15; letter-spacing: -0.05em; font-weight: 800;
`;
const Mini = styled.p`
  color: ${theme.colors.muted}; line-height: 1.7; margin: 20px 0 0;
`;

export default function Hero() {
  return (
    <Wrap>
      <div>
        <Badge>Mind • Body • Better habits</Badge>
        <H1>Understand your mind. Strengthen your body.</H1>
        <Lead>Explore practical articles about the unconscious mind, daily discipline, physical wellbeing, and the small routines that make a healthier life easier to repeat.</Lead>
        <Actions>
          <Button href="/blog">Read the Blog</Button>
          <Button href="/recommendations" $secondary>Explore Recommendations</Button>
        </Actions>
      </div>
      <Card>
        <Quote>“Health begins with the choices you repeat.”</Quote>
        <Mini>MindBody Roots is built for calm learning: short articles, grounded motivation, and tools that support healthier routines without hype.</Mini>
      </Card>
    </Wrap>
  );
}
