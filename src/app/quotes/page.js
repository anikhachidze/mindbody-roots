"use client";

import styled from "styled-components";
import SectionTitle from "@/components/SectionTitle";
import QuoteCard from "@/components/QuoteCard";
import { quotes } from "@/data/quotes";
import { theme } from "@/styles/theme";
import { usePreferences } from "@/context/PreferencesContext";
import { siteCopy } from "@/content/siteCopy";

const Page = styled.section`
  max-width: 1160px;
  margin: 0 auto;
  padding: 70px 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Note = styled.p`
  margin-top: 26px;
  color: ${theme.colors.muted};
  line-height: 1.7;
`;

export default function QuotesPage() {
  const { locale } = usePreferences();
  const copy = siteCopy[locale].common;

  return (
    <Page>
      <SectionTitle eyebrow={copy.quotesEyebrow} title={copy.quotesTitle}>
        {copy.quotesLead}
      </SectionTitle>
      <Grid>{quotes.map((quote) => <QuoteCard key={quote.text.en} quote={quote} />)}</Grid>
      <Note>{copy.quotesTip}</Note>
    </Page>
  );
}
