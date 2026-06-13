import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://lingluo.dev',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark-dimmed',
        },
      ],
    ],
  },
  integrations: [sitemap(), react()],
});