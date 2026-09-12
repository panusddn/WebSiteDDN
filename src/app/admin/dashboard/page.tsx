import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { calculateAge, getBirthdayStatus, formatThaiDate } from '@/lib/age';
import {
  Users,
  Network,
  Newspaper,
  FileText,
  Cake,
  Share2,
  TrendingUp,
  ArrowUpRight,
  PlusCircle,
  FileSpreadsheet,
  Palette,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calendar,
  Eye,
  Send
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // Query counts and stats
  const [
    staffCount,
    departmentCount,
    newsCount,
    documentCount,
    allStaff,
    recentNews,
    socialConnection,
    recentAuditLogs,
    activeTheme,
  ] = await Promise.all([
    prisma.staff.count({ where: { isActive: true } }),
    prisma.department.count({ where: { isActive: true } }),
    prisma.news.count({ where: { status: 'PUBLISHED' } }),
    prisma.document.count(),
    prisma.staff.findMany({
      where: { isActive: true },
      include: { department: true },
    }),
    prisma.news.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { department: true, author: true },
    }),
    prisma.socialConnection.findFirst({
      where: { platform: 'FACEBOOK' },
    }),
    prisma.auditLog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    }),
    prisma.websiteTheme.findFirst({
      where: { isActive: true },
    }),
  ]);

  // Compute Birthday Highlights for upcoming 30 days
  const birthdayStaff = allStaff
    .map((s) => {
      const bStatus = getBirthdayStatus(s.dateOfBirth);
      const ageInfo = calculateAge(s.dateOfBirth);
      return {
        ...s,
        bStatus,
        ageInfo,
      };
    })
    .filter((s) => s.bStatus && s.bStatus.isUpcoming30Days)
    .sort((a, b) => (a.bStatus!.daysRemaining - b.bStatus!.daysRemaining));

  const birthdaysToday = birthdayStaff.filter((s) => s.bStatus!.isToday);
  const birthdaysUpcoming = birthdayStaff.filter((s) => !s.bStatus!.isToday);

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome with Modern Blue-Pink Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-800 to-pink-800 p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md text-pink-200 border border-white/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ระบบบริหารจัดการสถานศึกษาดิจิทัล 2569</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            แดชบอร์ดภาพรวมผู้บริหารโรงเรียนดัดดรุณี
          </h2>
          <p className="mt-2 text-sm text-blue-100/90 leading-relaxed">
            ศูนย์รวมข้อมูลสถิติบำรุงการศึกษา บุคลากร ข่าวสาร ตารางเรียน และระบบอัตลักษณ์เว็บไซต์แบบครบวงจร
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin/staff/import"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-98"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>นำเข้าบุคลากรจาก Excel</span>
            </Link>
            <Link
              href="/admin/news/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-98"
            >
              <PlusCircle className="w-4 h-4" />
              <span>สร้างข่าวประชาสัมพันธ์</span>
            </Link>
            <Link
              href="/admin/theme"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md text-xs sm:text-sm font-semibold border border-white/30 transition-all"
            >
              <Palette className="w-4 h-4 text-pink-300" />
              <span>ปรับแต่งธีมเว็บไซต์</span>
            </Link>
          </div>
        </div>

        {/* Decorative Background Glows */}
        <div className="absolute -right-12 -top-12 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-48 -bottom-16 w-80 h-80 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Staff */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              บุคลากรทั้งหมด
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{staffCount}</span>
            <span className="text-xs text-slate-500 font-medium">ท่าน</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <Link href="/admin/staff" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
              <span>ดูรายชื่อบุคลากร</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 2: Departments */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              แผนกและกลุ่มสาระ
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{departmentCount}</span>
            <span className="text-xs text-slate-500 font-medium">หน่วยงาน</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <Link href="/admin/departments/org-chart" className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1">
              <span>ดูผังองค์กรแบบโต้ตอบ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 3: News & Announcements */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              ข่าวและประกาศ
            </span>
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{newsCount}</span>
            <span className="text-xs text-slate-500 font-medium">บทความเผยแพร่</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <Link href="/admin/news" className="text-pink-600 hover:text-pink-800 font-semibold flex items-center gap-1">
              <span>จัดการข่าวสาร</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 4: Documents & Forms */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              ศูนย์เอกสารดาวน์โหลด
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{documentCount}</span>
            <span className="text-xs text-slate-500 font-medium">ฉบับ</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <Link href="/admin/documents" className="text-amber-600 hover:text-amber-800 font-semibold flex items-center gap-1">
              <span>จัดการเอกสาร</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Birthday Wishes Widget (Section 13A of Spec) */}
      <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-3xl border border-pink-200/70 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center shadow-md shadow-pink-500/20">
              <Cake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  วันเกิดครูและบุคลากร (Birthday Wishes System)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-pink-500 text-white">
                  {birthdayStaff.length} ท่านใน 30 วันนี้
                </span>
              </div>
              <p className="text-xs text-slate-500">
                คำนวณอายุและวันเกิดอัตโนมัติจากวันเดือนปีเกิด พร้อมเทมเพลตการ์ดอวยพรสำเร็จรูป
              </p>
            </div>
          </div>

          <Link
            href="/admin/birthdays"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-pink-700 bg-pink-100/80 hover:bg-pink-200 transition-colors self-start sm:self-auto"
          >
            <span>เปิดระบบส่งการ์ดอวยพร</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Birthday List Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {birthdayStaff.length === 0 ? (
            <div className="col-span-full py-8 text-center text-slate-400 text-sm">
              ไม่มีวันเกิดครูหรือบุคลากรในรอบ 30 วันนี้
            </div>
          ) : (
            birthdayStaff.map((staff) => {
              const isToday = staff.bStatus!.isToday;
              return (
                <div
                  key={staff.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isToday
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25 border-transparent'
                      : 'bg-white border-pink-100 hover:border-pink-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0 ${
                        isToday ? 'bg-white text-pink-600' : 'bg-pink-100 text-pink-700'
                      }`}
                    >
                      {staff.firstName.slice(0, 1)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold truncate ${isToday ? 'text-white' : 'text-slate-900'}`}>
                          {staff.prefix}{staff.firstName} {staff.lastName}
                        </span>
                        {isToday && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white text-pink-600 animate-bounce">
                            วันนี้!
                          </span>
                        )}
                      </div>
                      <p className={`text-xs truncate ${isToday ? 'text-pink-100' : 'text-slate-500'}`}>
                        {staff.position || staff.department?.nameTh}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-[11px]">
                        <span className={isToday ? 'text-pink-100' : 'text-slate-600'}>
                          วันเกิด: {formatThaiDate(staff.dateOfBirth, false)}
                        </span>
                        <span className={`font-semibold ${isToday ? 'text-white' : 'text-pink-600'}`}>
                          {staff.ageInfo?.years} ปี
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-black/10 flex items-center justify-between text-xs">
                    <span className={isToday ? 'text-pink-100 font-medium' : 'text-slate-400'}>
                      {isToday ? '🎉 ถึงวันเกิดแล้ววันนี้' : `อีก ${staff.bStatus!.daysRemaining} วัน`}
                    </span>
                    <Link
                      href={`/admin/birthdays?sendTo=${staff.id}`}
                      className={`inline-flex items-center gap-1 font-semibold ${
                        isToday
                          ? 'text-white hover:underline'
                          : 'text-pink-600 hover:text-pink-800'
                      }`}
                    >
                      <Send className="w-3 h-3" />
                      <span>ส่งการ์ด</span>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 2-Column Section: Recent News & System Integrations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent News & Announcements (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                ข่าวและประกาศล่าสุด (CMS)
              </h3>
              <p className="text-xs text-slate-500">บทความประชาสัมพันธ์ที่กำลังเผยแพร่บนหน้าเว็บไซต์</p>
            </div>
            <Link
              href="/admin/news"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>ดูทั้งหมด</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentNews.map((n) => (
              <div
                key={n.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {n.title}
                    </h4>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                        {n.department?.nameTh || 'ทั่วไป'}
                      </span>
                      <span>•</span>
                      <span>{n.viewsCount.toLocaleString()} เข้าชม</span>
                      <span>•</span>
                      <span>{formatThaiDate(n.publishedAt || n.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <Link
                    href={`/news/${n.slug}`}
                    target="_blank"
                    className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-white transition-colors"
                    title="เปิดดูบนเว็บ"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Status & Integrations */}
        <div className="space-y-6">
          {/* Active Theme Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">ธีมเว็บไซต์ปัจจุบัน</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="font-bold text-slate-900 text-sm">
                {activeTheme?.name || 'Modern Technology (Blue & Pink)'}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {activeTheme?.description || 'อัตลักษณ์สีน้ำเงิน-ชมพู นำสมัยสไตล์โรงเรียนดิจิทัล'}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-700 border border-white shadow-xs" title="Primary Blue" />
                <span className="w-5 h-5 rounded-full bg-sky-600 border border-white shadow-xs" title="Secondary" />
                <span className="w-5 h-5 rounded-full bg-pink-500 border border-white shadow-xs" title="Accent Pink" />
                <span className="w-5 h-5 rounded-full bg-slate-900 border border-white shadow-xs" title="Navy Text" />
              </div>
            </div>
            <Link
              href="/admin/theme"
              className="mt-4 block text-center py-2 px-4 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              เปิด Theme & Template Manager
            </Link>
          </div>

          {/* Social Sync Status Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Social Media Sync</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Connected
              </span>
            </div>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>บัญชี Facebook:</span>
                <span className="font-bold text-slate-900">Datdaruni Official</span>
              </div>
              <div className="flex items-center justify-between">
                <span>สถานะการเชื่อมต่อ:</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>พร้อมใช้งาน</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>อัปเดตล่าสุด:</span>
                <span className="text-slate-500">วันนี้ เมื่อสักครู่</span>
              </div>
            </div>
            <Link
              href="/admin/social"
              className="mt-4 block text-center py-2 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              ตั้งค่า Social Connections
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
