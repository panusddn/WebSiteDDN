'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';
import {
  CalendarDays,
  Download,
  ExternalLink,
  Search,
  BookOpen,
  User,
  Clock,
  FileText,
  FileSpreadsheet,
  Layers,
  GraduationCap
} from 'lucide-react';

interface ScheduleItem {
  id: string;
  gradeLevel: 'ม.1' | 'ม.2' | 'ม.3' | 'ม.4' | 'ม.5' | 'ม.6';
  classroom: string;
  program: string;
  advisor: string;
  semester: string;
  year: string;
  fileType: 'PDF' | 'EXCEL' | 'LINK';
  fileName: string;
  fileSize?: string;
  fileUrl: string;
}

const PUBLIC_SCHEDULES: ScheduleItem[] = [
  // ม.1
  {
    id: 'sch-101',
    gradeLevel: 'ม.1',
    classroom: 'ม.1/1',
    program: 'ห้องเรียนพิเศษวิทยาศาสตร์-คณิตศาสตร์-เทคโนโลยี (STEM)',
    advisor: 'ครูชาญณรงค์ ปรีชาญชัย',
    semester: '1',
    year: '2569',
    fileType: 'PDF',
    fileName: 'Timetable_M1-1_Term1_2569.pdf',
    fileSize: '1.4 MB',
    fileUrl: '#',
  },
  {
    id: 'sch-102',
    gradeLevel: 'ม.1',
    classroom: 'ม.1/2',
    program: 'ห้องเรียนโครงการสองภาษา English Program (EP)',
    advisor: 'ครูกัญญาภัทร วรกิจเจริญ',
    semester: '1',
    year: '2569',
    fileType: 'PDF',
    fileName: 'Timetable_M1-2_EP_2569.pdf',
    fileSize: '1.2 MB',
    fileUrl: '#',
  },
  {
    id: 'sch-103',
    gradeLevel: 'ม.1',
    classroom: 'ม.1/3',
    program: 'ห้องเรียนทั่วไป (General Program)',
    advisor: 'ครูสุดารัตน์ เจริญสุข',
    semester: '1',
    year: '2569',
    fileType: 'LINK',
    fileName: 'ตารางเรียน Google Drive ม.1/3',
    fileUrl: 'https://drive.google.com',
  },
  // ม.2
  {
    id: 'sch-201',
    gradeLevel: 'ม.2',
    classroom: 'ม.2/1',
    program: 'ห้องเรียนพิเศษวิทยาศาสตร์-คณิตศาสตร์ (Smart Science)',
    advisor: 'ครูวราภรณ์ สุวรรณรัตน์',
    semester: '1',
    year: '2569',
    fileType: 'PDF',
    fileName: 'Timetable_M2-1_Term1_2569.pdf',
    fileSize: '1.5 MB',
    fileUrl: '#',
  },
  {
    id: 'sch-202',
    gradeLevel: 'ม.2',
    classroom: 'ม.2/2',
    program: 'ห้องเรียนสองภาษา Mini English Program (MEP)',
    advisor: 'ครูเจษฎา มณีวงศ์',
    semester: '1',
    year: '2569',
    fileType: 'EXCEL',
    fileName: 'Schedule_M2-2_Exported.xlsx',
    fileSize: '450 KB',
    fileUrl: '#',
  },
  // ม.3
  {
    id: 'sch-301',
    gradeLevel: 'ม.3',
    classroom: 'ม.3/1',
    program: 'ห้องเรียนพิเศษเตรียมความพร้อมสู่สายอาชีพดิจิทัล',
    advisor: 'ครูประยุทธ มณีรัตน์',
    semester: '1',
    year: '2569',
    fileType: 'PDF',
    fileName: 'Timetable_M3-1_Term1.pdf',
    fileSize: '1.3 MB',
    fileUrl: '#',
  },
  // ม.4
  {
    id: 'sch-401',
    gradeLevel: 'ม.4',
    classroom: 'ม.4/1',
    program: 'แผนการเรียนวิทยาศาสตร์ - คณิตศาสตร์ - คอมพิวเตอร์ AI',
    advisor: 'ครูวิศิษฏ์ เกียรติก้อง',
    semester: '1',
    year: '2569',
    fileType: 'PDF',
    fileName: 'Timetable_M4-1_SciMathAI.pdf',
    fileSize: '2.1 MB',
    fileUrl: '#',
  },
  {
    id: 'sch-402',
    gradeLevel: 'ม.4',
    classroom: 'ม.4/2',
    program: 'แผนการเรียนภาษาอังกฤษ - ภาษาจีน (Intensive Languages)',
    advisor: 'ครูสุภาวดี ชัยมงคล',
    semester: '1',
    year: '2569',
    fileType: 'LINK',
    fileName: 'ตารางเรียนออนไลน์ Canva M.4/2',
    fileUrl: 'https://canva.com',
  },
  // ม.5
  {
    id: 'sch-501',
    gradeLevel: 'ม.5',
    classroom: 'ม.5/1',
    program: 'แผนการเรียนวิทยาศาสตร์สุขภาพและการแพทย์ (Pre-Med)',
    advisor: 'ครูศิริพร ธนารักษ์',
    semester: '1',
    year: '2569',
    fileType: 'PDF',
    fileName: 'Timetable_M5-1_PreMed.pdf',
    fileSize: '1.8 MB',
    fileUrl: '#',
  },
  // ม.6
  {
    id: 'sch-601',
    gradeLevel: 'ม.6',
    classroom: 'ม.6/1',
    program: 'แผนการเรียนวิทยาศาสตร์-คณิตศาสตร์เข้มข้นเตรียมสอบมหาวิทยาลัย (TCAS)',
    advisor: 'ครูสมพร ปัญญาเลิศ',
    semester: '1',
    year: '2569',
    fileType: 'PDF',
    fileName: 'Timetable_M6-1_TCAS69.pdf',
    fileSize: '1.9 MB',
    fileUrl: '#',
  },
];

const GRADE_TABS = [
  { key: 'ALL', label: 'ทั้งหมด' },
  { key: 'ม.1', label: 'มัธยมศึกษาปีที่ 1' },
  { key: 'ม.2', label: 'มัธยมศึกษาปีที่ 2' },
  { key: 'ม.3', label: 'มัธยมศึกษาปีที่ 3' },
  { key: 'ม.4', label: 'มัธยมศึกษาปีที่ 4' },
  { key: 'ม.5', label: 'มัธยมศึกษาปีที่ 5' },
  { key: 'ม.6', label: 'มัธยมศึกษาปีที่ 6' },
];

export default function PublicSchedulesPage() {
  const [activeGrade, setActiveGrade] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = PUBLIC_SCHEDULES.filter((s) => {
    const matchGrade = activeGrade === 'ALL' || s.gradeLevel === activeGrade;
    const matchSearch =
      s.classroom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.advisor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGrade && matchSearch;
  });

  const getBadgeColor = (grade: string) => {
    switch (grade) {
      case 'ม.1':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'ม.2':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'ม.3':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'ม.4':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'ม.5':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'ม.6':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 w-full">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            Datdaruni Timetables & Schedules
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            ตารางเรียนและตารางสอน
          </h1>
          <p className="text-sm text-slate-500">
            ประจำภาคเรียนที่ 1 ปีการศึกษา 2569 สำหรับนักเรียนและผู้ปกครอง แยกตามแต่ละระดับชั้น
          </p>
        </div>

        {/* Grade Level Filter Tabs */}
        <div className="bg-white rounded-3xl border border-slate-200 p-2 shadow-xs max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {GRADE_TABS.map((tab) => {
              const isActive = activeGrade === tab.key;
              const count =
                tab.key === 'ALL'
                  ? PUBLIC_SCHEDULES.length
                  : PUBLIC_SCHEDULES.filter((s) => s.gradeLevel === tab.key).length;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveGrade(tab.key)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-md shadow-blue-600/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Toolbar */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาห้องเรียน, ครูที่ปรึกษา, หรือแผนการเรียน..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-black border ${getBadgeColor(
                      item.gradeLevel
                    )}`}
                  >
                    {item.gradeLevel}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    ภาคเรียนที่ {item.semester}/{item.year}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.classroom}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {item.program}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{item.advisor}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  {item.fileType === 'PDF' && <FileText className="w-3.5 h-3.5 text-rose-500" />}
                  {item.fileType === 'EXCEL' && <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />}
                  {item.fileType === 'LINK' && <ExternalLink className="w-3.5 h-3.5 text-blue-600" />}
                  <span className="text-[11px] font-medium truncate max-w-[140px]">{item.fileName}</span>
                </div>

                {item.fileType === 'LINK' ? (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>เปิดดู</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => alert(`ดาวน์โหลดตารางเรียน ${item.classroom} เรียบร้อยแล้ว`)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ดาวน์โหลด</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
