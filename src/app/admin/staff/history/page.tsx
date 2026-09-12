'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Download,
  AlertCircle
} from 'lucide-react';

export default function AdminStaffImportHistoryPage() {
  const historyList = [
    {
      id: 'imp-1',
      fileName: 'Staff_List_Term1_2569.xlsx',
      importedAt: 'วันนี้, 18:30 น.',
      importedBy: 'ผู้ดูแลระบบสูงสุด',
      totalRows: 128,
      successRows: 128,
      failedRows: 0,
      status: 'SUCCESS',
    },
    {
      id: 'imp-2',
      fileName: 'Teacher_Transfer_In_May2569.xlsx',
      importedAt: '05 พ.ค. 2569, 11:20 น.',
      importedBy: 'นางกัญญาภัทร วรกิจเจริญ',
      totalRows: 12,
      successRows: 12,
      failedRows: 0,
      status: 'SUCCESS',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/staff"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>กลับสู่ทำเนียบบุคลากร</span>
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
            <span>ประวัติการนำเข้าข้อมูลบุคลากร (Excel Import History)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            บันทึกประวัติการอัปโหลดไฟล์ Excel บัญชีรายชื่อครูและบุคลากรเข้าสู่ระบบ
          </p>
        </div>

        <Link
          href="/admin/staff/import"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-colors"
        >
          <span>นำเข้าไฟล์ใหม่</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold">
                <th className="py-3.5 px-6">ชื่อไฟล์ที่นำเข้า</th>
                <th className="py-3.5 px-6">ผู้นำเข้า</th>
                <th className="py-3.5 px-6">วันและเวลา</th>
                <th className="py-3.5 px-6 text-center">จำนวนข้อมูล</th>
                <th className="py-3.5 px-6 text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {historyList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{item.fileName}</div>
                        <div className="text-[11px] text-slate-400">Import Batch: {item.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.importedBy}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.importedAt}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="font-bold text-slate-800">{item.successRows}</span>
                    <span className="text-slate-400"> / {item.totalRows} รายการ</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>สำเร็จ</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
