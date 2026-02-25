import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import BlogPageClient from "./BlogPageClient";
import { getSortedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "ბლოგი | GD Supply — ჰიდროიზოლაცია",
  description: "სტატიები ჰიდროიზოლაციაზე, სახურავის ტიპებზე, მასალებსა და სამშენებლო ტექნოლოგიებზე.",
  openGraph: {
    title: "ბლოგი | GD Supply",
    description: "სტატიები ჰიდროიზოლაციაზე",
    type: "website",
  },
};

export default function BlogPage({ params }: { params: { locale: string } }) {
  return (
    <>
      <PageHero
        locale={params.locale}
        eyebrow="ბლოგი"
        title="ბლოგი"
        subtitle="სტატიები ჰიდროიზოლაციაზე, სახურავის ტიპებზე, მასალებსა და სამშენებლო ტექნოლოგიებზე."
        breadcrumbs={[
          { label: "მთავარი", href: `/${params.locale}` },
          { label: "ბლოგი" },
        ]}
        backgroundTheme="blog"
        compact
      />
      <BlogPageClient posts={getSortedPosts()} hideTopHero />
    </>
  );
}
