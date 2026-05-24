"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { posts as fallbackPosts } from "@/data/posts";
import { products as fallbackProducts } from "@/data/products";
import { quotes as fallbackQuotes } from "@/data/quotes";
import { siteCopy as fallbackSiteCopy } from "@/content/siteCopy";

const ContentContext = createContext(null);

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");

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

async function fetchCmsContent() {
  const [siteCopyPayload, postsPayload, productsPayload, quotesPayload] = await Promise.all([
    fetchJson("/api/mbr-site-copy"),
    fetchJson("/api/mbr-posts?sort=order:asc"),
    fetchJson("/api/mbr-products?sort=order:asc"),
    fetchJson("/api/mbr-quotes?sort=order:asc"),
  ]);

  const siteCopyEntry = unwrapStrapiSingle(siteCopyPayload);
  const cmsPosts = sortByOrder(unwrapStrapiList(postsPayload));
  const cmsProducts = sortByOrder(unwrapStrapiList(productsPayload));
  const cmsQuotes = sortByOrder(unwrapStrapiList(quotesPayload));

  return {
    siteCopy: siteCopyEntry?.copy || fallbackSiteCopy,
    posts: cmsPosts.length ? cmsPosts : fallbackPosts,
    products: cmsProducts.length ? cmsProducts : fallbackProducts,
    quotes: cmsQuotes.length ? cmsQuotes : fallbackQuotes,
    source: "strapi",
  };
}

const fallbackContent = {
  siteCopy: fallbackSiteCopy,
  posts: fallbackPosts,
  products: fallbackProducts,
  quotes: fallbackQuotes,
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
