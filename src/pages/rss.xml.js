import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  const sortedPosts = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: 'LingLuo · 个人主页',
    description: '开发者 · 极简主义者',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description || '',
      pubDate: post.data.date,
      link: `/posts/${post.id}`,
    })),
  });
}
