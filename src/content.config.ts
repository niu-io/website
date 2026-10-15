import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    chineseTitle: z.string().optional(),
    description: z.string(),
    publishedAt: z.string(),
    readingTime: z.string().optional(),
    category: z.string().default("Architecture"),
    author: z.string().default("Niu Engineering"),
  }),
});

export const collections = { blog };
