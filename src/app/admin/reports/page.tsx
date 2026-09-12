import React from 'react';
import prisma from '@/lib/prisma';
import { BarChart3, TrendingUp, Users, Newspaper, FileText, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminReportsPage() {
  const [staffCount, deptCount, newsCount, docCount, newsList] = await Promise.all([
    prisma.staff.count(),
    prisma.department.count(),
    prisma.news.count(),
    prisma.document.count(),
    prisma.news.findMany({ orderBy: { viewsCount: 'desc' }, take: 5 }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          ศูนย์รายงานและสถิติภาพรวม (Report Center)
        </h2>
        <p className="text-xs text-slate-500">
          วิเคราะห์สถิติจำนวนบุคลากร การเข้าชมข่าวสาร ยอดดาวน์โหลดเอกสาร และตัวชี้วัดประสิทธิภาพ
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500">บุคลากรทั้งหมด</div>
          <div className="text-3xl font-extrabold text-blue-900 mt-2">{staffCount} ท่าน</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500">แผนกและกลุ่มสาระ</div>
          <div className="text-3xl font-extrabold text-indigo-900 mt-2">{deptCount} หน่วยงาน</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500">ข่าวสารและประกาศ</div>
          <div className="text-3xl font-extrabold text-pink-900 mt-2">{newsCount} รายการ</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500">เอกสารในระบบ</div>
          <div className="text-3xl font-extrabold text-amber-900 mt-2">{docCount} ฉบับ</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          ข่าวที่มีผู้เข้าชมสูงสุด (Top Viewed Articles)
        </h3>
        <div className="space-y-3">
          {newsList.map((n, idx) => (
            <div key={n.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                  {idx + 1}
                </span>
                <span className="font-bold text-slate-800">{n.title}</span>
              </div>
              <span className="font-bold text-pink-600 shrink-0">
                {n.viewsCount.toLocaleString()} ครั้ง
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
