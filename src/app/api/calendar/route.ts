import { NextRequest, NextResponse } from 'next/server';
import { getSchoolEvents, addSchoolEvent, deleteSchoolEvent } from '@/lib/calendarData';

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, category, startDate, timeRange, location, description, isPublic } = body;

    if (!title || !startDate) {
      return NextResponse.json(
        { error: 'กรุณาระบุหัวข้อกิจกรรมและวันที่จัดกิจกรรมให้ครบถ้วน' },
        { status: 400 }
      );
    }

    const created = await addSchoolEvent({
      title,
      category: category || 'กิจกรรม',
      startDate: new Date(startDate).toISOString(),
      timeRange: timeRange || '08:30 - 16:30 น.',
      location: location || 'โรงเรียนดัดดรุณี',
      description: description || '',
      isPublic: isPublic !== false,
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'กรุณาระบุรหัสกิจกรรมที่ต้องการลบ' }, { status: 400 });
    }

    await deleteSchoolEvent(id);
    return NextResponse.json({ success: true, message: 'ลบกิจกรรมสำเร็จ' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
