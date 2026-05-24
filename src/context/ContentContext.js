"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { posts as fallbackPosts } from "@/data/posts";
import { products as fallbackProducts } from "@/data/products";
import { quotes as fallbackQuotes } from "@/data/quotes";
import { siteCopy as fallbackSiteCopy } from "@/content/siteCopy";

const ContentContext = createContext(null);

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const HOMEPAGE_QUERY = "populate=*";

function unwrapStrapiItem(item) {
  if (!item) return null;
  return item.attributes ? { id: item.id, documentId: item.documentId, ...item.attributes } : item;
}

function unwrapStrapiList(payload) {
  const data = Array.isArray(payload?.data) ? payload.data : [];
  return data.map(unwrapStrapiItem).filter(Boolean);
}

function unwrapStrapiSingle(payload) {
  return unwrapStrapiItem(payload?.data);
}

async function fetchJson(path) {
  const response = await fetch(`${STRAPI_URL}${path}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Strapi request failed: ${response.status} ${path}`);
  return response.json();
}

function sortByOrder(items) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function localizeFields(entry, prefix, fallback = "") {
  if (!entry) {
    return { en: fallback, ka: fallback };
  }
  const en = entry[`${prefix}En`] ?? fallback;
  const ka = entry[`${prefix}Ka`] ?? en ?? fallback;
  return { en, ka };
}

function normalizeMedia(media) {
  if (!media?.url) return null;
  return {
    ...media,
    url: media.url.startsWith("http") ? media.url : `${STRAPI_URL}${media.url}`,
  };
}

function mergeByDocumentId(items, fullItems) {
  if (!Array.isArray(items) || !items.length) return [];
  return items
    .map((item) => {
      const normalized = unwrapStrapiItem(item);
      if (!normalized) return null;
      const fullItem = fullItems.find((candidate) => candidate.documentId === normalized.documentId);
      return fullItem ? { ...normalized, ...fullItem } : normalized;
    })
    .filter(Boolean);
}

function fallbackHomepage(posts = fallbackPosts, products = fallbackProducts, quotes = fallbackQuotes) {
  return {
    hero: {
      badge: { en: fallbackSiteCopy.en.hero.badge || "", ka: fallbackSiteCopy.ka.hero.badge || fallbackSiteCopy.en.hero.badge || "" },
      title: { en: fallbackSiteCopy.en.hero.title, ka: fallbackSiteCopy.ka.hero.title },
      lead: { en: fallbackSiteCopy.en.hero.lead, ka: fallbackSiteCopy.ka.hero.lead },
      primaryLabel: { en: fallbackSiteCopy.en.hero.primary, ka: fallbackSiteCopy.ka.hero.primary },
      primaryUrl: "/blog",
      secondaryLabel: { en: fallbackSiteCopy.en.hero.secondary, ka: fallbackSiteCopy.ka.hero.secondary },
      secondaryUrl: "/recommendations",
      quote: { en: fallbackSiteCopy.en.hero.quote, ka: fallbackSiteCopy.ka.hero.quote },
      cardBody: { en: fallbackSiteCopy.en.hero.cardBody, ka: fallbackSiteCopy.ka.hero.cardBody },
      media: null,
      videoUrl: "",
      mediaCaption: { en: "", ka: "" },
    },
    featuredArticlesSection: {
      eyebrow: { en: fallbackSiteCopy.en.sections.featuredEyebrow, ka: fallbackSiteCopy.ka.sections.featuredEyebrow },
      title: { en: fallbackSiteCopy.en.sections.featuredTitle, ka: fallbackSiteCopy.ka.sections.featuredTitle },
      body: { en: fallbackSiteCopy.en.sections.featuredText, ka: fallbackSiteCopy.ka.sections.featuredText },
    },
    featuredArticles: posts,
    spotlightQuote: quotes[0] || null,
    disclaimer: {
      title: { en: fallbackSiteCopy.en.common.healthDisclaimerTitle, ka: fallbackSiteCopy.ka.common.healthDisclaimerTitle },
      body: { en: fallbackSiteCopy.en.common.healthDisclaimerBody, ka: fallbackSiteCopy.ka.common.healthDisclaimerBody },
    },
    recommendationsSection: {
      eyebrow: { en: fallbackSiteCopy.en.sections.toolsEyebrow, ka: fallbackSiteCopy.ka.sections.toolsEyebrow },
      title: { en: fallbackSiteCopy.en.sections.toolsTitle, ka: fallbackSiteCopy.ka.sections.toolsTitle },
      body: { en: fallbackSiteCopy.en.sections.toolsText, ka: fallbackSiteCopy.ka.sections.toolsText },
    },
    featuredProducts: products.slice(0, 3),
    promoVideo: {
      title: { en: "", ka: "" },
      body: { en: "", ka: "" },
      videoUrl: "",
      poster: null,
    },
  };
}

function mapHomepage(homepageEntry, posts, products, quotes) {
  if (!homepageEntry) return fallbackHomepage(posts, products, quotes);

  return {
    hero: {
      badge: localizeFields(homepageEntry.hero, "badge"),
      title: localizeFields(homepageEntry.hero, "title"),
      lead: localizeFields(homepageEntry.hero, "lead"),
      primaryLabel: localizeFields(homepageEntry.hero, "primaryLabel"),
      primaryUrl: homepageEntry.hero?.primaryUrl || "/blog",
      secondaryLabel: localizeFields(homepageEntry.hero, "secondaryLabel"),
      secondaryUrl: homepageEntry.hero?.secondaryUrl || "/recommendations",
      quote: localizeFields(homepageEntry.hero, "quote"),
      cardBody: localizeFields(homepageEntry.hero, "cardBody"),
      media: normalizeMedia(homepageEntry.hero?.media),
      videoUrl: homepageEntry.hero?.videoUrl || "",
      mediaCaption: localizeFields(homepageEntry.hero, "mediaCaption"),
    },
    featuredArticlesSection: {
      eyebrow: localizeFields(homepageEntry.featuredArticlesSection, "eyebrow"),
      title: localizeFields(homepageEntry.featuredArticlesSection, "title"),
      body: localizeFields(homepageEntry.featuredArticlesSection, "body"),
    },
    featuredArticles:
      Array.isArray(homepageEntry.featuredArticles) && homepageEntry.featuredArticles.length
        ? mergeByDocumentId(homepageEntry.featuredArticles, posts)
        : posts,
    spotlightQuote: unwrapStrapiItem(homepageEntry.spotlightQuote) || quotes[0] || null,
    disclaimer: {
      title: localizeFields(homepageEntry.disclaimer, "title"),
      body: localizeFields(homepageEntry.disclaimer, "body"),
    },
    recommendationsSection: {
      eyebrow: localizeFields(homepageEntry.recommendationsSection, "eyebrow"),
      title: localizeFields(homepageEntry.recommendationsSection, "title"),
      body: localizeFields(homepageEntry.recommendationsSection, "body"),
    },
    featuredProducts:
      Array.isArray(homepageEntry.featuredProducts) && homepageEntry.featuredProducts.length
        ? mergeByDocumentId(homepageEntry.featuredProducts, products)
        : products.slice(0, 3),
    promoVideo: {
      title: localizeFields(homepageEntry.promoVideo, "title"),
      body: localizeFields(homepageEntry.promoVideo, "body"),
      videoUrl: homepageEntry.promoVideo?.videoUrl || "",
      poster: normalizeMedia(homepageEntry.promoVideo?.poster),
    },
  };
}

async function fetchCmsContent() {
  const [siteCopyPayload, postsPayload, productsPayload, quotesPayload, homepagePayload] = await Promise.all([
    fetchJson("/api/mbr-site-copy"),
    fetchJson("/api/mbr-posts?sort=order:asc&populate[0]=coverImage"),
    fetchJson("/api/mbr-products?sort=order:asc&populate[0]=image"),
    fetchJson("/api/mbr-quotes?sort=order:asc"),
    fetchJson(`/api/mbr-homepage?${HOMEPAGE_QUERY}`),
  ]);

  const siteCopyEntry = unwrapStrapiSingle(siteCopyPayload);
  const cmsPosts = sortByOrder(unwrapStrapiList(postsPayload)).map((post) => ({
    ...post,
    coverImage: normalizeMedia(post.coverImage),
  }));
  const cmsProducts = sortByOrder(unwrapStrapiList(productsPayload)).map((product) => ({
    ...product,
    image: normalizeMedia(product.image),
  }));
  const cmsQuotes = sortByOrder(unwrapStrapiList(quotesPayload));
  const homepageEntry = unwrapStrapiSingle(homepagePayload);

  const posts = cmsPosts.length ? cmsPosts : fallbackPosts;
  const products = cmsProducts.length ? cmsProducts : fallbackProducts;
  const quotes = cmsQuotes.length ? cmsQuotes : fallbackQuotes;

  return {
    siteCopy: siteCopyEntry?.copy || fallbackSiteCopy,
    posts,
    products,
    quotes,
    homePage: mapHomepage(homepageEntry, posts, products, quotes),
    source: "strapi",
  };
}

const fallbackContent = {
  siteCopy: fallbackSiteCopy,
  posts: fallbackPosts,
  products: fallbackProducts,
  quotes: fallbackQuotes,
  homePage: fallbackHomepage(),
  source: "fallback",
};

export function ContentProvider({ children }) {
  const [content, setContent] = useState(fallbackContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchCmsContent()
      .then((nextContent) => {
        if (!cancelled) setContent(nextContent);
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Using local fallback content because Strapi is unavailable:", error.message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ ...content, loading }), [content, loading]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}

export function useLocalizedSiteCopy(locale) {
  const { siteCopy } = useContent();
  return siteCopy[locale] || siteCopy.en || fallbackSiteCopy.en;
}
