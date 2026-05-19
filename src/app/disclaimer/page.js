"use client";

import styled from "styled-components";
import SectionTitle from "@/components/SectionTitle";
import { theme } from "@/styles/theme";


const Page = styled.section`max-width: 880px; margin: 0 auto; padding: 70px 20px;`;
const Copy = styled.div`p, li { color: ${theme.colors.muted}; line-height: 1.85; font-size: 1.06rem; }`;

export default function DisclaimerPage() {
  return <Page><SectionTitle eyebrow="Disclaimer" title="Educational content, not medical advice." /><Copy><p>The information on MindBody Roots is provided for general educational and motivational purposes only. It is not medical advice, diagnosis, treatment, or a substitute for guidance from a qualified health professional.</p><ul><li>Always consult a doctor or qualified professional before changing exercise, diet, sleep, supplement, or treatment routines.</li><li>Do not ignore professional medical advice because of something you read on this website.</li><li>No article or recommendation on this website is intended to diagnose, treat, cure, or prevent any disease.</li><li>You are responsible for your own decisions and should consider your personal health situation carefully.</li></ul></Copy></Page>;
}
