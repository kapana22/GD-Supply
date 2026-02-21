import type { Metadata } from "next";
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

export default function BlogPage() {
  return <BlogPageClient posts={getSortedPosts()} />;
}
