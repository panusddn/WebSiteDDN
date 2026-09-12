import { NextRequest, NextResponse } from 'next/server';
import { getPublishedNewsList } from '@/lib/newsData';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const q = searchParams.get('q');

    let list = await getPublishedNewsList();

    if (category && category !== 'all') {
      list = list.filter((item) => item.category === category);
    }

    if (q && q.trim()) {
      const term = q.trim().toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.summary.toLowerCase().includes(term) ||
          item.content.toLowerCase().includes(term)
      );
    }

    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
