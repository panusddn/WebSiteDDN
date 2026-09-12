import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      summary,
      content,
      departmentId,
      templateId,
      category,
      contentType,
      coverImageUrl,
      visibility,
      status,
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'กรุณาระบุหัวข้อและเนื้อหาข่าวให้ครบถ้วน' }, { status: 400 });
    }

    // Default author (Super Admin or first user)
    const author = await prisma.user.findFirst();
    if (!author) {
      return NextResponse.json({ error: 'ไม่พบผู้เขียนในระบบ' }, { status: 500 });
    }

    const created = await prisma.news.create({
      data: {
        title,
        slug,
        summary,
        content,
        departmentId: departmentId || null,
        templateId: templateId || null,
        category: category || 'ทั่วไป',
        contentType: contentType || 'NEWS',
        coverImageUrl,
        visibility: visibility || 'PUBLIC',
        status: status || 'PUBLISHED',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        authorId: author.id,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'CREATE',
        entityType: 'NEWS',
        entityId: created.id,
        details: JSON.stringify({ title, slug }),
      },
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
