"use client";

import Link from "next/link";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { usePreferences } from "@/context/PreferencesContext";
import { useContent } from "@/context/ContentContext";
import { localize } from "@/lib/i18n";

const Wrap = styled.section`
  max-width: 1160px;
  margin: 0 auto;
  padding: 86px 20px 54px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 46px;
  align-items: center;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding-top: 58px;
  }
`;

const Badge = styled.p`
  display: inline-flex;
  margin: 0 0 18px;
  padding: 8px 14px;
  border-radius: ${theme.radii.pill};
  background: rgba(47, 125, 92, 0.1);
  color: ${theme.colors.primaryDark};
  font-weight: 800;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: clamp(3rem, 4vw, 5.9rem);
  line-height: 0.95;
  letter-spacing: -0.055em;
`;

const Lead = styled.p`
  margin: 24px 0 0;
  max-width: 640px;
  color: ${theme.colors.muted};
  font-size: clamp(1.08rem, 2vw, 1.3rem);
  line-height: 1.75;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 30px;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 20px;
  border-radius: ${theme.radii.pill};
  font-weight: 800;
  transition: 180ms ease;
  background: ${({ $secondary }) =>
    $secondary ? "transparent" : theme.colors.primary};
  color: ${({ $secondary }) =>
    $secondary ? theme.colors.primaryDark : "white"};
  border: 1px solid
    ${({ $secondary }) =>
      $secondary ? theme.colors.border : theme.colors.primary};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.soft};
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid ${theme.colors.border};
  border-radius: 34px;
  padding: 30px;
  box-shadow: ${theme.shadows.soft};

  html[data-theme="dark"] & {
    background: rgba(17, 24, 20, 0.78);
  }
`;

const Quote = styled.blockquote`
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  line-height: 1.15;
  letter-spacing: -0.05em;
  font-weight: 800;
`;

const Mini = styled.p`
  color: ${theme.colors.muted};
  line-height: 1.7;
  margin: 20px 0 0;
`;

const MediaShell = styled.div`
  margin-top: 24px;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid ${theme.colors.border};
  background: rgba(0, 0, 0, 0.08);

  img,
  video,
  iframe {
    display: block;
    width: 100%;
    height: auto;
  }

  iframe,
  video {
    min-height: 280px;
  }

  img {
    object-fit: cover;
  }
`;

const Caption = styled.p`
  color: ${theme.colors.muted};
  line-height: 1.6;
  margin: 12px 0 0;
  font-size: 0.94rem;
`;

function ActionLink({ href, secondary = false, children }) {
  const isExternal = /^https?:\/\//i.test(href || "");
  if (isExternal) {
    return (
      <Button as="a" href={href} target="_blank" rel="noopener noreferrer" $secondary={secondary}>
        {children}
      </Button>
    );
  }
  return (
    <Button href={href} $secondary={secondary}>
      {children}
    </Button>
  );
}

function renderVideoUrl(url, title) {
  if (!url) return null;
  if (url.includes("youtube.com/watch?v=")) {
    const embed = url.replace("watch?v=", "embed/");
    return <iframe src={embed} title={title || "MindBody Roots video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />;
  }
  if (url.includes("youtu.be/")) {
    const embed = `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
    return <iframe src={embed} title={title || "MindBody Roots video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />;
  }
  if (url.includes("vimeo.com/")) {
    const embed = `https://player.vimeo.com/video/${url.split("vimeo.com/")[1].split("?")[0]}`;
    return <iframe src={embed} title={title || "MindBody Roots video"} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />;
  }
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) {
    return (
      <video controls>
        <source src={url} />
      </video>
    );
  }
  return null;
}

export default function Hero() {
  const { locale } = usePreferences();
  const { homePage } = useContent();
  const hero = homePage.hero;
  const title = localize(hero.title, locale);
  const lead = localize(hero.lead, locale);
  const badge = localize(hero.badge, locale);
  const primaryLabel = localize(hero.primaryLabel, locale);
  const secondaryLabel = localize(hero.secondaryLabel, locale);
  const quote = localize(hero.quote, locale);
  const cardBody = localize(hero.cardBody, locale);
  const mediaCaption = localize(hero.mediaCaption, locale);
  const embeddedVideo = renderVideoUrl(hero.videoUrl, title);

  return (
    <Wrap>
      <div>
        {badge && <Badge>{badge}</Badge>}
        <H1>{title}</H1>
        <Lead>{lead}</Lead>
        <Actions>
          <ActionLink href={hero.primaryUrl || "/blog"}>{primaryLabel}</ActionLink>
          <ActionLink href={hero.secondaryUrl || "/recommendations"} secondary>
            {secondaryLabel}
          </ActionLink>
        </Actions>
      </div>
      <Card>
        <Quote>“{quote}”</Quote>
        <Mini>{cardBody}</Mini>
        {(hero.media?.url || embeddedVideo) && (
          <>
            <MediaShell>
              {embeddedVideo || (hero.media?.mime?.startsWith("video/") ? (
                <video controls>
                  <source src={hero.media.url} type={hero.media.mime} />
                </video>
              ) : (
                <img src={hero.media.url} alt={title || "MindBody Roots hero"} />
              ))}
            </MediaShell>
            {mediaCaption && <Caption>{mediaCaption}</Caption>}
          </>
        )}
      </Card>
    </Wrap>
  );
}
