import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { posts, type BlogPost } from "@/lib/posts";

const blogDirectory = path.join(process.cwd(), "content", "blog");

function formatReadTime(minutes: number) {
  return `${Math.max(1, Math.round(minutes))} წუთი`;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fromMetadata = posts.find((post) => post.slug === slug);
  if (!fromMetadata) return null;

  const filePath = path.join(blogDirectory, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8").catch(() => null);
  if (!source) {
    return {
      ...fromMetadata,
      content: fromMetadata.excerpt,
    };
  }

  const { data, content } = matter(source);

  return {
    ...fromMetadata,
    title: typeof data.title === "string" ? data.title : fromMetadata.title,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : fromMetadata.excerpt,
    date: typeof data.date === "string" ? data.date : fromMetadata.date,
    updated: typeof data.updated === "string" ? data.updated : fromMetadata.updated,
    category: typeof data.category === "string" ? data.category : fromMetadata.category,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : fromMetadata.tags,
    image: typeof data.image === "string" ? data.image : fromMetadata.image,
    readTime:
      typeof data.readTime === "string"
        ? data.readTime
        : formatReadTime(readingTime(content).minutes),
    author: typeof data.author === "string" ? data.author : fromMetadata.author,
    content,
  };
}
