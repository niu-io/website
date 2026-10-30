import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogSchema = z.object({
  title: z.string(),
  cover: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  pinned: z.boolean().default(false),
  pinOrder: z.number().int().nonnegative().default(0),
  subtitle: z.string().optional(),
  chineseTitle: z.string().optional(),
  description: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  readingTime: z.string().optional(),
  category: z.string().default("Architecture"),
  author: z.string().default("Niu Engineering"),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: blogSchema,
});

const blogTranslations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog-translations" }),
  schema: blogSchema,
});

export const collections = { blog, blogTranslations };
