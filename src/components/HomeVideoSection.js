"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";
import { usePreferences } from "@/context/PreferencesContext";
import { localize } from "@/lib/i18n";

const Shell = styled.section`
  max-width: 1160px;
  margin: 0 auto;
  padding: 8px 20px 42px;
`;

const Card = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: 1.05fr 0.95fr;
  padding: 28px;
  border-radius: ${theme.radii.card};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.soft};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h2`
  margin: 0 0 10px;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  letter-spacing: -0.045em;
`;

const Body = styled.p`
  margin: 0;
  color: ${theme.colors.muted};
  line-height: 1.75;
`;

const Frame = styled.div`
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid ${theme.colors.border};
  background: rgba(0, 0, 0, 0.08);
  min-height: 280px;

  iframe,
  video,
  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  iframe,
  video {
    min-height: 280px;
  }

  img {
    object-fit: cover;
  }
`;

function embedUrl(url) {
  if (!url) return "";
  if (url.includes("youtube.com/watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }
  if (url.includes("youtu.be/")) {
    return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
  }
  if (url.includes("vimeo.com/")) {
    return `https://player.vimeo.com/video/${url.split("vimeo.com/")[1].split("?")[0]}`;
  }
  return url;
}

export default function HomeVideoSection({ video }) {
  const { locale } = usePreferences();
  const title = localize(video.title, locale);
  const body = localize(video.body, locale);
  const url = video.videoUrl || "";
  const embed = embedUrl(url);
  const isIframe = /youtube\.com|youtu\.be|vimeo\.com/.test(url);
  const isDirectVideo = !isIframe && /\.(mp4|webm|ogg)(\?|$)/i.test(url);

  if (!title && !body && !url && !video.poster?.url) return null;

  return (
    <Shell>
      <Card>
        <div>
          {title && <Title>{title}</Title>}
          {body && <Body>{body}</Body>}
        </div>
        <Frame>
          {isIframe ? (
            <iframe
              src={embed}
              title={title || "MindBody Roots video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : isDirectVideo ? (
            <video controls poster={video.poster?.url || undefined}>
              <source src={url} />
            </video>
          ) : video.poster?.url ? (
            <img src={video.poster.url} alt={title || "Video preview"} />
          ) : null}
        </Frame>
      </Card>
    </Shell>
  );
}
