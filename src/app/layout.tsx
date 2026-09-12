import type { Metadata } from 'next';
import './globals.css';
import { getActiveTheme, generateCssVariables } from '@/lib/theme';
import prisma from '@/lib/prisma';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const branding = await prisma.brandingSetting.findFirst();
    return {
      title: branding?.websiteTitle || 'โรงเรียนดัดดรุณี | Datdaruni School',
      description: branding?.tagline || 'สถานศึกษานำร่องด้านนวัตกรรม เทคโนโลยีดิจิทัล และความเป็นเลิศทางวิชาการ',
      icons: {
        icon: branding?.faviconUrl || '/favicon.ico',
      },
    };
  } catch {
    return {
      title: 'โรงเรียนดัดดรุณี | Datdaruni School',
      description: 'สถานศึกษานำร่องด้านนวัตกรรม เทคโนโลยีดิจิทัล และความเป็นเลิศทางวิชาการ',
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getActiveTheme();
  const cssVariables = generateCssVariables(theme);

  return (
    <html lang="th" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600;700;800;900&family=Sarabun:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
