"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import BlogCard from "@/components/BlogCard";
import ProductCard from "@/components/ProductCard";
import QuoteCard from "@/components/QuoteCard";
import DisclaimerNotice from "@/components/DisclaimerNotice";
import HomeVideoSection from "@/components/HomeVideoSection";
import { usePreferences } from "@/context/PreferencesContext";
import { useContent } from "@/context/ContentContext";
import { localize } from "@/lib/i18n";
import { theme } from "@/styles/theme";

const introSeenKey = "mindbody-roots-intro-seen";

const fallbackCarouselSlides = [
  {
    src: "/mypicture.JPG",
    alt: "MindBody Roots portrait and natural calm",
    title: { en: "A softer place to begin", ka: "რბილი დასაწყისი" },
    body: {
      en: "Add your own homepage images here, or upload article/product images in Strapi and they will flow into this carousel automatically.",
      ka: "აქ შეგიძლია დაამატო შენი სურათები, ან ატვირთო სტატიებისა და რეკომენდაციების ფოტოები Strapi-ში და ისინი ავტომატურად გამოჩნდება კარუსელში.",
    },
  },
  {
    src: "",
    alt: "Golden breathing light",
    title: {
      en: "Warm light, less pressure",
      ka: "თბილი სინათლე, ნაკლები დაძაბულობა",
    },
    body: {
      en: "Rounded shapes, slow motion, and nature colors help the page feel safe before asking the visitor to read.",
      ka: "მრგვალი ფორმები, ნელი მოძრაობა და ბუნებრივი ფერები გვერდს უსაფრთხო და მშვიდ შეგრძნებას აძლევს.",
    },
  },
  {
    src: "",
    alt: "Neural garden animation",
    title: {
      en: "Brain-friendly reading rhythm",
      ka: "ტვინისთვის სასიამოვნო კითხვის რიტმი",
    },
    body: {
      en: "Short chapters, soft contrast, and clear next steps reduce cognitive load and invite gentle curiosity.",
      ka: "მოკლე თავები, რბილი კონტრასტი და მკაფიო ნაბიჯები ამცირებს დატვირთვას და აჩენს მშვიდ ცნობისმოყვარეობას.",
    },
  },
];

const phaseCopy = {
  en: [
    {
      key: "arrive",
      label: "Arrive",
      eyebrow: "Phase 01",
      headline: "Come home to your body.",
      body: "Begin with a slower, softer entry into the mind-body connection: breath, awareness, and the small rituals that help your nervous system settle.",
      cta: "Begin the journey",
      href: "#listen",
    },
    {
      key: "listen",
      label: "Listen",
      eyebrow: "Phase 02",
      headline: "Notice the patterns underneath the noise.",
      body: "Explore how unconscious habits, stress loops, and daily cues shape the way you think, feel, move, and recover.",
      cta: "Read the articles",
      href: "#articles",
    },
    {
      key: "ground",
      label: "Ground",
      eyebrow: "Phase 03",
      headline: "Build practices your life can actually hold.",
      body: "MindBody Roots focuses on repeatable basics: gentle movement, self-inquiry, rest, nutrition, and rituals that make balance easier to return to.",
      cta: "Explore tools",
      href: "#tools",
    },
    {
      key: "restore",
      label: "Restore",
      eyebrow: "Phase 04",
      headline: "Let education become embodied support.",
      body: "Featured guides, quotes, and recommendations come together as a calm library for everyday mind-body restoration.",
      cta: "See resources",
      href: "#resources",
    },
    {
      key: "begin",
      label: "Begin",
      eyebrow: "Phase 05",
      headline: "Start with one breath, then one small choice.",
      body: "You do not need a dramatic reset. You need a grounded next step that you can repeat tomorrow.",
      cta: "Start here",
      href: "/blog",
    },
  ],
  ka: [
    {
      key: "arrive",
      label: "მოსვლა",
      eyebrow: "ფაზა 01",
      headline: "დაბრუნდი საკუთარ სხეულში.",
      body: "დაიწყე ნელა და რბილად: სუნთქვით, ცნობიერებით და პატარა რიტუალებით, რომლებიც ნერვულ სისტემას დამშვიდებაში ეხმარება.",
      cta: "დაიწყე გზა",
      href: "#listen",
    },
    {
      key: "listen",
      label: "მოსმენა",
      eyebrow: "ფაზა 02",
      headline: "შეამჩნიე ჩვევები ხმაურის ქვეშ.",
      body: "გაიგე, როგორ მოქმედებს არაცნობიერი ჩვევები, სტრესის ციკლები და ყოველდღიური ნიშნები ფიქრზე, შეგრძნებებზე, მოძრაობასა და აღდგენაზე.",
      cta: "წაიკითხე სტატიები",
      href: "#articles",
    },
    {
      key: "ground",
      label: "დამიწება",
      eyebrow: "ფაზა 03",
      headline: "შექმენი პრაქტიკები, რომლებსაც ცხოვრება იტევს.",
      body: "MindBody Roots ეყრდნობა გამეორებად საფუძვლებს: რბილ მოძრაობას, თვითდაკვირვებას, დასვენებას, კვებას და ბალანსთან დაბრუნების რიტუალებს.",
      cta: "ნახე ხელსაწყოები",
      href: "#tools",
    },
    {
      key: "restore",
      label: "აღდგენა",
      eyebrow: "ფაზა 04",
      headline: "ცოდნა აქციე სხეულებრივ მხარდაჭერად.",
      body: "რჩეული გზამკვლევები, ციტატები და რეკომენდაციები ერთიანდება მშვიდ ბიბლიოთეკად ყოველდღიური აღდგენისთვის.",
      cta: "ნახე რესურსები",
      href: "#resources",
    },
    {
      key: "begin",
      label: "დაწყება",
      eyebrow: "ფაზა 05",
      headline: "დაიწყე ერთი სუნთქვით და ერთი პატარა არჩევანით.",
      body: "დიდი გადატვირთვა აუცილებელი არ არის. საჭიროა მხოლოდ დამიწებული შემდეგი ნაბიჯი, რომელსაც ხვალაც გაიმეორებ.",
      cta: "დაიწყე აქ",
      href: "/blog",
    },
  ],
};

const breathe = keyframes`
  0%, 100% { transform: scale(0.96); opacity: 0.74; }
  50% { transform: scale(1.06); opacity: 1; }
`;

const drift = keyframes`
  0%, 100% { transform: translate3d(-2%, 0, 0); }
  50% { transform: translate3d(2%, -2%, 0); }
`;

const pulseLine = keyframes`
  0%, 100% { stroke-dashoffset: 220; opacity: 0.35; }
  50% { stroke-dashoffset: 40; opacity: 0.9; }
`;

const neuralDraw = keyframes`
  0% { stroke-dashoffset: 640; opacity: 0.18; }
  45% { opacity: 0.92; }
  100% { stroke-dashoffset: 0; opacity: 0.52; }
`;

const floatUp = keyframes`
  0%, 100% { transform: translate3d(0, 8px, 0) scale(0.98); opacity: 0.52; }
  50% { transform: translate3d(0, -14px, 0) scale(1.04); opacity: 1; }
`;

const haloSpin = keyframes`
  to { transform: rotate(360deg); }
`;

const slowPan = keyframes`
  0%, 100% { transform: translate3d(-1.5%, 0, 0) scale(1.03); }
  50% { transform: translate3d(1.5%, -1%, 0) scale(1.07); }
`;

const IntroOverlay = styled.div`
  position: fixed;
  inset: 72px 0 0;
  z-index: 15;
  display: grid;
  place-items: center;
  padding: 28px;
  background:
    radial-gradient(
      circle at 50% 44%,
      rgba(240, 198, 110, 0.18),
      transparent 18rem
    ),
    radial-gradient(
      circle at 50% 58%,
      rgba(120, 195, 156, 0.22),
      transparent 24rem
    ),
    linear-gradient(180deg, #fbfaf6 0%, #eee7d8 100%);
  color: #17211b;
  transition:
    opacity 420ms ease,
    visibility 420ms ease;

  html[data-theme="dark"] & {
    background:
      radial-gradient(
        circle at 50% 44%,
        rgba(240, 198, 110, 0.14),
        transparent 18rem
      ),
      radial-gradient(
        circle at 50% 58%,
        rgba(120, 195, 156, 0.18),
        transparent 24rem
      ),
      linear-gradient(180deg, #07110d 0%, #132119 100%);
    color: #eef5ee;
  }
`;

const IntroButton = styled.button`
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  text-align: center;
  display: grid;
  gap: clamp(34px, 8vh, 80px);
  justify-items: center;
`;

const Microcopy = styled.span`
  font-size: 0.72rem;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  font-weight: 800;
`;

const SeedMark = styled.span`
  width: min(34vw, 190px);
  aspect-ratio: 1;
  border: 1px solid rgba(47, 125, 92, 0.22);
  border-radius: 50% 50% 46% 46%;
  display: grid;
  place-items: center;
  position: relative;
  animation: ${breathe} 5.4s ease-in-out infinite;

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: 18%;
    border: 1px solid rgba(47, 125, 92, 0.24);
    border-radius: 50%;
  }

  &::after {
    inset: 36% 47%;
    border-radius: 999px;
    background: rgba(215, 169, 79, 0.45);
  }

  html[data-theme="dark"] & {
    border-color: rgba(120, 195, 156, 0.28);
    box-shadow: 0 0 80px rgba(120, 195, 156, 0.12);
  }
`;

const Page = styled.div`
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 50% 10%,
      rgba(240, 198, 110, 0.18),
      transparent 18rem
    ),
    radial-gradient(
      circle at 50% 30%,
      rgba(120, 195, 156, 0.16),
      transparent 24rem
    ),
    linear-gradient(
      180deg,
      rgba(10, 21, 16, 0.98) 0%,
      rgba(17, 35, 27, 0.96) 42%,
      rgba(247, 241, 229, 0.94) 100%
    );
  color: #f8f3e8;

  html[data-theme="light"] & {
    background:
      radial-gradient(
        circle at 50% 10%,
        rgba(215, 169, 79, 0.24),
        transparent 18rem
      ),
      radial-gradient(
        circle at 48% 28%,
        rgba(47, 125, 92, 0.16),
        transparent 24rem
      ),
      linear-gradient(
        180deg,
        rgba(24, 51, 39, 0.98) 0%,
        rgba(42, 78, 60, 0.93) 46%,
        rgba(251, 250, 246, 0.96) 100%
      );
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 999px;
    filter: blur(70px);
    animation: ${drift} 16s ease-in-out infinite;
  }

  &::before {
    width: 34vw;
    height: 34vw;
    min-width: 260px;
    min-height: 260px;
    left: 58%;
    top: 8%;
    background: rgba(120, 195, 156, 0.22);
  }

  &::after {
    width: 28vw;
    height: 22vw;
    left: 8%;
    top: 26%;
    background: rgba(240, 198, 110, 0.14);
    animation-delay: -7s;
  }
`;

const Hero = styled.section`
  position: relative;
  min-height: calc(100svh - 70px);
  display: grid;
  grid-template-columns: minmax(0, 0.94fr) minmax(280px, 0.72fr);
  align-items: center;
  gap: clamp(28px, 5vw, 80px);
  max-width: 1220px;
  margin: 0 auto;
  padding: clamp(74px, 12vh, 120px) 20px clamp(78px, 12vh, 118px);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding-top: 62px;
  }
`;

const PhaseLabel = styled.p`
  margin: 0 0 16px;
  color: #e9c46a;
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.28em;
  text-transform: uppercase;
`;

const H1 = styled.h1`
  margin: 0;
  max-width: 820px;
  font-size: clamp(5rem, 5vw, 9.8rem);
  line-height: 0.82;
  letter-spacing: 0.005em;
  text-wrap: "balance";
`;

const Lead = styled.p`
  margin: 28px 0 0;
  max-width: 660px;
  color: rgba(248, 243, 232, 0.76);
  font-size: clamp(1.06rem, 2vw, 1.32rem);
  line-height: 1.75;
`;

const Actions = styled.div`
  margin-top: 34px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
`;

const PrimaryAction = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #fff9ee;
  font-weight: 900;
  letter-spacing: -0.02em;

  &::before {
    content: "→";
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border-radius: 18px;
    color: #122117;
    background: #e9c46a;
    box-shadow: 0 18px 48px rgba(233, 196, 106, 0.22);
    transition: 220ms ease;
  }

  &:hover::before {
    transform: translateX(4px) translateY(-2px);
  }
`;

const SecondaryAction = styled(Link)`
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: ${theme.radii.pill};
  color: rgba(248, 243, 232, 0.82);
  font-weight: 800;
  transition: 200ms ease;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const VisualStage = styled.div`
  position: relative;
  min-height: min(72vw, 560px);
  display: grid;
  place-items: center;

  @media (max-width: 900px) {
    min-height: 380px;
  }
`;

const Orb = styled.div`
  position: relative;
  width: min(68vw, 430px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(
      circle at 42% 35%,
      rgba(255, 248, 224, 0.95) 0 9%,
      rgba(233, 196, 106, 0.76) 12%,
      rgba(120, 195, 156, 0.42) 32%,
      rgba(25, 70, 52, 0.16) 58%,
      transparent 70%
    ),
    conic-gradient(
      from 140deg,
      rgba(233, 196, 106, 0.18),
      rgba(120, 195, 156, 0.3),
      rgba(255, 255, 255, 0.08),
      rgba(233, 196, 106, 0.18)
    );
  box-shadow:
    0 0 90px rgba(120, 195, 156, 0.3),
    inset 0 0 80px rgba(255, 255, 255, 0.1);
  animation: ${breathe} 6s ease-in-out infinite;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  &::before {
    inset: 13%;
  }

  &::after {
    inset: 29% 47%;
    border-radius: 999px;
    background: rgba(255, 248, 224, 0.22);
  }
`;

const BrainHalo = styled.div`
  position: absolute;
  width: min(78vw, 500px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    conic-gradient(
      from 120deg,
      transparent,
      rgba(233, 196, 106, 0.28),
      transparent,
      rgba(120, 195, 156, 0.3),
      transparent
    ),
    radial-gradient(circle, rgba(255, 248, 224, 0.2), transparent 60%);
  filter: blur(0.4px);
  opacity: 0.9;
  animation: ${haloSpin} 28s linear infinite;
`;

const BrainCard = styled.div`
  position: relative;
  width: min(70vw, 430px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 44% 56% 50% 50%;
  background:
    radial-gradient(
      circle at 50% 42%,
      rgba(255, 248, 224, 0.2),
      transparent 34%
    ),
    radial-gradient(
      circle at 42% 50%,
      rgba(120, 195, 156, 0.18),
      transparent 48%
    );
  box-shadow:
    inset 0 0 80px rgba(255, 255, 255, 0.08),
    0 28px 110px rgba(120, 195, 156, 0.28);
  animation: ${breathe} 7.2s ease-in-out infinite;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background: rgba(233, 196, 106, 0.78);
    box-shadow: 0 0 36px rgba(233, 196, 106, 0.42);
    animation: ${floatUp} 5.8s ease-in-out infinite;
  }

  &::before {
    width: 12px;
    height: 12px;
    left: 22%;
    top: 26%;
  }

  &::after {
    width: 9px;
    height: 9px;
    right: 20%;
    bottom: 28%;
    animation-delay: -2.4s;
  }
`;

const BrainSvg = styled.svg`
  width: 92%;
  height: 92%;
  overflow: visible;

  .brain-fill {
    fill: rgba(255, 248, 224, 0.055);
    stroke: rgba(255, 248, 224, 0.18);
    stroke-width: 1.2;
  }

  .neural {
    fill: none;
    stroke: rgba(248, 243, 232, 0.74);
    stroke-width: 2.1;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 640;
    animation: ${neuralDraw} 8.5s ease-in-out infinite alternate;
  }

  .warm {
    stroke: rgba(233, 196, 106, 0.9);
    animation-delay: -2.2s;
  }

  .cool {
    stroke: rgba(120, 195, 156, 0.86);
    animation-delay: -4s;
  }

  circle {
    fill: rgba(255, 248, 224, 0.95);
    filter: drop-shadow(0 0 10px rgba(233, 196, 106, 0.55));
    animation: ${floatUp} 4.8s ease-in-out infinite;
  }
`;

const BrainCaption = styled.div`
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: ${theme.radii.pill};
  color: rgba(255, 249, 238, 0.82);
  background: rgba(8, 20, 14, 0.38);
  backdrop-filter: blur(16px);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const RootSvg = styled.svg`
  position: absolute;
  left: 50%;
  bottom: 3%;
  width: min(88vw, 620px);
  transform: translateX(-50%);
  opacity: 0.76;

  path {
    fill: none;
    stroke: rgba(233, 196, 106, 0.52);
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-dasharray: 220;
    animation: ${pulseLine} 7s ease-in-out infinite;
  }
`;

const Progress = styled.nav`
  position: sticky;
  top: 76px;
  z-index: 10;
  max-width: 920px;
  margin: -44px auto 0;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  gap: 12px;

  @media (max-width: 700px) {
    top: 82px;
    overflow-x: auto;
    justify-content: flex-start;
  }
`;

const Dot = styled.a`
  width: ${({ $active }) => ($active ? "86px" : "34px")};
  height: 34px;
  border-radius: ${theme.radii.pill};
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: ${({ $active }) =>
    $active ? "rgba(233, 196, 106, 0.92)" : "rgba(255, 255, 255, 0.08)"};
  color: ${({ $active }) =>
    $active ? "#112117" : "rgba(255, 255, 255, 0.74)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  backdrop-filter: blur(18px);
  transition: 220ms ease;
  flex: 0 0 auto;
`;

const ScrollPrompt = styled.a`
  position: absolute;
  left: 50%;
  bottom: 26px;
  transform: translateX(-50%);
  color: rgba(248, 243, 232, 0.68);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  display: grid;
  justify-items: center;
  gap: 10px;

  &::before {
    content: "";
    width: 1px;
    height: 32px;
    background: linear-gradient(180deg, transparent, rgba(248, 243, 232, 0.82));
  }
`;

const TrustBadge = styled(Link)`
  position: absolute;
  right: 20px;
  bottom: 24px;
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 12px;
  align-items: center;
  max-width: 278px;
  padding: 12px 16px 12px 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  color: #fff9ee;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);

  @media (max-width: 760px) {
    position: static;
    margin: -42px 20px 28px auto;
  }
`;

const TrustIcon = styled.span`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(233, 196, 106, 0.92);
  color: #122117;
  font-weight: 900;
`;

const TrustText = styled.span`
  display: grid;
  gap: 2px;

  strong {
    font-size: 0.95rem;
  }

  small {
    color: rgba(248, 243, 232, 0.68);
    font-weight: 700;
  }
`;

const PhaseSection = styled.section`
  position: relative;
  max-width: 1160px;
  margin: 0 auto;
  padding: clamp(74px, 12vh, 128px) 20px;
  color: ${({ $dark }) => ($dark ? "#f8f3e8" : theme.colors.text)};
`;

const PhaseGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.74fr) minmax(0, 1fr);
  gap: clamp(24px, 5vw, 64px);
  align-items: center;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const PhaseNumber = styled.p`
  margin: 0 0 14px;
  color: ${theme.colors.accent};
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.26em;
  text-transform: uppercase;
`;

const PhaseHeading = styled.h2`
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 5.4rem);
  line-height: 0.92;
  letter-spacing: -0.065em;
  text-wrap: balance;
`;

const PhaseBody = styled.p`
  margin: 22px 0 0;
  color: ${({ $dark }) =>
    $dark ? "rgba(248, 243, 232, 0.72)" : theme.colors.muted};
  font-size: clamp(1rem, 1.8vw, 1.18rem);
  line-height: 1.8;
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const GlassPanel = styled.div`
  padding: clamp(24px, 4vw, 38px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 34px;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(20px);
`;

const CarouselSection = styled.section`
  position: relative;
  max-width: 1220px;
  margin: 0 auto;
  padding: clamp(74px, 12vh, 128px) 20px;
  color: #f8f3e8;
`;

const CarouselShell = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: clamp(28px, 5vw, 54px);
  background:
    radial-gradient(
      circle at 20% 10%,
      rgba(233, 196, 106, 0.24),
      transparent 24rem
    ),
    radial-gradient(
      circle at 82% 22%,
      rgba(120, 195, 156, 0.22),
      transparent 26rem
    ),
    rgba(255, 255, 255, 0.075);
  box-shadow: 0 34px 110px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(24px);
`;

const CarouselInner = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(0, 1fr);
  min-height: clamp(520px, 72vw, 680px);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const CarouselCopy = styled.div`
  position: relative;
  z-index: 2;
  align-self: end;
  padding: clamp(26px, 5vw, 58px);

  h2 {
    margin: 0;
    font-size: clamp(2.7rem, 6.2vw, 6.8rem);
    line-height: 0.86;
    letter-spacing: -0.075em;
    text-wrap: balance;
  }

  p {
    max-width: 520px;
    margin: 22px 0 0;
    color: rgba(248, 243, 232, 0.74);
    line-height: 1.75;
    font-size: clamp(1rem, 1.7vw, 1.14rem);
  }
`;

const CarouselStage = styled.div`
  position: relative;
  min-height: 520px;
  overflow: hidden;

  @media (max-width: 860px) {
    min-height: 380px;
  }
`;

const Slide = styled.div`
  position: absolute;
  inset: 18px;
  display: grid;
  place-items: center;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: ${({ $active }) =>
    $active ? "scale(1) translateY(0)" : "scale(0.96) translateY(18px)"};
  transition:
    opacity 700ms ease,
    transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1);
  pointer-events: ${({ $active }) => ($active ? "auto" : "none")};
`;

const SlideImage = styled.div`
  width: min(100%, 590px);
  aspect-ratio: 4 / 5;
  border-radius: clamp(26px, 5vw, 48px);
  background: ${({ $src }) =>
    $src
      ? `linear-gradient(180deg, rgba(6, 16, 11, 0.08), rgba(6, 16, 11, 0.58)), url(${$src})`
      : "radial-gradient(circle at 34% 26%, rgba(255, 248, 224, 0.84), transparent 10rem), radial-gradient(circle at 66% 62%, rgba(120, 195, 156, 0.55), transparent 13rem), linear-gradient(145deg, rgba(233, 196, 106, 0.3), rgba(19, 48, 35, 0.76))"};
  background-size: cover;
  background-position: center;
  box-shadow:
    0 34px 90px rgba(0, 0, 0, 0.32),
    inset 0 0 0 1px rgba(255, 255, 255, 0.14);
  animation: ${slowPan} 12s ease-in-out infinite;
`;

const SlideBadge = styled.div`
  position: absolute;
  right: clamp(18px, 4vw, 46px);
  bottom: clamp(22px, 5vw, 52px);
  max-width: min(360px, calc(100% - 36px));
  padding: 18px 20px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 28px;
  background: rgba(7, 18, 12, 0.56);
  backdrop-filter: blur(18px);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.18);

  strong {
    display: block;
    color: #fff9ee;
    font-size: 1.04rem;
  }

  span {
    display: block;
    margin-top: 8px;
    color: rgba(248, 243, 232, 0.72);
    line-height: 1.55;
    font-size: 0.92rem;
  }
`;

const CarouselControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
`;

const CarouselButton = styled.button`
  min-width: 46px;
  height: 46px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: ${theme.radii.pill};
  color: ${({ $active }) =>
    $active ? "#132117" : "rgba(248, 243, 232, 0.78)"};
  background: ${({ $active }) =>
    $active ? "#e9c46a" : "rgba(255, 255, 255, 0.08)"};
  font-weight: 900;
  cursor: pointer;
  transition: 220ms ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    background: ${({ $active }) =>
      $active ? "#f2d27c" : "rgba(255, 255, 255, 0.14)"};
    outline: none;
  }
`;

const CalmSignals = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  span {
    min-height: 72px;
    display: grid;
    align-content: center;
    gap: 4px;
    padding: 14px;
    border-radius: 22px;
    color: rgba(248, 243, 232, 0.78);
    background: rgba(255, 255, 255, 0.075);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(14px);
    font-size: 0.78rem;
    font-weight: 800;
  }

  strong {
    color: #fff9ee;
    font-size: 0.95rem;
  }
`;

const FinalCta = styled.section`
  position: relative;
  max-width: 1040px;
  margin: 0 auto;
  padding: clamp(70px, 12vh, 132px) 20px clamp(90px, 14vh, 150px);
  text-align: center;
  color: ${theme.colors.text};

  h2 {
    margin: 0;
    font-size: clamp(2.7rem, 7vw, 7rem);
    line-height: 0.88;
    letter-spacing: -0.075em;
  }

  p {
    max-width: 680px;
    margin: 24px auto 0;
    color: ${theme.colors.muted};
    line-height: 1.8;
    font-size: 1.08rem;
  }
`;

const CtaButton = styled(Link)`
  margin-top: 32px;
  min-height: 54px;
  padding: 0 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radii.pill};
  background: ${theme.colors.primary};
  color: white;
  font-weight: 900;
  box-shadow: ${theme.shadows.soft};
  transition: 200ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.hover};
  }
`;

function IntroGate({ locale }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(introSeenKey) !== "true");
    } catch {
      setVisible(true);
    }
  }, []);

  function enter() {
    try {
      window.localStorage.setItem(introSeenKey, "true");
    } catch {
      // ignore storage failures
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <IntroOverlay
      role="dialog"
      aria-label={
        locale === "ka" ? "MindBody Roots შესავალი" : "MindBody Roots intro"
      }
    >
      <IntroButton type="button" onClick={enter}>
        <Microcopy>
          {locale === "ka" ? "იტვირთება 5 ფაზა" : "Loading 5 phases"}
        </Microcopy>
        <SeedMark aria-hidden="true" />
        <Microcopy>
          {locale === "ka" ? "დააკლიკე შესასვლელად" : "Click to enter"}
        </Microcopy>
        <Microcopy>
          {locale === "ka"
            ? "ყურსასმენები სურვილისამებრ"
            : "Headphones optional"}
        </Microcopy>
      </IntroButton>
    </IntroOverlay>
  );
}

function PhaseProgress({ phases, activeKey }) {
  return (
    <Progress aria-label="Homepage phases">
      {phases.map((phase, index) => (
        <Dot
          key={phase.key}
          href={`#${phase.key}`}
          $active={activeKey === phase.key}
          aria-label={`Go to ${phase.label}`}
        >
          {activeKey === phase.key
            ? phase.label
            : `${String(index + 1).padStart(2, "0")}`}
        </Dot>
      ))}
    </Progress>
  );
}

function RootLines() {
  return (
    <RootSvg viewBox="0 0 620 220" aria-hidden="true">
      <path d="M310 10 C308 56 307 88 310 120 C284 100 252 92 214 94" />
      <path d="M310 118 C332 92 366 78 412 80" />
      <path d="M310 122 C296 148 260 166 196 180" />
      <path d="M310 122 C338 158 386 178 470 194" />
      <path d="M310 120 C306 150 310 180 320 214" />
      <path d="M214 94 C174 96 142 108 112 132" />
      <path d="M412 80 C454 78 488 88 520 112" />
    </RootSvg>
  );
}

function BrainVisual({ locale }) {
  return (
    <>
      <Orb aria-hidden="true" />
      <BrainHalo aria-hidden="true" />
      <BrainCard>
        <BrainSvg
          viewBox="0 0 420 420"
          role="img"
          aria-label={
            locale === "ka"
              ? "მშვიდი ადამიანის ტვინის ანიმაცია"
              : "Calm animated human brain"
          }
        >
          <path
            className="brain-fill"
            d="M205 96c-50-34-116 2-116 67 0 16 4 29 11 41-20 16-24 49-7 71 11 14 28 22 46 21 10 31 41 51 75 43 18 21 53 20 72-1 45 6 81-27 78-69 24-20 24-61 0-82 9-43-27-87-73-82-18-25-58-29-86-9Z"
          />
          <path
            className="neural warm"
            d="M136 180c30-42 73-43 102-9 20 24 50 24 77 5"
          />
          <path
            className="neural cool"
            d="M126 246c28-12 55-8 78 14 28 28 65 28 96 4"
          />
          <path
            className="neural"
            d="M207 122c-7 48-2 82 18 112 16 24 18 49 6 80"
          />
          <path
            className="neural warm"
            d="M166 302c14-35 40-52 78-50 34 1 57-14 69-43"
          />
          <path
            className="neural cool"
            d="M118 212c35 8 63 0 83-24 19-22 47-30 88-22"
          />
          <circle cx="136" cy="180" r="5" />
          <circle cx="238" cy="171" r="5" style={{ animationDelay: "-1s" }} />
          <circle cx="315" cy="176" r="5" style={{ animationDelay: "-2s" }} />
          <circle cx="126" cy="246" r="5" style={{ animationDelay: "-3s" }} />
          <circle cx="300" cy="264" r="5" style={{ animationDelay: "-4s" }} />
        </BrainSvg>
      </BrainCard>
      <RootLines />
      <BrainCaption>
        {locale === "ka" ? "ნელა • თბილად • ცოცხლად" : "Slow • warm • alive"}
      </BrainCaption>
    </>
  );
}

function buildCarouselSlides(homePage, locale) {
  const dynamicSlides = [
    homePage.hero?.media
      ? {
          src: homePage.hero.media.url,
          alt:
            homePage.hero.media.alternativeText || "MindBody Roots hero image",
          title: homePage.hero.title,
          body: homePage.hero.lead,
        }
      : null,
    ...(homePage.featuredArticles || []).map((post) =>
      post.coverImage
        ? {
            src: post.coverImage.url,
            alt:
              post.coverImage.alternativeText ||
              localize(post.title, locale) ||
              "MindBody Roots article image",
            title: post.title,
            body: post.excerpt,
          }
        : null,
    ),
    ...(homePage.featuredProducts || []).map((product) =>
      product.image
        ? {
            src: product.image.url,
            alt:
              product.image.alternativeText ||
              localize(product.title, locale) ||
              "MindBody Roots recommendation image",
            title: product.title,
            body: product.description,
          }
        : null,
    ),
    homePage.promoVideo?.poster
      ? {
          src: homePage.promoVideo.poster.url,
          alt:
            homePage.promoVideo.poster.alternativeText ||
            "MindBody Roots video poster",
          title: homePage.promoVideo.title,
          body: homePage.promoVideo.body,
        }
      : null,
  ].filter(Boolean);

  return dynamicSlides.length ? dynamicSlides : fallbackCarouselSlides;
}

function ImageCarousel({ slides, locale }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[active] || slides[0];

  return (
    <CarouselSection
      id="gallery"
      aria-label={
        locale === "ka" ? "მშვიდი სურათების კარუსელი" : "Calming image carousel"
      }
    >
      <CarouselShell>
        <CarouselInner>
          <CarouselCopy>
            <PhaseNumber>
              {locale === "ka" ? "ვიზუალური სუნთქვა" : "Visual breath"}
            </PhaseNumber>
            <h2>
              {locale === "ka"
                ? "სურათები, რომლებიც ნერვულ სისტემას ამშვიდებს."
                : "Images that help the nervous system settle."}
            </h2>
            <p>
              {locale === "ka"
                ? "კარუსელი ავტომატურად გამოიყენებს Strapi-ში ატვირთულ hero, blog, product ან video poster სურათებს. მანამდე ჩანს რბილი fallback ვიზუალები."
                : "This carousel automatically uses images from Strapi hero media, blog covers, product images, and video posters. Until then, soft fallback visuals keep the homepage alive."}
            </p>
            <CarouselControls
              aria-label={
                locale === "ka" ? "კარუსელის კონტროლები" : "Carousel controls"
              }
            >
              {slides.map((slide, index) => (
                <CarouselButton
                  key={`${slide.alt}-${index}`}
                  type="button"
                  $active={index === active}
                  onClick={() => setActive(index)}
                  aria-label={`${locale === "ka" ? "სურათი" : "Slide"} ${index + 1}: ${localize(slide.title, locale) || slide.alt}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </CarouselButton>
              ))}
            </CarouselControls>
            <CalmSignals
              aria-label={
                locale === "ka"
                  ? "სიმშვიდის დიზაინის ნიშნები"
                  : "Calming design signals"
              }
            >
              <span>
                <strong>{locale === "ka" ? "ნელი" : "Slow"}</strong>
                {locale === "ka" ? "სუნთქვის ტემპი" : "breathing pace"}
              </span>
              <span>
                <strong>{locale === "ka" ? "თბილი" : "Warm"}</strong>
                {locale === "ka" ? "ოქროსფერი სინათლე" : "golden light"}
              </span>
              <span>
                <strong>{locale === "ka" ? "რბილი" : "Soft"}</strong>
                {locale === "ka" ? "მრგვალი ფორმები" : "rounded forms"}
              </span>
              <span>
                <strong>{locale === "ka" ? "ცხადი" : "Clear"}</strong>
                {locale === "ka" ? "მცირე ნაბიჯები" : "small next steps"}
              </span>
            </CalmSignals>
          </CarouselCopy>
          <CarouselStage>
            {slides.map((slide, index) => (
              <Slide
                key={`${slide.alt}-${index}`}
                $active={index === active}
                aria-hidden={index !== active}
              >
                <SlideImage
                  $src={slide.src}
                  role="img"
                  aria-label={slide.alt}
                />
                <SlideBadge>
                  <strong>
                    {localize(slide.title, locale) || activeSlide.alt}
                  </strong>
                  <span>
                    {localize(slide.body, locale) ||
                      (locale === "ka"
                        ? "დაამატე ფოტოები Strapi-ში ან fallbackCarouselSlides-ში."
                        : "Add pictures in Strapi or in fallbackCarouselSlides.")}
                  </span>
                </SlideBadge>
              </Slide>
            ))}
          </CarouselStage>
        </CarouselInner>
      </CarouselShell>
    </CarouselSection>
  );
}

export default function ImmersiveHome() {
  const { locale } = usePreferences();
  const { homePage } = useContent();
  const phases = useMemo(() => phaseCopy[locale] || phaseCopy.en, [locale]);
  const [activeKey, setActiveKey] = useState(phases[0].key);
  const hero = homePage.hero;
  const featured = homePage.featuredArticlesSection;
  const tools = homePage.recommendationsSection;
  const rawHeroTitle = localize(hero.title, locale) || phases[0].headline;
  const heroTitle =
    locale === "en" && rawHeroTitle === "Be Friend of your mind."
      ? "Befriend your mind."
      : rawHeroTitle;
  const heroLead = localize(hero.lead, locale) || phases[0].body;
  const badge = localize(hero.badge, locale) || phases[0].eyebrow;
  const primaryLabel = localize(hero.primaryLabel, locale) || phases[0].cta;
  const secondaryLabel =
    localize(hero.secondaryLabel, locale) ||
    (locale === "ka" ? "სტატიები" : "Read the blog");
  const carouselSlides = useMemo(
    () => buildCarouselSlides(homePage, locale),
    [homePage, locale],
  );

  useEffect(() => {
    const targets = phases
      .map((phase) => document.getElementById(phase.key))
      .filter(Boolean);
    if (!targets.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveKey(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.35, 0.55] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [phases]);

  return (
    <Page>
      <IntroGate locale={locale} />
      <Atmosphere aria-hidden="true" />
      <Hero id="arrive">
        <div>
          <PhaseLabel>{badge}</PhaseLabel>
          <H1>{heroTitle}</H1>
          <Lead>{heroLead}</Lead>
          <Actions>
            <PrimaryAction href={hero.primaryUrl || "#listen"}>
              {primaryLabel}
            </PrimaryAction>
            <SecondaryAction href={hero.secondaryUrl || "/blog"}>
              {secondaryLabel}
            </SecondaryAction>
          </Actions>
        </div>
        <VisualStage>
          <BrainVisual locale={locale} />
        </VisualStage>
        <ScrollPrompt href="#listen">
          {locale === "ka" ? "ჩამოსქროლე" : "Scroll to discover"}
        </ScrollPrompt>
        <TrustBadge href="/about">
          <TrustIcon>✦</TrustIcon>
          <TrustText>
            <strong>
              {locale === "ka" ? "მშვიდი 5-ფაზიანი გზა" : "A calm 5-phase path"}
            </strong>
            <small>
              {locale === "ka"
                ? "გონება • სხეული • ფესვები"
                : "Mind • Body • Roots"}
            </small>
          </TrustText>
        </TrustBadge>
      </Hero>

      <PhaseProgress phases={phases} activeKey={activeKey} />

      <ImageCarousel slides={carouselSlides} locale={locale} />

      <PhaseSection id="listen" $dark>
        <PhaseGrid>
          <div>
            <PhaseNumber>{phases[1].eyebrow}</PhaseNumber>
            <PhaseHeading>{phases[1].headline}</PhaseHeading>
            <PhaseBody $dark>{phases[1].body}</PhaseBody>
            <Actions>
              <PrimaryAction href={phases[1].href}>
                {phases[1].cta}
              </PrimaryAction>
            </Actions>
          </div>
          <GlassPanel>
            {homePage.spotlightQuote ? (
              <QuoteCard quote={homePage.spotlightQuote} />
            ) : (
              <DisclaimerNotice />
            )}
          </GlassPanel>
        </PhaseGrid>
      </PhaseSection>

      <PhaseSection id="ground" $dark>
        <PhaseGrid>
          <GlassPanel>
            <DisclaimerNotice />
          </GlassPanel>
          <div>
            <PhaseNumber>{phases[2].eyebrow}</PhaseNumber>
            <PhaseHeading>{phases[2].headline}</PhaseHeading>
            <PhaseBody $dark>{phases[2].body}</PhaseBody>
          </div>
        </PhaseGrid>
      </PhaseSection>

      <PhaseSection id="restore">
        <div id="articles">
          <PhaseNumber>
            {localize(featured.eyebrow, locale) || phases[3].eyebrow}
          </PhaseNumber>
          <PhaseHeading>
            {localize(featured.title, locale) || phases[3].headline}
          </PhaseHeading>
          <PhaseBody>
            {localize(featured.body, locale) || phases[3].body}
          </PhaseBody>
        </div>
        <ResourceGrid style={{ marginTop: 34 }}>
          {homePage.featuredArticles.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </ResourceGrid>
      </PhaseSection>

      <PhaseSection id="begin">
        <div id="tools">
          <PhaseNumber>
            {localize(tools.eyebrow, locale) || phases[4].eyebrow}
          </PhaseNumber>
          <PhaseHeading>
            {localize(tools.title, locale) || phases[4].headline}
          </PhaseHeading>
          <PhaseBody>
            {localize(tools.body, locale) || phases[4].body}
          </PhaseBody>
        </div>
        <ResourceGrid id="resources" style={{ marginTop: 34 }}>
          {homePage.featuredProducts.map((product) => (
            <ProductCard
              key={product.documentId || product.url}
              product={product}
            />
          ))}
        </ResourceGrid>
      </PhaseSection>

      <HomeVideoSection video={homePage.promoVideo} />

      <FinalCta>
        <PhaseNumber>{phases[4].eyebrow}</PhaseNumber>
        <h2>{phases[4].headline}</h2>
        <p>{phases[4].body}</p>
        <CtaButton href={phases[4].href}>{phases[4].cta}</CtaButton>
      </FinalCta>
    </Page>
  );
}
