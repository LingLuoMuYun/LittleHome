import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('未分类'),
    cover: z.string().optional(),
  }),
});

export const collections = { posts };
