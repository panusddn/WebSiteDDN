import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import {
  Network,
  Plus,
  Edit,
  Users,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  GitBranch,
  Layers
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDepartmentsPage() {
  const departments = await prisma.department.findMany({
    where: { isActive: true },
    include: {
      parent: true,
      children: true,
      staffList: true,
      assignments: {
        include: { user: true },
      },
    },
    orderBy: { sortOrder: 'asc' },
  });

  // Root departments (without parent)
  const rootDepts = departments.filter((d) => !d.parentId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            โครงสร้างแผนกและหน่วยงาน (Department Management)
          </h2>
          <p className="text-xs text-slate-500">
            บริหารจัดการสายการบังคับบัญชา หัวหน้าแผนก และการมอบหมายสิทธิ์ (ทั้งหมด {departments.length} หน่วยงาน)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/departments/org-chart"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:opacity-95 transition-all active:scale-98"
          >
            <GitBranch className="w-4 h-4" />
            <span>เปิดผังองค์กรแบบโต้ตอบ (Interactive Org Chart)</span>
          </Link>
          <Link
            href="/admin/departments/delegation"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-xs transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-pink-600" />
            <span>มอบหมายสิทธิ์ผู้ดูแลแผนก</span>
          </Link>
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => {
          return (
            <div
              key={dept.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide text-white"
                    style={{ backgroundColor: dept.color || '#1E40AF' }}
                  >
                    {dept.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {dept.groupName || 'หน่วยงาน'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {dept.nameTh}
                </h3>
                {dept.nameEn && (
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{dept.nameEn}</p>
                )}

                <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                  {dept.description || 'ไม่มีคำอธิบาย'}
                </p>

                {/* Parent department if any */}
                {dept.parent && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-blue-700 font-semibold bg-blue-50/70 p-2 rounded-xl">
                    <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">สังกัด: {dept.parent.nameTh}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>บุคลากร {dept.staffList.length} ท่าน</span>
                </div>

                <Link
                  href={`/admin/departments/delegation?deptId=${dept.id}`}
                  className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>จัดการสิทธิ์</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
