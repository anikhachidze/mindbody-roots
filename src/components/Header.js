"use client";

import Link from "next/link";
import styled from "styled-components";
import { theme } from "@/styles/theme";

const Shell = styled.header`
  position: sticky; top: 0; z-index: 20;
  backdrop-filter: blur(18px);
  background: rgba(251, 250, 246, 0.82);
  border-bottom: 1px solid ${theme.colors.border};
`;
const Inner = styled.div`
  max-width: 1160px; margin: 0 auto; padding: 18px 20px;
  display: flex; align-items: center; justify-content: space-between; gap: 20px;
  @media (max-width: 760px) { align-items: flex-start; flex-direction: column; }
`;
const Brand = styled(Link)`
  display: flex; align-items: center; gap: 10px; font-weight: 800; letter-spacing: -0.04em; font-size: 1.35rem;
`;
const Mark = styled.span`
  width: 36px; height: 36px; border-radius: 14px; display: grid; place-items: center;
  color: white; background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
  box-shadow: ${theme.shadows.soft};
`;
const Nav = styled.nav`
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
`;
const NavLink = styled(Link)`
  padding: 10px 14px; border-radius: ${theme.radii.pill}; color: ${theme.colors.muted};
  font-size: 0.94rem; font-weight: 650; transition: 180ms ease;
  &:hover { color: ${theme.colors.primaryDark}; background: rgba(47, 125, 92, 0.09); }
`;

export default function Header() {
  return (
    <Shell>
      <Inner>
        <Brand href="/"><Mark>✦</Mark> MindBody Roots</Brand>
        <Nav aria-label="Primary navigation">
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/quotes">Quotes</NavLink>
          <NavLink href="/recommendations">Recommendations</NavLink>
          <NavLink href="/about">About</NavLink>
        </Nav>
      </Inner>
    </Shell>
  );
}
