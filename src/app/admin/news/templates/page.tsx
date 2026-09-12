'use client';

import React from 'react';
import Link from 'next/link';
import {
  Layers,
  Newspaper,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Trophy,
  Megaphone,
  Calendar
} from 'lucide-react';

export default function AdminNewsTemplatesPage() {
  const templates = [
    {
      id: 'tpl-1',
      name: 'ประกาศผลงานและความภาคภูมิใจ (Student Achievement)',
      icon: Trophy,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      description: 'เลย์เอาต์เน้นภาพพิธีมอบรางวัล รายชื่อนักเรียนผู้รับรางวัล และรายละเอียดการแข่งขันระดับชาติ/นานาชาติ',
      previewFields: ['ภาพถ่ายพิธีมอบรางวัล', 'รายชื่อนักเรียนและครูที่ปรึกษา', 'ถ้วยเกียรติยศ'],
    },
    {
      id: 'tpl-2',
      name: 'ประกาศการรับสมัครและการสอบ (Academic Admission)',
      icon: Megaphone,
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      description: 'เลย์เอาต์สำหรับประกาศรับสมัครนักเรียนใหม่ กำหนดการสอบ และลิงก์ดาวน์โหลดเอกสาร PDF ปพ.',
      previewFields: ['กำหนดการและไทม์ไลน์', 'เอกสารระเบียบการแนบ', 'ขั้นตอนยืนยันสิทธิ์'],
    },
    {
      id: 'tpl-3',
      name: 'ข่าวประชาสัมพันธ์กิจกรรมโรงเรียน (School Event)',
      icon: Calendar,
      badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
      description: 'เลย์เอาต์อัลบั้มภาพกิจกรรม เชื่อมต่อ Google Drive และแผนที่พิกัดสถานที่จัดงาน',
      previewFields: ['แกลเลอรีภาพกิจกรรม', 'โฟลเดอร์ Google Drive', 'Google Calendar Link'],
    },
    {
      id: 'tpl-4',
      name: 'บทความวิชาการและนวัตกรรม (Educational Article)',
      icon: FileText,
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      description: 'เลย์เอาต์สำหรับเผยแพร่ผลงานวิจัย นวัตกรรมการสอน AI/Coding และองค์ความรู้ทางการศึกษา',
      previewFields: ['เนื้อหาแบบ Markdown', 'บทคัดย่อภาษาไทย/อังกฤษ', 'เอกสารอ้างอิง'],
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/news"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>กลับสู่จัดการข่าว</span>
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-blue-600" />
            <span>คลังเทมเพลตข่าวและประกาศ (News Template Gallery)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            เลือกเทมเพลตมาตรฐานที่ออกแบบไว้ล่วงหน้าเพื่อสร้างข่าวประชาสัมพันธ์ได้อย่างรวดเร็วและสวยงาม
          </p>
        </div>

        <Link
          href="/admin/news/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-colors"
        >
          <span>เขียนข่าวใหม่</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tpl) => {
          const Icon = tpl.icon;
          return (
            <div
              key={tpl.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${tpl.badgeColor}`}>
                    พร้อมใช้งาน
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {tpl.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {tpl.description}
                </p>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-400 mb-2">โครงสร้างประกอบด้วย:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {tpl.previewFields.map((f, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-medium border border-slate-100"
                      >
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/admin/news/create?template=${tpl.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold text-xs border border-slate-200 hover:border-blue-200 transition-colors"
                >
                  <span>ใช้เทมเพลตนี้เขียนข่าว</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
