"use client";

import styled from "styled-components";
import SectionTitle from "@/components/SectionTitle";
import BlogCard from "@/components/BlogCard";
import DisclaimerNotice from "@/components/DisclaimerNotice";
import { posts } from "@/data/posts";


const Page = styled.section`max-width: 1160px; margin: 0 auto; padding: 70px 20px;`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 28px; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const NoticeWrap = styled.div`margin-top: 26px;`;

export default function BlogPage() {
  return <Page><SectionTitle eyebrow="Blog" title="Health & mind articles.">Short, practical writing about mindset, routines, physical wellbeing, and the hidden patterns behind daily behavior.</SectionTitle><Grid>{posts.map((post) => <BlogCard key={post.slug} post={post} />)}</Grid><NoticeWrap><DisclaimerNotice /></NoticeWrap></Page>;
}
