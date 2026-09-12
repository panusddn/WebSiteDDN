import { NextRequest, NextResponse } from 'next/server';
import { getSchoolEvents } from '@/lib/calendarData';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;

    let events = await getSchoolEvents(category);

    if (limit && limit > 0) {
      events = events.slice(0, limit);
    }

    return NextResponse.json({ success: true, data: events });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
