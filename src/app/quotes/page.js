"use client";

import styled from "styled-components";
import SectionTitle from "@/components/SectionTitle";
import QuoteCard from "@/components/QuoteCard";
import { quotes } from "@/data/quotes";
import { theme } from "@/styles/theme";


const Page = styled.section`max-width: 1160px; margin: 0 auto; padding: 70px 20px;`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const Note = styled.p`margin-top: 26px; color: ${theme.colors.muted}; line-height: 1.7;`;

export default function QuotesPage() {
  return <Page><SectionTitle eyebrow="Motivation" title="Quotes for mind and body.">Use these as small reminders. Real progress still comes from repeated action, rest, and honest self-awareness.</SectionTitle><Grid>{quotes.map((quote) => <QuoteCard key={quote.text} quote={quote} />)}</Grid><Note>Tip: choose one quote for the week and connect it to one visible habit, like a morning walk, water bottle, journal, or earlier bedtime.</Note></Page>;
}
