import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';
import { calculateAge, formatThaiDate } from '@/lib/age';
import { Users, Mail, Phone, Search, Filter } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PublicStaffPage() {
  const [branding, staffList, departments] = await Promise.all([
    prisma.brandingSetting.findFirst(),
    prisma.staff.findMany({
      where: { isActive: true },
      include: { department: true },
      orderBy: [{ isExecutive: 'desc' }, { sortOrder: 'asc' }],
    }),
    prisma.department.findMany({
      where: { isActive: true },
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

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 w-full">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            Datdaruni Staff Directory
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">
            ทำเนียบคณาจารย์และบุคลากร
          </h1>
          <p className="text-xs text-slate-500">
            บุคลากรผู้เปี่ยมด้วยคุณภาพ มีความเชี่ยวชาญ และพร้อมส่งเสริมการเรียนรู้ของนักเรียนทุกคน
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {staffList.map((staff) => {
            const age = !staff.hideAgePublic ? calculateAge(staff.dateOfBirth) : null;

            return (
              <div
                key={staff.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-lg transition-all text-center flex flex-col justify-between"
              >
                <div>
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-blue-700 to-pink-500 p-0.5 shadow-md mb-4">
                    <div className="w-full h-full bg-slate-100 rounded-[14px] flex items-center justify-center font-black text-2xl text-blue-900">
                      {staff.firstName.slice(0, 1)}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">
                    {staff.prefix}{staff.firstName} {staff.lastName}
                  </h3>

                  <p className="text-xs font-semibold text-pink-600 mt-1">
                    {staff.position || 'ครูผู้สอน'}
                  </p>

                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-800 mt-2 border border-blue-100">
                    {staff.department?.nameTh || 'ส่วนกลาง'}
                  </span>

                  {staff.academicRank && (
                    <p className="text-[11px] text-slate-500 mt-1">{staff.academicRank}</p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                  {staff.phone && (
                    <div className="flex items-center justify-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{staff.phone}</span>
                    </div>
                  )}
                  {staff.email && (
                    <div className="flex items-center justify-center gap-1 text-[11px]">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-[160px]">{staff.email}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
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
