import { NextResponse } from 'next/server';
import { generateStaffTemplateBuffer } from '@/lib/excel';

export async function GET() {
  try {
    const buffer = generateStaffTemplateBuffer();

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="DDN_Staff_Import_Template.xlsx"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate template' }, { status: 500 });
  }
}
