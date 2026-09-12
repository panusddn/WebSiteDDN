'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  UploadCloud,
  FileSpreadsheet,
  FileText,
  Download,
  ExternalLink,
  Plus,
  Search,
  Filter,
  Trash2,
  Eye,
  CheckCircle2,
  BookOpen,
  Layers,
  GraduationCap,
  Sparkles,
  X,
  Clock,
  User,
  Share2
} from 'lucide-react';

interface ScheduleItem {
  id: string;
  gradeLevel: 'ม.1' | 'ม.2' | 'ม.3' | 'ม.4' | 'ม.5' | 'ม.6' | 'ครูผู้สอน';
  classroom: string;
  program: string;
  advisor: string;
  semester: string;
  year: string;
  sourceType: 'LOCAL_UPLOAD' | 'EXTERNAL_LINK';
  fileType: 'PDF' | 'EXCEL' | 'IMAGE' | 'LINK';
  fileName: string;
  fileSize?: string;
  fileUrl: string;
  uploadedAt: string;
}

const INITIAL_SCHEDULES: ScheduleItem[] = [
  // ม.1
  {
    id: 'sch-101',
    gradeLevel: 'ม.1',
    classroom: 'ม.1/1',
    program: 'ห้องเรียนพิเศษวิทยาศาสตร์-คณิตศาสตร์-เทคโนโลยี (STEM)',
    advisor: 'ครูชาญณรงค์ ปรีชาญชัย',
    semester: '1',
    year: '2569',
    sourceType: 'LOCAL_UPLOAD',
    fileType: 'PDF',
    fileName: 'Timetable_M1-1_Term1_2569.pdf',
    fileSize: '1.4 MB',
    fileUrl: '#',
    uploadedAt: 'วันนี้, 10:30 น.',
  },
  {
    id: 'sch-102',
    gradeLevel: 'ม.1',
    classroom: 'ม.1/2',
    program: 'ห้องเรียนโครงการสองภาษา English Program (EP)',
    advisor: 'ครูกัญญาภัทร วรกิจเจริญ',
    semester: '1',
    year: '2569',
    sourceType: 'LOCAL_UPLOAD',
    fileType: 'PDF',
    fileName: 'Timetable_M1-2_EP_2569.pdf',
    fileSize: '1.2 MB',
    fileUrl: '#',
    uploadedAt: 'วันนี้, 09:15 น.',
  },
  {
    id: 'sch-103',
    gradeLevel: 'ม.1',
    classroom: 'ม.1/3',
    program: 'ห้องเรียนทั่วไป (General Program)',
    advisor: 'ครูสุดารัตน์ เจริญสุข',
    semester: '1',
    year: '2569',
    sourceType: 'EXTERNAL_LINK',
    fileType: 'LINK',
    fileName: 'ตารางเรียน Google Drive ม.1/3',
    fileUrl: 'https://drive.google.com',
    uploadedAt: 'เมื่อวานนี้, 16:40 น.',
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
    sourceType: 'LOCAL_UPLOAD',
    fileType: 'PDF',
    fileName: 'Timetable_M2-1_Term1_2569.pdf',
    fileSize: '1.5 MB',
    fileUrl: '#',
    uploadedAt: '10 พ.ค. 2569',
  },
  {
    id: 'sch-202',
    gradeLevel: 'ม.2',
    classroom: 'ม.2/2',
    program: 'ห้องเรียนสองภาษา Mini English Program (MEP)',
    advisor: 'ครูเจษฎา มณีวงศ์',
    semester: '1',
    year: '2569',
    sourceType: 'LOCAL_UPLOAD',
    fileType: 'EXCEL',
    fileName: 'Schedule_M2-2_Exported.xlsx',
    fileSize: '450 KB',
    fileUrl: '#',
    uploadedAt: '08 พ.ค. 2569',
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
    sourceType: 'LOCAL_UPLOAD',
    fileType: 'PDF',
    fileName: 'Timetable_M3-1_Term1.pdf',
    fileSize: '1.3 MB',
    fileUrl: '#',
    uploadedAt: '05 พ.ค. 2569',
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
    sourceType: 'LOCAL_UPLOAD',
    fileType: 'PDF',
    fileName: 'Timetable_M4-1_SciMathAI.pdf',
    fileSize: '2.1 MB',
    fileUrl: '#',
    uploadedAt: 'วันนี้, 11:00 น.',
  },
  {
    id: 'sch-402',
    gradeLevel: 'ม.4',
    classroom: 'ม.4/2',
    program: 'แผนการเรียนภาษาอังกฤษ - ภาษาจีน (Intensive Languages)',
    advisor: 'ครูสุภาวดี ชัยมงคล',
    semester: '1',
    year: '2569',
    sourceType: 'EXTERNAL_LINK',
    fileType: 'LINK',
    fileName: 'ตารางเรียนออนไลน์ Canva M.4/2',
    fileUrl: 'https://canva.com',
    uploadedAt: '09 พ.ค. 2569',
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
    sourceType: 'LOCAL_UPLOAD',
    fileType: 'PDF',
    fileName: 'Timetable_M5-1_PreMed.pdf',
    fileSize: '1.8 MB',
    fileUrl: '#',
    uploadedAt: '07 พ.ค. 2569',
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
    sourceType: 'LOCAL_UPLOAD',
    fileType: 'PDF',
    fileName: 'Timetable_M6-1_TCAS69.pdf',
    fileSize: '1.9 MB',
    fileUrl: '#',
    uploadedAt: '06 พ.ค. 2569',
  },
  // ครูผู้สอน
  {
    id: 'sch-tch-1',
    gradeLevel: 'ครูผู้สอน',
    classroom: 'กลุ่มสาระฯ วิทยาศาสตร์และเทคโนโลยี',
    program: 'ตารางสอนรวมคณาจารย์หมวดวิทยาการคำนวณและฟิสิกส์',
    advisor: 'ครูชาญณรงค์ ปรีชาญชัย',
    semester: '1',
    year: '2569',
    sourceType: 'LOCAL_UPLOAD',
    fileType: 'EXCEL',
    fileName: 'Science_Dept_Teaching_Schedule_2569.xlsx',
    fileSize: '890 KB',
    fileUrl: '#',
    uploadedAt: 'วันนี้, 08:30 น.',
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
  { key: 'ครูผู้สอน', label: 'ตารางสอนครู' },
];

export default function AdminSchedulesPage() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(INITIAL_SCHEDULES);
  const [activeGrade, setActiveGrade] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<string>('ALL');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State for uploading new schedule
  const [formGrade, setFormGrade] = useState<'ม.1' | 'ม.2' | 'ม.3' | 'ม.4' | 'ม.5' | 'ม.6' | 'ครูผู้สอน'>('ม.1');
  const [formClassroom, setFormClassroom] = useState('');
  const [formProgram, setFormProgram] = useState('');
  const [formAdvisor, setFormAdvisor] = useState('');
  const [formSemester, setFormSemester] = useState('1');
  const [formYear, setFormYear] = useState('2569');
  const [formUploadMode, setFormUploadMode] = useState<'FILE' | 'LINK'>('FILE');
  const [formSelectedFile, setFormSelectedFile] = useState<File | null>(null);
  const [formExternalLink, setFormExternalLink] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Load persisted schedules from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ddn_schedules_cache');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSchedules(parsed);
        }
      }
    } catch (e) {
      console.warn('Cannot read schedules from cache');
    }
  }, []);

  const saveSchedules = (updated: ScheduleItem[]) => {
    setSchedules(updated);
    try {
      localStorage.setItem('ddn_schedules_cache', JSON.stringify(updated));
    } catch (e) {
      console.warn('Cannot write schedules to cache');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormSelectedFile(e.target.files[0]);
    }
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let fileName = '';
    let fileType: 'PDF' | 'EXCEL' | 'IMAGE' | 'LINK' = 'PDF';
    let fileSize = '1.2 MB';
    let fileUrl = '#';

    if (formUploadMode === 'FILE') {
      if (!formSelectedFile) {
        alert('กรุณาเลือกไฟล์ตารางเรียนที่ต้องการอัปโหลด');
        setSubmitting(false);
        return;
      }
      fileName = formSelectedFile.name;
      const ext = fileName.split('.').pop()?.toLowerCase();
      if (ext === 'xlsx' || ext === 'xls') fileType = 'EXCEL';
      else if (ext === 'jpg' || ext === 'png' || ext === 'jpeg') fileType = 'IMAGE';
      else fileType = 'PDF';
      fileSize = `${(formSelectedFile.size / (1024 * 1024)).toFixed(1)} MB`;
      fileUrl = URL.createObjectURL(formSelectedFile);
    } else {
      if (!formExternalLink.trim()) {
        alert('กรุณาระบุลิงก์ตารางเรียนจากภายนอก');
        setSubmitting(false);
        return;
      }
      fileName = `ลิงก์ภายนอก (${formClassroom || 'ตารางเรียน'})`;
      fileType = 'LINK';
      fileUrl = formExternalLink.trim();
    }

    const newSchedule: ScheduleItem = {
      id: `sch-${Date.now()}`,
      gradeLevel: formGrade,
      classroom: formClassroom || `${formGrade} ห้องเรียนใหม่`,
      program: formProgram || 'หลักสูตรสถานศึกษาโรงเรียนดัดดรุณี',
      advisor: formAdvisor || 'งานวิชาการและตารางเรียน',
      semester: formSemester,
      year: formYear,
      sourceType: formUploadMode === 'FILE' ? 'LOCAL_UPLOAD' : 'EXTERNAL_LINK',
      fileType,
      fileName,
      fileSize: formUploadMode === 'FILE' ? fileSize : undefined,
      fileUrl,
      uploadedAt: 'เพิ่งอัปโหลดเมื่อสักครู่',
    };

    const updated = [newSchedule, ...schedules];
    saveSchedules(updated);

    // Reset Form
    setFormSelectedFile(null);
    setFormExternalLink('');
    setFormClassroom('');
    setFormProgram('');
    setFormAdvisor('');
    setIsUploadModalOpen(false);
    setSubmitting(false);

    setSuccessToast(`อัปโหลดตารางเรียน ${newSchedule.classroom} เรียบร้อยแล้ว`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleDelete = (id: string, classroom: string) => {
    if (confirm(`คุณต้องการลบตารางเรียน "${classroom}" ใช่หรือไม่?`)) {
      const updated = schedules.filter((s) => s.id !== id);
      saveSchedules(updated);
      setSuccessToast(`ลบตารางเรียน ${classroom} เรียบร้อยแล้ว`);
      setTimeout(() => setSuccessToast(null), 3000);
    }
  };

  // Filtered schedules
  const filteredSchedules = schedules.filter((sch) => {
    const matchGrade = activeGrade === 'ALL' || sch.gradeLevel === activeGrade;
    const matchSemester = selectedSemester === 'ALL' || sch.semester === selectedSemester;
    const matchSearch =
      sch.classroom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.advisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGrade && matchSemester && matchSearch;
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
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 text-xs font-bold animate-in fade-in shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
              ฝ่ายบริหารงานวิชาการ
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <CalendarDays className="w-7 h-7 text-blue-600" />
            <span>ระบบบริหารจัดการตารางเรียนและตารางสอน</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            รองรับการนำเข้าไฟล์ตารางเรียนจากภายนอก (.pdf, .xlsx, รูปภาพ) และลิงก์คลาวด์ พร้อมจัดหมวดหมู่แยกตามแต่ละระดับชั้น
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:opacity-95 transition-all active:scale-98 self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>อัปโหลดตารางเรียนจากภายนอก</span>
        </button>
      </div>

      {/* Quick Statistics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">ตารางเรียนทั้งหมด</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{schedules.length} ชุด</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">ม.1 - ม.6 และตารางครู</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">ระดับมัธยมศึกษาตอนต้น</div>
          <div className="text-2xl font-black text-blue-600 mt-1">
            {schedules.filter((s) => ['ม.1', 'ม.2', 'ม.3'].includes(s.gradeLevel)).length} ห้อง
          </div>
          <div className="text-[11px] text-slate-400 mt-1">ม.1, ม.2, ม.3</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">ระดับมัธยมศึกษาตอนปลาย</div>
          <div className="text-2xl font-black text-pink-600 mt-1">
            {schedules.filter((s) => ['ม.4', 'ม.5', 'ม.6'].includes(s.gradeLevel)).length} ห้อง
          </div>
          <div className="text-[11px] text-slate-400 mt-1">ม.4, ม.5, ม.6</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">ภาคเรียนปัจจุบัน</div>
          <div className="text-2xl font-black text-indigo-600 mt-1">1/2569</div>
          <div className="text-[11px] text-slate-400 mt-1">ปีการศึกษา 2569</div>
        </div>
      </div>

      {/* Grade Level Selector Tabs (แยกแต่ละระดับชั้น) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-2 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {GRADE_TABS.map((tab) => {
            const isActive = activeGrade === tab.key;
            const count =
              tab.key === 'ALL'
                ? schedules.length
                : schedules.filter((s) => s.gradeLevel === tab.key).length;

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

      {/* Search & Filters Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาห้องเรียน, ครูที่ปรึกษา, ชื่อไฟล์..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>ภาคเรียน:</span>
          </div>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="ALL">ทุกภาคเรียน</option>
            <option value="1">ภาคเรียนที่ 1/2569</option>
            <option value="2">ภาคเรียนที่ 2/2569</option>
          </select>
        </div>
      </div>

      {/* Schedule Cards Grid */}
      {filteredSchedules.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">ไม่พบตารางเรียนในระดับชั้นหรือเงื่อนไขที่เลือก</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            คุณสามารถเพิ่มตารางเรียนใหม่เข้าสู่ระบบได้ทันทีโดยคลิกปุ่ม &quot;อัปโหลดตารางเรียนจากภายนอก&quot; ด้านบน
          </p>
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มตารางเรียนเดี๋ยวนี้</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedules.map((item) => {
            const isExternalLink = item.sourceType === 'EXTERNAL_LINK';

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Card Header: Level Badge & Semester */}
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

                  {/* Classroom and Program */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {item.classroom}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {item.program}
                    </p>
                  </div>

                  {/* Advisor / Teacher */}
                  <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{item.advisor}</span>
                  </div>

                  {/* File / Link Tag */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                      {item.fileType === 'PDF' && <FileText className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                      {item.fileType === 'EXCEL' && <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      {item.fileType === 'LINK' && <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                      <span className="truncate font-semibold text-slate-700">{item.fileName}</span>
                    </div>
                    {item.fileSize && (
                      <span className="shrink-0 text-slate-400 font-mono">{item.fileSize}</span>
                    )}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.uploadedAt}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isExternalLink ? (
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>เปิดลิงก์</span>
                      </a>
                    ) : (
                      <a
                        href={item.fileUrl}
                        download={item.fileName}
                        onClick={(e) => {
                          if (item.fileUrl === '#') {
                            e.preventDefault();
                            alert(`จำลองการดาวน์โหลดไฟล์ ${item.fileName} สมบูรณ์`);
                          }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>ดาวน์โหลด</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.classroom)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="ลบตารางเรียนนี้"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal (อัปโหลดตารางเรียนจากภายนอก) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    อัปโหลดตารางเรียนจากภายนอก
                  </h3>
                  <p className="text-xs text-slate-500">
                    สามารถอัปโหลดไฟล์ (.pdf, .xlsx, ภาพ) หรือระบุลิงก์ไดรฟ์ภายนอก
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateSchedule} className="space-y-4">
              {/* Grade Level & Classroom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ระดับชั้น <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formGrade}
                    onChange={(e: any) => setFormGrade(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  >
                    <option value="ม.1">มัธยมศึกษาปีที่ 1 (ม.1)</option>
                    <option value="ม.2">มัธยมศึกษาปีที่ 2 (ม.2)</option>
                    <option value="ม.3">มัธยมศึกษาปีที่ 3 (ม.3)</option>
                    <option value="ม.4">มัธยมศึกษาปีที่ 4 (ม.4)</option>
                    <option value="ม.5">มัธยมศึกษาปีที่ 5 (ม.5)</option>
                    <option value="ม.6">มัธยมศึกษาปีที่ 6 (ม.6)</option>
                    <option value="ครูผู้สอน">ตารางสอนรายบุคคลของครู</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ห้องเรียน / กลุ่มสาระ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formClassroom}
                    onChange={(e) => setFormClassroom(e.target.value)}
                    placeholder="เช่น ม.1/4 หรือ กลุ่มสาระภาษาไทย"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Program & Advisor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    แผนการเรียน / รายละเอียด
                  </label>
                  <input
                    type="text"
                    value={formProgram}
                    onChange={(e) => setFormProgram(e.target.value)}
                    placeholder="เช่น แผนการเรียนวิทย์-คณิต-คอมพิวเตอร์"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ครูประจำชั้น / ผู้รับผิดชอบ
                  </label>
                  <input
                    type="text"
                    value={formAdvisor}
                    onChange={(e) => setFormAdvisor(e.target.value)}
                    placeholder="เช่น ครูสมหมาย การุณวิทย์"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Semester & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ภาคเรียน
                  </label>
                  <select
                    value={formSemester}
                    onChange={(e) => setFormSemester(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="1">ภาคเรียนที่ 1</option>
                    <option value="2">ภาคเรียนที่ 2</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ปีการศึกษา
                  </label>
                  <input
                    type="text"
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    placeholder="2569"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Mode Switch: File Upload vs External Link */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700">
                  ช่องทางการนำเข้าตารางเรียน
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormUploadMode('FILE')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      formUploadMode === 'FILE'
                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>อัปโหลดไฟล์จากเครื่อง</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormUploadMode('LINK')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      formUploadMode === 'LINK'
                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>ระบุลิงก์คลาวด์ภายนอก</span>
                  </button>
                </div>
              </div>

              {/* Input according to mode */}
              {formUploadMode === 'FILE' ? (
                <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 text-center transition-colors">
                  <input
                    type="file"
                    id="schedule-file-input"
                    accept=".pdf, .xlsx, .xls, .jpg, .png, .jpeg, .doc, .docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="schedule-file-input"
                    className="cursor-pointer flex flex-col items-center gap-1.5"
                  >
                    <FileText className="w-7 h-7 text-blue-600" />
                    <span className="text-xs font-bold text-slate-800">
                      {formSelectedFile ? formSelectedFile.name : 'คลิกเพื่อเลือกไฟล์ตารางเรียน'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      รองรับไฟล์ PDF, Excel (.xlsx), รูปภาพ PNG/JPG (ขนาดไม่เกิน 20MB)
                    </span>
                  </label>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    URL ลิงก์ตารางเรียนภายนอก (Google Drive / Canva / OneDrive)
                  </label>
                  <input
                    type="url"
                    value={formExternalLink}
                    onChange={(e) => setFormExternalLink(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:opacity-90 disabled:opacity-50 transition-all active:scale-98"
                >
                  {submitting ? 'กำลังบันทึก...' : 'บันทึกและเผยแพร่ตารางเรียน'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
