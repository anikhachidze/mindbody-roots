"use client";

import styled from "styled-components";
import SectionTitle from "@/components/SectionTitle";
import { theme } from "@/styles/theme";
import { usePreferences } from "@/context/PreferencesContext";
import { siteCopy } from "@/content/siteCopy";

const Page = styled.section`
  max-width: 880px;
  margin: 0 auto;
  padding: 70px 20px;
`;

const Copy = styled.div`
  p,
  li {
    color: ${theme.colors.muted};
    line-height: 1.85;
    font-size: 1.06rem;
  }

  strong {
    color: ${theme.colors.text};
  }
`;

export default function AffiliateDisclosurePage() {
  const { locale } = usePreferences();
  const copy = siteCopy[locale].common;

  return (
    <Page>
      <SectionTitle eyebrow={copy.affiliateDisclosureLabel} title={copy.affiliateDisclosureTitle} />
      <Copy>
        <p>
          <strong>
            {locale === "ka"
              ? "Amazon Associate-ის სახით, მე ვიღებ საკომისიოს შესაბამისი შესყიდვებიდან."
              : "As an Amazon Associate, I earn from qualifying purchases."}
          </strong>
        </p>
        <p>{copy.affiliateDisclosureBody}</p>
        <p>
          {locale === "ka"
            ? "შესაბამისად, საიტზე არსებული ზოგიერთი ბმული affiliate ბმულია. თუ დააჭერ ბმულს და შეიძენ პროდუქტს, საიტს შეიძლება მცირე საკომისიო დაერიცხოს. ეს არ ცვლის იმ ფასს, რასაც გადაიხდი."
            : "Some links on MindBody Roots may be affiliate links. If you click a link and make a purchase, this site may earn a small commission. This does not affect the price you pay."}
        </p>
        <p>
          {locale === "ka"
            ? "რეკომენდაციები უნდა ეფუძნებოდეს სტატიის თემას, სარგებლიანობას და ჯანმრთელ რუტინებთან შესაბამისობას. გამოქვეყნებამდე ჩაანაცვლე placeholder Amazon ბმულები რეალური Amazon Associates URL-ებით."
            : "Recommendations should be based on relevance to the article topic, usefulness, and fit for healthy routines. Before launch, replace placeholder Amazon search links with your real Amazon Associates affiliate URLs."}
        </p>
      </Copy>
    </Page>
  );
}
