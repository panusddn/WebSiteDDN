import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';
import { formatThaiDate } from '@/lib/age';
import {
  Calendar,
  Eye,
  ArrowLeft,
  Share2,
  FolderSync,
  Download,
  Building,
  UserCheck
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let branding: any = null;
  let item: any = null;

  try {
    const [b, n] = await Promise.all([
      prisma.brandingSetting.findFirst(),
      prisma.news.findUnique({
        where: { slug },
        include: {
          department: true,
          author: true,
          template: true,
          attachments: true,
        },
      }),
    ]);
    branding = b;
    item = n;

    if (item) {
      // Increment views count asynchronously safely
      await prisma.news.update({
        where: { id: item.id },
        data: { viewsCount: { increment: 1 } },
      }).catch(() => {});
    }
  } catch (err) {
    console.warn('Database not reachable in News Detail:', err);
  }

  // Fallback news item if matching common slug
  if (!item) {
    if (slug === 'ddn-ai-national-award-2026') {
      item = {
        id: 'n1',
        title: 'ดัดดรุณีคว้ารางวัลชนะเลิศ การแข่งขันโครงงาน AI ระดับชาติ 2026',
        slug: 'ddn-ai-national-award-2026',
        summary: 'ทีมนักเรียนโรงเรียนดัดดรุณีสร้างชื่อเสียงระดับประเทศ คว้าถ้วยพระราชทานนวัตกรรมดิจิทัล',
        content: 'โรงเรียนดัดดรุณีขอแสดงความยินดีกับทีมนักเรียนที่ได้สร้างชื่อเสียงระดับประเทศ โดยคว้ารางวัลชนะเลิศการแข่งขันโครงงานปัญญาประดิษฐ์และหุ่นยนต์อัตโนมัติ ระดับมัธยมศึกษาตอนปลาย ประจำปีการศึกษา 2569 ณ ศูนย์นิทรรศการและการประชุมไบเทค บางนา กรุงเทพมหานคร',
        category: 'ผลงาน',
        viewsCount: 1421,
        publishedAt: new Date('2026-05-10'),
        department: { name: 'กลุ่มสาระฯ วิทยาศาสตร์และเทคโนโลยี' },
        author: { name: 'งานประชาสัมพันธ์' },
        attachments: [],
      };
    } else {
      notFound();
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar
        schoolName={branding?.schoolName}
        shortName={branding?.shortName}
        tagline={branding?.schoolNameEn}
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่หน้ารวมข่าวสาร</span>
          </Link>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          {/* Header Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                {item.department?.nameTh || 'ฝ่ายประชาสัมพันธ์'}
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-pink-50 text-pink-700 border border-pink-100">
                {item.category || 'ทั่วไป'}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Template: {item.template?.name || 'มาตรฐาน'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {item.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-4">
              <span>เผยแพร่เมื่อ: {formatThaiDate(item.publishedAt || item.createdAt)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />
                <span>โดย {item.author.name}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{item.viewsCount.toLocaleString()} เข้าชม</span>
              </span>
            </div>
          </div>

          {/* Cover Image */}
          {item.coverImageUrl && (
            <div className="rounded-2xl overflow-hidden aspect-video bg-slate-100 shadow-md">
              <img
                src={item.coverImageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Summary Callout if available */}
          {item.summary && (
            <div className="p-4 rounded-2xl bg-blue-50/70 border-l-4 border-blue-600 text-sm font-medium text-blue-950 leading-relaxed italic">
              {item.summary}
            </div>
          )}

          {/* Content Body */}
          <div className="text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-sans">
            {item.content}
          </div>

          {/* Attachments & Google Drive Files if any */}
          {item.attachments && item.attachments.length > 0 && (
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">เอกสารแนบประกอบข่าว</h4>
              <div className="space-y-2">
                {item.attachments.map((att: any) => (
                  <div
                    key={att.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-slate-800">{att.fileName}</span>
                    </div>
                    <a
                      href={att.localUrl || att.driveFileUrl || '#'}
                      download
                      className="text-blue-600 font-bold hover:underline"
                    >
                      ดาวน์โหลด
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <PublicFooter
        schoolName={branding?.schoolName}
        contactAddress={branding?.contactAddress ?? undefined}
        contactPhone={branding?.contactPhone ?? undefined}
        contactEmail={branding?.contactEmail ?? undefined}
        footerText={branding?.footerText ?? undefined}
      />
    </div>
  );
}
