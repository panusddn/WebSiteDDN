import React from 'react';
import Link from 'next/link';
import { getSchoolEvents } from '@/lib/calendarData';
import { formatThaiDate } from '@/lib/age';
import { CalendarCheck2, Plus, MapPin, Calendar, ExternalLink, Clock, Sparkles, CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminCalendarPage() {
  const events = await getSchoolEvents();

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            ปฏิทินกิจกรรมโรงเรียน (Activity Calendar)
          </h2>
          <p className="text-xs text-slate-500">
            กำหนดการ วันสำคัญ กิจกรรมวิชาการ และกิจกรรมส่งเสริมศักยภาพนักเรียน
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/calendar"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <span>เปิดดูหน้าปฏิทินสาธารณะ</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>สร้างกิจกรรมใหม่</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] text-slate-400 font-medium">กิจกรรมทั้งหมด</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{events.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] text-slate-400 font-medium">กิจกรรมวิชาการ</span>
          <div className="text-2xl font-black text-blue-600 mt-1">
            {events.filter((e) => e.category === 'วิชาการ').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] text-slate-400 font-medium">วันสำคัญ / วันหยุด</span>
          <div className="text-2xl font-black text-pink-600 mt-1">
            {events.filter((e) => e.category === 'วันสำคัญ').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] text-slate-400 font-medium">ตารางการสอบ</span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {events.filter((e) => e.category === 'การสอบ').length}
          </div>
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev) => {
          const eventDate = new Date(ev.startDate);
          const monthTh = eventDate.toLocaleString('th-TH', { month: 'short' });
          const dayNum = eventDate.getDate();

          return (
            <div
              key={ev.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-start gap-4 hover:shadow-md transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-pink-600 text-white flex flex-col items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <span className="text-xs uppercase font-bold opacity-85">
                  {monthTh}
                </span>
                <span className="text-xl font-black">
                  {dayNum}
                </span>
              </div>

              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-100">
                    {ev.category || 'กิจกรรมโรงเรียน'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>เผยแพร่แล้ว</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {ev.title}
                </h3>

                {ev.description && (
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {ev.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                  {ev.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                      <span>{ev.location}</span>
                    </div>
                  )}
                  {ev.timeRange && (
                    <div className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{ev.timeRange}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
