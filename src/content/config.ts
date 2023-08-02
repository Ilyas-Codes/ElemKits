import { defineCollection, z } from "astro:content";

// Post collection schema
const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categories: z.array(z.string()).default(["other"]),
    tags: z.string(),
    iframe: z.string(),
    image: z.string(),
    templates: z.array(z.string()),
    download: z.string(),
    highlights: z
      .array(z.string())
      .default([
        "One-Click Import",
        "No Coding Required",
        "Lightweight & Fast",
        "Clean & Unique Design",
        "Cross-Browser Support",
        "Fully Customizable",
        "Fully Responsive",
        "SEO Optimized",
      ]),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    layout: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// Export collections
export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
};
