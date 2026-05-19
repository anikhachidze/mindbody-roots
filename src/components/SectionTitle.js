"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";

const Wrap = styled.div`
  max-width: 720px; margin-bottom: 26px;
`;
const Eyebrow = styled.p`
  margin: 0 0 10px; color: ${theme.colors.primary}; font-weight: 800; text-transform: uppercase; letter-spacing: 0.14em; font-size: 0.78rem;
`;
const Title = styled.h2`
  margin: 0; font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1.02; letter-spacing: -0.06em;
`;
const Text = styled.p`
  color: ${theme.colors.muted}; font-size: 1.05rem; line-height: 1.75; margin: 14px 0 0;
`;

export default function SectionTitle({ eyebrow, title, children }) {
  return <Wrap>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<Title>{title}</Title>{children && <Text>{children}</Text>}</Wrap>;
}
