import React from 'react';
import prisma from '@/lib/prisma';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';
import { formatThaiDate } from '@/lib/age';
import { Calendar, MapPin, Clock, ExternalLink, CalendarDays } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface CalendarPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PublicCalendarPage({ searchParams }: CalendarPageProps) {
  const { category } = await searchParams;

  const whereClause: any = { isPublic: true };
  if (category && category !== 'all') {
    whereClause.category = category;
  }

  const [branding, events] = await Promise.all([
    prisma.brandingSetting.findFirst(),
    prisma.event.findMany({
      where: whereClause,
      orderBy: { startDate: 'asc' },
    }),
  ]);

  const categories = [
    { key: 'all', label: 'ทั้งหมด' },
    { key: 'วิชาการ', label: 'กิจกรรมวิชาการ' },
    { key: 'กิจกรรม', label: 'กิจกรรมนักเรียน' },
    { key: 'วันสำคัญ', label: 'วันสำคัญ / วันหยุด' },
    { key: 'การสอบ', label: 'ตารางการสอบ' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar
        schoolName={branding?.schoolName}
        shortName={branding?.shortName}
        tagline={branding?.schoolNameEn}
      />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8 w-full">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            School Calendar
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            ปฏิทินกิจกรรมและการศึกษา
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            กำหนดการ วันสำคัญ กิจกรรมวิชาการ และกิจกรรมเสริมหลักสูตร โรงเรียนดัดดรุณี
          </p>
        </div>

        {/* Category Pills Filter Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = (!category && cat.key === 'all') || category === cat.key;
            return (
              <Link
                key={cat.key}
                href={cat.key === 'all' ? '/calendar' : `/calendar?category=${encodeURIComponent(cat.key)}`}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-102'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-blue-700'
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-3">
            <CalendarDays className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">ไม่มีกิจกรรมในหมวดนี้</h3>
            <p className="text-xs text-slate-400">
              ลองเลือกหมวดหมู่อื่นเพื่อดูกำหนดการและกิจกรรมทั้งหมด
            </p>
            <Link
              href="/calendar"
              className="inline-block px-5 py-2 rounded-full bg-blue-600 text-white text-xs font-bold mt-2"
            >
              ดูกิจกรรมทั้งหมด
            </Link>
          </div>
        )}

        {/* Responsive Events List */}
        <div className="space-y-4">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 group card-hover"
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                {/* Square Date Badge with Cyber Blue/Pink Accents */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-pink-600 text-white flex flex-col items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <span className="text-[10px] sm:text-[11px] uppercase font-bold opacity-85">
                    {new Date(ev.startDate).toLocaleString('th-TH', { month: 'short' })}
                  </span>
                  <span className="text-lg sm:text-xl font-black leading-none mt-0.5">
                    {new Date(ev.startDate).getDate()}
                  </span>
                </div>

                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-100">
                      {ev.category || 'กิจกรรม'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium sm:hidden">
                      {formatThaiDate(ev.startDate)}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {ev.title}
                  </h3>

                  {ev.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                      {ev.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-0.5 flex-wrap">
                    {ev.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                        <span>{ev.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>08:30 - 16:30 น.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Info (Desktop / Tablet) */}
              <div className="hidden sm:flex flex-col items-end text-right text-xs text-slate-400 shrink-0 space-y-2">
                <span className="font-medium text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                  {formatThaiDate(ev.startDate)}
                </span>
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ev.title)}&details=${encodeURIComponent(ev.description || '')}&location=${encodeURIComponent(ev.location || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-pink-600 transition-colors"
                  title="บันทึกใน Google Calendar"
                >
                  <span>เพิ่มลงปฏิทิน</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
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
