'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  ArrowUpDown,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  ArrowLeft,
  GripVertical
} from 'lucide-react';

export default function AdminSectionsPage() {
  const [saved, setSaved] = useState(false);
  const [sections, setSections] = useState([
    { id: 'sec-1', name: 'Hero Section (แบนเนอร์หลักและสโลแกน)', enabled: true, order: 1 },
    { id: 'sec-2', name: 'Quick Access (เมนูบริการด่วน 6 รายการ)', enabled: true, order: 2 },
    { id: 'sec-3', name: 'About School (วิดีโอแนะนำและปรัชญาโรงเรียน)', enabled: true, order: 3 },
    { id: 'sec-4', name: 'School Statistics (สถิตินักเรียน ครู และรางวัล)', enabled: true, order: 4 },
    { id: 'sec-5', name: 'Future Learning (การเรียนรู้แห่งอนาคต 4 ด้าน)', enabled: true, order: 5 },
    { id: 'sec-6', name: 'News & Updates (ข่าวสารประชาสัมพันธ์ Bento Grid)', enabled: true, order: 6 },
    { id: 'sec-7', name: 'Upcoming Events (ปฏิทินกิจกรรมและการศึกษา)', enabled: true, order: 7 },
    { id: 'sec-8', name: 'Student Achievements (ความภาคภูมิใจและผลงานดีเด่น)', enabled: true, order: 8 },
    { id: 'sec-9', name: 'Call To Action (ร่วมเป็นส่วนหนึ่งของดัดดรุณี)', enabled: true, order: 9 },
  ]);

  const toggleEnabled = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
            <Layers className="w-6 h-6 text-indigo-600" />
            <span>จัดลำดับส่วนแสดงผลหน้าแรก (Homepage Sections Manager)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            เปิด-ปิด หรือปรับลำดับส่วนประกอบต่างๆ บนหน้าแรกของเว็บไซต์โรงเรียน
          </p>
        </div>
        {saved && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>บันทึกลำดับเรียบร้อย</span>
          </div>
        )}
      </div>

      {/* Sections List */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-400">
          <span>ส่วนประกอบหน้าแรก</span>
          <span>สถานะการแสดงผล</span>
        </div>

        <div className="space-y-3">
          {sections.map((sec, index) => (
            <div
              key={sec.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                sec.enabled
                  ? 'bg-slate-50/70 border-slate-200 text-slate-800'
                  : 'bg-slate-50/30 border-dashed border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-500 shadow-xs">
                  {index + 1}
                </div>
                <div>
                  <div className="text-xs font-bold">{sec.name}</div>
                  <div className="text-[10px] text-slate-400">Section ID: {sec.id}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleEnabled(sec.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    sec.enabled
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                >
                  {sec.enabled ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>แสดงผล</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>ซ่อนไว้</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:opacity-95 transition-opacity cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>บันทึกลำดับหน้าแรก</span>
          </button>
        </div>
      </div>
    </div>
  );
}
