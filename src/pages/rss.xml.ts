import rss from '@astrojs/rss';
import { getPublishedNotes, getPublishedWriting } from '../lib/content';

export async function GET(context: { site: URL | undefined }) {
  const [writing, notes] = await Promise.all([getPublishedWriting(), getPublishedNotes()]);
  const items = [
    ...writing.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: `/writing/${entry.id}/`,
    })),
    ...notes.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: `/notes/${entry.id}/`,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'KTY578 · Writing & Notes',
    description: 'KTY578 的随笔、阅读与研究笔记。',
    site: context.site ?? new URL('https://kty578.com'),
    items,
    customData: '<language>zh-CN</language>',
  });
}
