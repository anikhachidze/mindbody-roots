"use client";

import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { usePreferences } from "@/context/PreferencesContext";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; visibility: hidden; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: ${({ $theme }) =>
    $theme === "dark"
      ? "radial-gradient(circle at 50% 50%, #1a2e26 0%, #0a1510 100%)"
      : "radial-gradient(circle at 50% 50%, #f8f3e8 0%, #e8dcc8 100%)"};
  animation: ${({ $isExiting }) => ($isExiting ? fadeOut : fadeIn)} 0.6s ease-in-out;
  animation-fill-mode: forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin-top: 50vh;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  margin: 0 0 1rem;
  color: ${({ $theme }) => ($theme === "dark" ? "#e8dcc8" : "#1a2e26")};
  text-shadow: ${({ $theme }) =>
    $theme === "dark" ? "0 2px 20px rgba(0,0,0,0.5)" : "0 2px 20px rgba(255,255,255,0.8)"};
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.6;
  margin: 0 0 2rem;
  color: ${({ $theme }) => ($theme === "dark" ? "rgba(232, 220, 200, 0.85)" : "rgba(26, 46, 38, 0.85)")};
`;

const EnterButton = styled.button`
  background: ${({ $theme }) => ($theme === "dark" ? "#e8dcc8" : "#1a2e26")};
  color: ${({ $theme }) => ($theme === "dark" ? "#1a2e26" : "#e8dcc8")};
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Instruction = styled.p`
  font-size: 0.875rem;
  margin: 1.5rem 0 0;
  color: ${({ $theme }) => ($theme === "dark" ? "rgba(232, 220, 200, 0.6)" : "rgba(26, 46, 38, 0.6)")};
  font-style: italic;
`;

const LoadingMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
  color: ${({ $theme }) => ($theme === "dark" ? "#e8dcc8" : "#1a2e26")};
  z-index: 5;
`;

const introSeenKey = "mindbody-roots-brain-intro-seen";

export default function BrainIntro() {
  const [showIntro, setShowIntro] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [BrainScene3D, setBrainScene3D] = useState(null);
  const [debug, setDebug] = useState('mounting');
  const { theme } = usePreferences();

  useEffect(() => {
    try {
      const hasSeenIntro = localStorage.getItem(introSeenKey);
      if (!hasSeenIntro) {
        setShowIntro(true);
        setDebug('showing intro');
      } else {
        setDebug('already seen');
      }
    } catch (e) {
      setDebug('error: ' + e.message);
    }
  }, []);

  useEffect(() => {
    if (showIntro) {
      setDebug('loading 3D...');
      import("@/components/BrainScene3D").then((mod) => {
        setBrainScene3D(() => mod.default);
        setIsLoaded(true);
        setDebug('3D loaded');
      }).catch((e) => {
        setDebug('3D error: ' + e.message);
      });
    }
  }, [showIntro]);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowIntro(false);
      localStorage.setItem(introSeenKey, "true");
    }, 600);
  };

  if (!showIntro) {
    return <div style={{position: 'fixed', top: 0, left: 0, padding: '10px', background: 'red', color: 'white', zIndex: 99999}}>DEBUG: {debug}</div>;
  }

  return (
    <Overlay $theme={theme} $isExiting={isExiting}>
      <div style={{position: 'fixed', top: 0, right: 0, padding: '10px', background: 'green', color: 'white', zIndex: 99999}}>DEBUG: {debug}</div>
      <CanvasContainer>
        {isLoaded && BrainScene3D && <BrainScene3D theme={theme} />}
      </CanvasContainer>

      {!isLoaded && (
        <LoadingMessage $theme={theme}>Loading brain anatomy...</LoadingMessage>
      )}

      <Content>
        <Title $theme={theme}>Explore Your Mind</Title>
        <Subtitle $theme={theme}>
          Take a moment to discover the intricate beauty of your brain before diving into
          your wellness journey.
        </Subtitle>
        <EnterButton $theme={theme} onClick={handleEnter}>
          Enter MindBody Roots
        </EnterButton>
        <Instruction $theme={theme}>
          Drag to rotate • Scroll to zoom • Click to interact
        </Instruction>
      </Content>
    </Overlay>
  );
}
