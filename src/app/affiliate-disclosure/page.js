"use client";

import styled from "styled-components";
import SectionTitle from "@/components/SectionTitle";
import { theme } from "@/styles/theme";


const Page = styled.section`max-width: 880px; margin: 0 auto; padding: 70px 20px;`;
const Copy = styled.div`p, li { color: ${theme.colors.muted}; line-height: 1.85; font-size: 1.06rem; } strong { color: ${theme.colors.text}; }`;

export default function AffiliateDisclosurePage() {
  return <Page><SectionTitle eyebrow="Affiliate disclosure" title="How product links work." /><Copy><p><strong>As an Amazon Associate, I earn from qualifying purchases.</strong></p><p>Some links on MindBody Roots may be affiliate links. If you click a link and make a purchase, this site may earn a small commission. This does not affect the price you pay.</p><p>Recommendations should be based on relevance to the article topic, usefulness, and fit for healthy routines. Before launch, replace placeholder Amazon search links with your real Amazon Associates affiliate URLs.</p></Copy></Page>;
}
