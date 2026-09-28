import { getCollection } from 'astro:content';

export async function getPublishedWriting() {
  const entries = await getCollection('writing', ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPublishedNotes() {
  const entries = await getCollection('notes', ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPublishedProjects() {
  return getCollection('projects', ({ data }) => !data.draft);
}

export function formatDate(date: Date, lang: 'zh-CN' | 'en') {
  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function dateValue(date: Date) {
  return date.toISOString().slice(0, 10);
}
