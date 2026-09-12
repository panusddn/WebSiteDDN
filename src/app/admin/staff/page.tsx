import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { calculateAge, getBirthdayStatus, formatThaiDate } from '@/lib/age';
import {
  Users,
  Search,
  Filter,
  FileSpreadsheet,
  Plus,
  Cake,
  Mail,
  Phone,
  Eye,
  Edit,
  Sparkles
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminStaffPage() {
  let staffList: any[] = [];
  let departments: any[] = [];

  try {
    const [s, d] = await Promise.all([
      prisma.staff.findMany({
        where: { isActive: true },
        include: {
          department: true,
          user: true,
        },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      }),
      prisma.department.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      }),
    ]);
    staffList = s;
    departments = d;
  } catch (err) {
    console.warn('Database not reachable in Admin Staff, using fallback data:', err);
  }

  // Fallback staff list if database is empty or uninitialized
  if (staffList.length === 0) {
    staffList = [
      {
        id: 's1',
        employeeId: 'DDN001',
        prefix: 'ดร.',
        firstName: 'สมพร',
        lastName: 'ปัญญาเลิศ',
        nickname: 'พร',
        gender: 'ชาย',
        position: 'ผู้อำนวยการโรงเรียนดัดดรุณี',
        academicRank: 'เชี่ยวชาญพิเศษ',
        department: { nameTh: 'สำนักงานผู้อำนวยการ', code: 'DIR' },
        dateOfBirth: new Date('1980-08-12'),
        phone: '081-234-5678',
        email: 'director@datdaruni.ac.th',
        isExecutive: true,
      },
      {
        id: 's2',
        employeeId: 'DDN002',
        prefix: 'นาง',
        firstName: 'กัญญาภัทร',
        lastName: 'วรกิจเจริญ',
        nickname: 'กัญญา',
        gender: 'หญิง',
        position: 'รองผู้อำนวยการกลุ่มบริหารวิชาการ',
        academicRank: 'ชำนาญการพิเศษ',
        department: { nameTh: 'กลุ่มบริหารวิชาการ', code: 'ACAD' },
        dateOfBirth: new Date('1984-03-25'),
        phone: '082-345-6789',
        email: 'academic@datdaruni.ac.th',
        isExecutive: true,
      },
      {
        id: 's3',
        employeeId: 'DDN003',
        prefix: 'นาย',
        firstName: 'ชาญณรงค์',
        lastName: 'ปรีชาญชัย',
        nickname: 'ณรงค์',
        gender: 'ชาย',
        position: 'หัวหน้ากลุ่มสาระฯ วิทยาศาสตร์และเทคโนโลยี',
        academicRank: 'ชำนาญการพิเศษ',
        department: { nameTh: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี', code: 'SCI' },
        dateOfBirth: new Date('1988-11-04'),
        phone: '083-456-7890',
        email: 'science@datdaruni.ac.th',
        isExecutive: false,
      },
      {
        id: 's4',
        employeeId: 'DDN004',
        prefix: 'นางสาว',
        firstName: 'สุดารัตน์',
        lastName: 'เจริญสุข',
        nickname: 'ดา',
        gender: 'หญิง',
        position: 'หัวหน้ากลุ่มสาระฯ คณิตศาสตร์',
        academicRank: 'ชำนาญการ',
        department: { nameTh: 'กลุ่มสาระการเรียนรู้คณิตศาสตร์', code: 'MATH' },
        dateOfBirth: new Date('1992-05-18'),
        phone: '084-567-8901',
        email: 'math@datdaruni.ac.th',
        isExecutive: false,
      },
      {
        id: 's5',
        employeeId: 'DDN005',
        prefix: 'นาย',
        firstName: 'ประยุทธ',
        lastName: 'มณีรัตน์',
        nickname: 'ยุทธ',
        gender: 'ชาย',
        position: 'รองผู้อำนวยการกลุ่มบริหารทั่วไป',
        academicRank: 'ชำนาญการพิเศษ',
        department: { nameTh: 'กลุ่มบริหารทั่วไปและอาคารสถานที่', code: 'GEN' },
        dateOfBirth: new Date('1982-09-12'),
        phone: '085-678-9012',
        email: 'general@datdaruni.ac.th',
        isExecutive: true,
      },
    ];
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            ทำเนียบคณาจารย์และบุคลากร
          </h2>
          <p className="text-xs text-slate-500">
            ระบบบริหารจัดการข้อมูลครู คำนวณอายุอัตโนมัติจากวันเดือนปีเกิด (รวมทั้งหมด {staffList.length} ท่าน)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/staff/history"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-xs transition-colors"
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span>ประวัติการนำเข้า</span>
          </Link>
          <Link
            href="/admin/staff/import"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>นำเข้าจาก Excel</span>
          </Link>
          <Link
            href="/admin/profile"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:opacity-90 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all active:scale-98"
          >
            <Edit className="w-4 h-4" />
            <span>แก้ไขโปรไฟล์ของฉัน</span>
          </Link>
        </div>
      </div>

      {/* Staff Directory Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-sm font-bold text-slate-800">
            รายชื่อบุคลากรทั้งหมด
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>อายุคำนวณแบบ Real-time ตามวันปัจจุบัน</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <th className="py-3.5 px-4 sm:px-6">บุคลากร</th>
                <th className="py-3.5 px-4">ตำแหน่ง / วิทยฐานะ</th>
                <th className="py-3.5 px-4">แผนก / กลุ่มสาระ</th>
                <th className="py-3.5 px-4">วันเกิด & อายุจริง</th>
                <th className="py-3.5 px-4">การติดต่อ</th>
                <th className="py-3.5 px-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staffList.map((staff) => {
                const age = calculateAge(staff.dateOfBirth);
                const bStatus = getBirthdayStatus(staff.dateOfBirth);

                return (
                  <tr key={staff.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Person */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-100 to-pink-100 text-blue-800 flex items-center justify-center font-bold text-sm shrink-0 border border-slate-200">
                          {staff.firstName.slice(0, 1)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-sm">
                              {staff.prefix}{staff.firstName} {staff.lastName}
                            </span>
                            {staff.isExecutive && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                ผู้บริหาร
                              </span>
                            )}
                          </div>
                          {staff.nickname && (
                            <span className="text-[11px] text-slate-500">
                              (ครู{staff.nickname})
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Position */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-800">{staff.position || 'ครูผู้สอน'}</div>
                      <div className="text-[11px] text-slate-500">{staff.academicRank || '-'}</div>
                    </td>

                    {/* Department */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-blue-50/80 text-blue-800 font-semibold border border-blue-100">
                        {staff.department?.nameTh || 'ยังไม่สังกัดแผนก'}
                      </span>
                    </td>

                    {/* Birthday & Age */}
                    <td className="py-4 px-4">
                      {staff.dateOfBirth ? (
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-800">
                              {age ? age.formattedText : '-'}
                            </span>
                            {bStatus?.isToday && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-pink-500 text-white animate-pulse">
                                วันเกิดวันนี้!
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Cake className="w-3 h-3 text-pink-500" />
                            <span>{formatThaiDate(staff.dateOfBirth, false)}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400">ยังไม่ระบุ</span>
                      )}
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-4">
                      <div className="space-y-0.5 text-slate-600">
                        {staff.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{staff.phone}</span>
                          </div>
                        )}
                        {staff.email && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-500">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span className="truncate max-w-[140px]">{staff.email}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/admin/profile?id=${staff.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                        <span>แก้ไข</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
