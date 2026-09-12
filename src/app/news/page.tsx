import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';
import { formatThaiDate } from '@/lib/age';
import { getPublishedNewsList } from '@/lib/newsData';
import { Newspaper, Eye, ArrowRight, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface NewsPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function PublicNewsPage({ searchParams }: NewsPageProps) {
  const { q, category } = await searchParams;

  let branding: any = null;
  let allNews: any[] = [];

  try {
    const [b, news] = await Promise.all([
      prisma.brandingSetting.findFirst().catch(() => null),
      getPublishedNewsList(),
    ]);
    branding = b;
    allNews = news;
  } catch (err) {
    console.warn('Error loading public news:', err);
    allNews = await getPublishedNewsList();
  }

  // Filter by category
  let filteredNews = allNews;
  if (category && category !== 'all') {
    filteredNews = filteredNews.filter(
      (item) => item.category === category || (category === 'ผลงาน' && item.category === 'ผลงานนักเรียน')
    );
  }

  // Filter by search query
  if (q && q.trim()) {
    const term = q.trim().toLowerCase();
    filteredNews = filteredNews.filter(
      (item) =>
        (item.title && item.title.toLowerCase().includes(term)) ||
        (item.summary && item.summary.toLowerCase().includes(term)) ||
        (item.content && item.content.toLowerCase().includes(term))
    );
  }

  const categories = [
    { key: 'all', label: 'ทั้งหมด' },
    { key: 'วิชาการ', label: 'วิชาการ' },
    { key: 'กิจกรรม', label: 'กิจกรรม' },
    { key: 'ประกาศ', label: 'ประกาศ' },
    { key: 'ผลงานนักเรียน', label: 'ผลงานนักเรียน' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <PublicNavbar
        schoolName={branding?.schoolName}
        shortName={branding?.shortName}
        tagline={branding?.schoolNameEn}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 w-full">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-700">
            <Sparkles className="w-3.5 h-3.5" />
            News & Announcements
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            ข่าวประชาสัมพันธ์และประกาศ
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            อัปเดตทุกความเคลื่อนไหว กิจกรรม ผลงานนักเรียน และประกาศจากโรงเรียนดัดดรุณี
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = (!category && cat.key === 'all') || category === cat.key;
            return (
              <Link
                key={cat.key}
                href={cat.key === 'all' ? '/news' : `/news?category=${encodeURIComponent(cat.key)}`}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-blue-700'
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>

        {/* Search Query Status */}
        {q && (
          <div className="flex items-center justify-between bg-blue-50/80 border border-blue-100 rounded-2xl px-4 py-2.5 text-xs text-blue-900">
            <span>ผลการค้นหาสำหรับ: &ldquo;<strong>{q}</strong>&rdquo; ({filteredNews.length} รายการ)</span>
            <Link href="/news" className="text-pink-600 font-bold hover:underline">
              ล้างการค้นหา
            </Link>
          </div>
        )}

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-3">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">ไม่พบข่าวสารในหมวดนี้</h3>
            <p className="text-xs text-slate-400">
              ลองเลือกหมวดหมู่อื่น หรือล้างคำค้นหาเพื่อดูข่าวสารทั้งหมด
            </p>
            <Link
              href="/news"
              className="inline-block px-5 py-2 rounded-full bg-blue-600 text-white text-xs font-bold mt-2"
            >
              ดูข่าวสารทั้งหมด
            </Link>
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredNews.map((item) => {
            const coverImg =
              item.coverImageUrl ||
              'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
            const deptName = item.department?.nameTh || 'ส่วนกลาง';

            return (
              <article
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group card-hover"
              >
                <Link href={`/news/${item.slug}`} className="block relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={coverImg}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-1 rounded-xl text-[10px] sm:text-[11px] font-bold bg-blue-900/85 text-white backdrop-blur-md border border-white/20">
                      {deptName}
                    </span>
                    {item.isPinned && (
                      <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-pink-500 text-white shadow-xs">
                        ★ ปักหมุด
                      </span>
                    )}
                  </div>
                </Link>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
                      <span>{formatThaiDate(item.publishedAt || item.createdAt)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{(item.viewsCount ?? 0).toLocaleString()}</span>
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/news/${item.slug}`}>{item.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed font-normal">
                      {item.summary || (item.content ? item.content.slice(0, 120) : '')}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium">
                      {item.category || 'ทั่วไป'}
                    </span>
                    <Link
                      href={`/news/${item.slug}`}
                      className="font-bold text-blue-700 group-hover:text-pink-600 flex items-center gap-1 transition-colors"
                    >
                      <span>อ่านต่อ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
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
