'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  History,
  RotateCcw,
  CheckCircle2,
  Calendar,
  User,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export default function AdminThemeVersionsPage() {
  const [restored, setRestored] = useState<number | null>(null);

  const versions = [
    {
      version: 3,
      name: 'Modern Technology (Cyber Blue & Vivid Pink) — ปัจจุบัน',
      author: 'ผู้ดูแลระบบสูงสุด',
      date: 'วันนี้, 19:30 น.',
      isCurrent: true,
      description: 'อัปเกรดดีไซน์ระบบสีใหม่ ปรับ Bento Grid ข่าวสาร และฟอนต์ Kanit/Sarabun',
    },
    {
      version: 2,
      name: 'Academic Excellence (Royal Blue & Gold)',
      author: 'นางกัญญาภัทร วรกิจเจริญ',
      date: '10 ก.ย. 2569, 10:15 น.',
      isCurrent: false,
      description: 'เวอร์ชันธีมวิชาการสำหรับงานนิทรรศการและการประเมินสถานศึกษา',
    },
    {
      version: 1,
      name: 'Default Classic Datdaruni',
      author: 'ระบบเริ่มต้น',
      date: '01 ก.ย. 2569, 09:00 น.',
      isCurrent: false,
      description: 'ธีมมาตรฐานดั้งเดิมของโรงเรียนดัดดรุณี',
    },
  ];

  const handleRollback = (ver: number) => {
    setRestored(ver);
    setTimeout(() => setRestored(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/theme"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>กลับสู่จัดการธีม</span>
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <History className="w-6 h-6 text-purple-600" />
            <span>ประวัติและย้อนคืนธีม (Theme History & Rollback)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            ตรวจสอบประวัติการปรับแต่งสี ดีไซน์ และย้อนคืนไปยังเวอร์ชันที่ต้องการได้ในคลิกเดียว
          </p>
        </div>
        {restored && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>ย้อนคืนสู่เวอร์ชัน {restored} สำเร็จแล้ว</span>
          </div>
        )}
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {versions.map((ver) => (
          <div
            key={ver.version}
            className={`bg-white rounded-3xl border p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
              ver.isCurrent
                ? 'border-blue-500/40 ring-2 ring-blue-500/10'
                : 'border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  Version {ver.version}
                </span>
                {ver.isCurrent && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span>เวอร์ชันที่ใช้งานปัจจุบัน</span>
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900">{ver.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{ver.description}</p>

              <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                <div className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{ver.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{ver.date}</span>
                </div>
              </div>
            </div>

            {!ver.isCurrent && (
              <button
                type="button"
                onClick={() => handleRollback(ver.version)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors border border-slate-200 cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5 text-purple-600" />
                <span>ย้อนคืนธีมนี้</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
