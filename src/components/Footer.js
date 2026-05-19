"use client";

import Link from "next/link";
import styled from "styled-components";
import { theme } from "@/styles/theme";

const Shell = styled.footer`
  border-top: 1px solid ${theme.colors.border};
  margin-top: 80px;
`;
const Inner = styled.div`
  max-width: 1160px; margin: 0 auto; padding: 34px 20px;
  display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; color: ${theme.colors.muted};
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;
const Title = styled.p`
  margin: 0 0 8px; color: ${theme.colors.text}; font-weight: 800; font-size: 1.1rem;
`;
const Links = styled.div`
  display: flex; gap: 14px; flex-wrap: wrap; justify-content: flex-end; align-items: start;
  a { color: ${theme.colors.muted}; font-weight: 650; }
  a:hover { color: ${theme.colors.primary}; }
  @media (max-width: 720px) { justify-content: flex-start; }
`;

export default function Footer() {
  return (
    <Shell>
      <Inner>
        <div>
          <Title>MindBody Roots</Title>
          <p>Educational health and mindset content. Not medical advice.</p>
        </div>
        <Links>
          <Link href="/disclaimer">Health Disclaimer</Link>
          <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>
        </Links>
      </Inner>
    </Shell>
  );
}
