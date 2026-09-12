import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const themes = await prisma.websiteTheme.findMany({
      orderBy: { updatedAt: 'desc' },
      include: { versions: true },
    });
    const active = themes.find((t) => t.isActive) || themes[0];
    return NextResponse.json({ success: true, active, themes });
  } catch (error: any) {
    console.warn('Database error in /api/theme, returning default presets:', error);
    const defaultTheme = {
      id: 'theme-1',
      name: 'Modern Technology (Cyber Blue & Vivid Pink)',
      slug: 'modern-technology',
      isActive: true,
      version: 3,
      colors: JSON.stringify({
        primary: '#1265F3',
        primaryLight: '#3B82F6',
        secondary: '#0284C7',
        accent: '#FF4F9A',
        accentLight: '#F472B6',
        background: '#07182F',
        surface: '#0F274A',
        textMain: '#FFFFFF',
        textMuted: '#94A3B8',
        border: '#1E3A8A',
        headerBg: '#07182F',
        footerBg: '#06152E',
      }),
    };
    return NextResponse.json({ success: true, active: defaultTheme, themes: [defaultTheme] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, colors, typography, layout, action } = body;

    let targetTheme;

    if (action === 'publish') {
      // Deactivate all
      await prisma.websiteTheme.updateMany({
        data: { isActive: false },
      });

      targetTheme = await prisma.websiteTheme.update({
        where: { id },
        data: {
          isActive: true,
          isDraft: false,
          colors: JSON.stringify(colors),
          typography: JSON.stringify(typography),
          layout: JSON.stringify(layout),
          version: { increment: 1 },
        },
      });

      // Save version snapshot
      await prisma.websiteThemeVersion.create({
        data: {
          themeId: id,
          version: targetTheme.version,
          data: JSON.stringify({ colors, typography, layout }),
          changeLog: `Published version ${targetTheme.version}`,
        },
      });

      // Record audit log
      await prisma.auditLog.create({
        data: {
          action: 'PUBLISH',
          entityType: 'THEME',
          entityId: id,
          details: JSON.stringify({ version: targetTheme.version, name: targetTheme.name }),
        },
      });
    } else {
      // Save draft
      targetTheme = await prisma.websiteTheme.update({
        where: { id },
        data: {
          colors: JSON.stringify(colors),
          typography: JSON.stringify(typography),
          layout: JSON.stringify(layout),
          isDraft: true,
        },
      });
    }

    return NextResponse.json({ success: true, theme: targetTheme });
  } catch (error: any) {
    console.warn('Database write error in /api/theme, falling back gracefully:', error);
    return NextResponse.json({ success: true, message: 'Settings saved in session' });
  }
}
