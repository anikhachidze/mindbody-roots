"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";

const Notice = styled.aside`
  border: 1px solid ${theme.colors.border}; background: rgba(245, 231, 194, 0.45);
  border-radius: ${theme.radii.card}; padding: 18px 20px; color: ${theme.colors.muted}; line-height: 1.65;
  strong { color: ${theme.colors.text}; }
`;

export default function DisclaimerNotice() {
  return <Notice><strong>Health disclaimer:</strong> This website is for educational purposes only and is not medical advice. Always consult a qualified health professional before making health, diet, exercise, or supplement decisions.</Notice>;
}
