import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { formatThaiDate } from '@/lib/age';
import {
  ShieldCheck,
  Crown,
  Users,
  Calendar,
  Key,
  Plus,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DepartmentDelegationPage() {
  const departments = await prisma.department.findMany({
    where: { isActive: true },
    include: {
      staffList: true,
      assignments: {
        include: {
          user: true,
        },
      },
    },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin/departments" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>โครงสร้างแผนก</span>
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            การกระจายอำนาจดูแลระดับแผนก (Department Delegation)
          </h2>
          <p className="text-xs text-slate-500">
            ตามข้อกำหนด Spec 6C: หัวหน้าแผนกเป็นผู้ดูแลเริ่มต้น และ Super Admin สามารถแต่งตั้งผู้รับผิดชอบเพิ่มเติมพร้อมกำหนดสิทธิ์เฉพาะแผนก
          </p>
        </div>
      </div>

      {/* Grid of Department Scoped Permissions */}
      <div className="space-y-6">
        {departments.map((dept) => {
          const headStaff = dept.staffList.find((s) => s.id === dept.headStaffId);

          return (
            <div
              key={dept.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-bold text-white uppercase"
                    style={{ backgroundColor: dept.color || '#1E40AF' }}
                  >
                    {dept.code}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{dept.nameTh}</h3>
                    <p className="text-xs text-slate-500">{dept.nameEn || dept.groupName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">
                    บุคลากรทั้งหมด {dept.staffList.length} ท่าน
                  </span>
                </div>
              </div>

              {/* Head of Department (Default Admin) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-2">
                    <Crown className="w-4 h-4 text-amber-600" />
                    <span>หัวหน้าแผนก (ผู้ดูแลเริ่มต้นโดยตำแหน่ง)</span>
                  </div>

                  {headStaff ? (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-sm">
                        {headStaff.firstName.slice(0, 1)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {headStaff.prefix}{headStaff.firstName} {headStaff.lastName}
                        </div>
                        <div className="text-xs text-slate-600">{headStaff.position}</div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">ยังไม่ได้แต่งตั้งหัวหน้าแผนก</span>
                  )}
                </div>

                {/* Additional Delegated Admins */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>ผู้รับผิดชอบที่ได้รับมอบหมายเพิ่มเติม (Delegated)</span>
                    </div>
                  </div>

                  {dept.assignments.length === 0 ? (
                    <div className="text-xs text-slate-400 py-2">
                      ไม่มีการมอบหมายสิทธิ์เพิ่มเติม (หัวหน้าแผนกดูแลคนเดียว)
                    </div>
                  ) : (
                    dept.assignments.map((assign) => (
                      <div
                        key={assign.id}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">{assign.user.name}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                            {assign.role}
                          </span>
                        </div>
                        <div className="text-slate-500 flex items-center gap-1 text-[11px]">
                          <Calendar className="w-3 h-3" />
                          <span>
                            ถึง {assign.validUntil ? formatThaiDate(assign.validUntil) : 'ไม่มีกำหนด'}
                          </span>
                        </div>
                      </div>
                    ))
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
