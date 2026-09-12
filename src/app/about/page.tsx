import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';
import {
  Sparkles,
  Award,
  Target,
  GraduationCap,
  Network,
  Users,
  ShieldCheck,
  CheckCircle2,
  Crown
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const [branding, departments, executives] = await Promise.all([
    prisma.brandingSetting.findFirst(),
    prisma.department.findMany({
      where: { isActive: true, isPublic: true },
      include: {
        children: true,
        staffList: true,
      },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.staff.findMany({
      where: { isExecutive: true, isActive: true },
      include: { department: true },
      orderBy: { sortOrder: 'asc' },
    }),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar
        schoolName={branding?.schoolName}
        shortName={branding?.shortName}
        tagline={branding?.schoolNameEn}
      />

      <main className="flex-1 space-y-16 py-12">
        {/* Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-pink-900 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-pink-200">
                ประวัติและวิสัยทัศน์สถานศึกษา
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                เกี่ยวกับโรงเรียนดัดดรุณี
              </h1>
              <p className="text-sm text-slate-200 leading-relaxed">
                สถานศึกษาชั้นนำในจังหวัดฉะเชิงเทรา มุ่งเน้นการยกระดับคุณภาพการศึกษาควบคู่เทคโนโลยีและคุณธรรม
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">วิสัยทัศน์ (Vision)</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                “โรงเรียนดัดดรุณี เป็นเลิศทางวิชาการและนวัตกรรมดิจิทัล สืบสานคุณธรรม จริยธรรม สู่มาตรฐานสากลภายในปี 2570”
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">พันธกิจ (Mission)</h3>
              <ul className="space-y-2 text-sm text-slate-600 font-normal">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                  <span>จัดการศึกษาตามมาตรฐานสากล พัฒนาทักษะแห่งศตวรรษที่ 21</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                  <span>ส่งเสริมการเรียนรู้ด้าน Coding, AI, หุ่นยนต์ และสะเต็มศึกษา (STEM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                  <span>ปลูกฝังคุณธรรม ความเป็นพลเมืองที่ดี และความภาคภูมิใจในความเป็นไทย</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Executive Board */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">คณะผู้บริหารสถานศึกษา</h2>
            <p className="text-xs text-slate-500">ผู้นำการเปลี่ยนแปลงเพื่อการพัฒนาการเรียนรู้ที่ยั่งยืน</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {executives.map((exec) => (
              <div
                key={exec.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs text-center space-y-3"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-blue-700 to-pink-500 p-0.5 shadow-md">
                  <div className="w-full h-full bg-slate-100 rounded-[14px] flex items-center justify-center font-black text-2xl text-blue-900">
                    {exec.firstName.slice(0, 1)}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {exec.prefix}{exec.firstName} {exec.lastName}
                  </h3>
                  <p className="text-xs font-semibold text-pink-600 mt-0.5">
                    {exec.position}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {exec.academicRank || 'วิทยฐานะเชี่ยวชาญ'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Public Organization Chart (Spec 6B) */}
        <section id="org-chart" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
              <Network className="w-4 h-4" />
              <span>ผังโครงสร้างการบริหาร</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              โครงสร้างองค์กร (Organization Structure)
            </h2>
            <p className="text-xs text-slate-500">
              สายการบังคับบัญชาและกลุ่มสาระการเรียนรู้ โรงเรียนดัดดรุณี
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-0.5 rounded text-[11px] font-bold text-white uppercase"
                      style={{ backgroundColor: dept.color || '#1E40AF' }}
                    >
                      {dept.code}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{dept.staffList.length} ท่าน</span>
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{dept.nameTh}</h4>
                  {dept.nameEn && <p className="text-xs text-slate-500">{dept.nameEn}</p>}
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {dept.description || 'มุ่งมั่นสนับสนุนการจัดการเรียนรู้อย่างมีคุณภาพ'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter
        schoolName={branding?.schoolName}
        contactAddress={branding?.contactAddress ?? undefined}
        contactPhone={branding?.contactPhone ?? undefined}
        contactEmail={branding?.contactEmail ?? undefined}
        footerText={branding?.footerText ?? undefined}
      />
    </div>
  );
}
