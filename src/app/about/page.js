"use client";

import styled from "styled-components";
import SectionTitle from "@/components/SectionTitle";
import DisclaimerNotice from "@/components/DisclaimerNotice";
import { theme } from "@/styles/theme";


const Page = styled.section`max-width: 880px; margin: 0 auto; padding: 70px 20px;`;
const Copy = styled.div`p { color: ${theme.colors.muted}; line-height: 1.85; font-size: 1.1rem; }`;

export default function AboutPage() {
  return <Page><SectionTitle eyebrow="About" title="A calm space for mind-body habits.">MindBody Roots explores how thoughts, routines, environment, and physical wellbeing influence each other.</SectionTitle><Copy><p>The mission is simple: make health and mindset ideas easier to understand and easier to practice. The site focuses on practical education, grounded motivation, and small repeatable habits.</p><p>This is not a replacement for professional healthcare. It is a starting point for reflection, learning, and building routines that support your life.</p></Copy><DisclaimerNotice /></Page>;
}
