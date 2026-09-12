import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { CalendarDays, Download, Plus, Search, Filter, BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminSchedulesPage() {
  const schedules = await prisma.schedule.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            ตารางเรียนและตารางสอน (Class Schedules)
          </h2>
          <p className="text-xs text-slate-500">
            บริหารจัดการตารางเรียนตามระดับชั้น ห้องเรียน ภาคเรียน และปีการศึกษา
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Timetable Cards */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              มัธยมศึกษาปีที่ 1
            </span>
            <span className="text-xs text-slate-500 font-semibold">ภาคเรียนที่ 1/2569</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">ห้องเรียน 1/1 (ห้องเรียนพิเศษ STEM)</h3>
            <p className="text-xs text-slate-500 mt-0.5">ครูประจำชั้น: ครูสมชาย เทพประสิทธิ์</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">อัปเดตล่าสุด: สัปดาห์นี้</span>
            <button className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800">
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด PDF</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-xl bg-pink-50 text-pink-700 text-xs font-bold border border-pink-200">
              มัธยมศึกษาปีที่ 4
            </span>
            <span className="text-xs text-slate-500 font-semibold">ภาคเรียนที่ 1/2569</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">ห้องเรียน 4/1 (วิทย์-คณิต-คอมพิวเตอร์)</h3>
            <p className="text-xs text-slate-500 mt-0.5">ครูประจำชั้น: ครูวิไลวรรณ สุขสถิตย์</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">อัปเดตล่าสุด: สัปดาห์นี้</span>
            <button className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800">
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
