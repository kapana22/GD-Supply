import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { BLOG_SLUGS } from "./blogSlugs";

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  author: string;
};

export type BlogPost = BlogPostMeta & { content: string };

const blogRoot = path.join(process.cwd(), "content", "blog");

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readSource(locale: string, slug: string) {
  const localized = path.join(blogRoot, locale, `${slug}.mdx`);
  if (await fileExists(localized)) {
    return { source: await fs.readFile(localized, "utf8"), filePath: localized };
  }

  const fallback = path.join(blogRoot, `${slug}.mdx`);
  if (await fileExists(fallback)) {
    return { source: await fs.readFile(fallback, "utf8"), filePath: fallback };
  }

  return null;
}

function parseFrontmatter(slug: string, source: string): BlogPost {
  const { data, content } = matter(source);
  const read = data.readTime as string | undefined;
  const computed = `${Math.max(1, Math.round(readingTime(content).minutes))} min`;

  return {
    slug,
    title: (data.title as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    date: (data.date as string) ?? "",
    updated: (data.updated as string | undefined) ?? undefined,
    category: (data.category as string) ?? "",
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    image: (data.image as string) ?? "",
    readTime: read ?? computed,
    author: (data.author as string) ?? "GD Supply",
    content,
  };
}

export async function getPost(locale: string, slug: string): Promise<BlogPost | null> {
  const file = await readSource(locale, slug);
  if (!file) return null;
  return parseFrontmatter(slug, file.source);
}

export async function getPostMeta(locale: string): Promise<BlogPostMeta[]> {
  const posts: BlogPostMeta[] = [];

  for (const slug of BLOG_SLUGS) {
    const file = await readSource(locale, slug);
    if (!file) continue;
    const post = parseFrontmatter(slug, file.source);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...meta } = post;
    posts.push(meta);
  }

  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
