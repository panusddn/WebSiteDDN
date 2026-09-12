import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { formatThaiDate } from '@/lib/age';
import { CalendarCheck2, Plus, MapPin, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminCalendarPage() {
  let events: any[] = [];
  try {
    events = await prisma.event.findMany({
      orderBy: { startDate: 'asc' },
    });
  } catch (err) {
    console.warn('Database error in Admin Calendar, using fallback data:', err);
    events = [
      {
        id: 'ev-1',
        title: 'พิธีเปิดภาคเรียนที่ 1 ประจำปีการศึกษา 2569',
        category: 'วันสำคัญ',
        startDate: new Date('2026-05-16'),
        location: 'หอประชุมใหญ่',
        isPublic: true,
      },
      {
        id: 'ev-2',
        title: 'DDN AI & Robotics Hackathon 2026',
        category: 'วิชาการ',
        startDate: new Date('2026-06-20'),
        location: 'ศูนย์นวัตกรรมดิจิทัล อาคาร 5',
        isPublic: true,
      },
    ];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            ปฏิทินกิจกรรมโรงเรียน (Activity Calendar)
          </h2>
          <p className="text-xs text-slate-500">
            กำหนดการ วันสำคัญ กิจกรรมวิชาการ และกิจกรรมส่งเสริมศักยภาพนักเรียน
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-start gap-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-pink-600 text-white flex flex-col items-center justify-center shrink-0 shadow-md">
              <span className="text-xs uppercase font-bold opacity-80">
                {new Date(ev.startDate).toLocaleString('th-TH', { month: 'short' })}
              </span>
              <span className="text-xl font-black">
                {new Date(ev.startDate).getDate()}
              </span>
            </div>

            <div className="space-y-2 min-w-0 flex-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-100">
                {ev.category || 'กิจกรรมโรงเรียน'}
              </span>
              <h3 className="text-base font-bold text-slate-900 leading-snug">{ev.title}</h3>
              {ev.description && (
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{ev.description}</p>
              )}
              {ev.location && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                  <span>{ev.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
