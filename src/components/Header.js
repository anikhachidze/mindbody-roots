"use client";

import Link from "next/link";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { usePreferences } from "@/context/PreferencesContext";
import { useLocalizedSiteCopy } from "@/context/ContentContext";
import PreferenceControls from "@/components/PreferenceControls";

const Shell = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(18px);
  background: rgba(251, 250, 246, 0.82);
  border-bottom: 1px solid ${theme.colors.border};

  html[data-theme="dark"] & {
    background: rgba(15, 20, 17, 0.76);
  }
`;

const Inner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  letter-spacing: -0.04em;
  font-size: 1.35rem;
`;

const Mark = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: white;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.accent}
  );
  box-shadow: ${theme.shadows.soft};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  padding: 10px 14px;
  border-radius: ${theme.radii.pill};
  color: ${theme.colors.muted};
  font-size: 0.94rem;
  font-weight: 650;
  transition: 180ms ease;

  &:hover {
    color: ${theme.colors.primaryDark};
    background: rgba(47, 125, 92, 0.09);
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

export default function Header() {
  const { locale } = usePreferences();
  const copy = useLocalizedSiteCopy(locale);

  return (
    <Shell>
      <Inner>
        <Brand href="/">
          <Mark>✦</Mark> {copy.brand}
        </Brand>
        <Right>
          <Nav aria-label="Primary navigation">
            <NavLink href="/blog">{copy.nav.blog}</NavLink>
            <NavLink href="/quotes">{copy.nav.quotes}</NavLink>
            <NavLink href="/recommendations">
              {copy.nav.recommendations}
            </NavLink>
            <NavLink href="/about">{copy.nav.about}</NavLink>
          </Nav>
          <PreferenceControls />
        </Right>
      </Inner>
    </Shell>
  );
}
