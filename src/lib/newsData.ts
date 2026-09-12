import prisma from '@/lib/prisma';
import { DEFAULT_NEWS_ITEMS, NewsItemType } from './newsConstants';

export type { NewsItemType };
export { DEFAULT_NEWS_ITEMS };

export async function getPublishedNewsList(): Promise<NewsItemType[]> {
  try {
    const list = await prisma.news.findMany({
      where: {
        status: 'PUBLISHED',
        visibility: 'PUBLIC',
      },
      include: {
        department: true,
        author: true,
        template: true,
      },
      orderBy: [{ isPinned: 'desc' }, { publishedAt: 'desc' }],
    });

    if (list && list.length > 0) {
      return list as any[];
    }
  } catch (err) {
    console.warn('Cannot fetch news from DB, using synchronized default news:', err);
  }

  return DEFAULT_NEWS_ITEMS;
}

export async function getNewsItemBySlug(slug: string): Promise<NewsItemType | null> {
  try {
    const item = await prisma.news.findUnique({
      where: { slug },
      include: {
        department: true,
        author: true,
        template: true,
      },
    });

    if (item) {
      return item as any;
    }
  } catch (err) {
    console.warn('Cannot fetch news item by slug from DB, falling back:', err);
  }

  const fallback = DEFAULT_NEWS_ITEMS.find((n) => n.slug === slug);
  return fallback || null;
}
