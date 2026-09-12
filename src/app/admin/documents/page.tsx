import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { formatThaiDate } from '@/lib/age';
import { FileText, Download, Plus, Search, Folder, Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDocumentsPage() {
  let documents: any[] = [];
  let categories: any[] = [];

  try {
    const [d, c] = await Promise.all([
      prisma.document.findMany({
        include: { category: true, department: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.documentCategory.findMany(),
    ]);
    documents = d;
    categories = c;
  } catch (err) {
    console.warn('Database error in AdminDocumentsPage, using fallback data:', err);
  }

  if (documents.length === 0) {
    documents = [
      {
        id: 'doc-1',
        title: 'คู่มือนักเรียนและผู้ปกครอง ประจำปีการศึกษา 2569',
        fileName: 'Student_Handbook_2569.pdf',
        fileSize: 3450000,
        downloadCount: 1420,
        publishedAt: new Date('2026-05-10'),
        category: { name: 'คู่มือและระเบียบการ' },
        department: { nameTh: 'กลุ่มบริหารวิชาการ' },
        fileUrl: '#',
      },
      {
        id: 'doc-2',
        title: 'แบบคำร้องขอผ่อนผันการลงทะเบียนเรียนและชำระค่าธรรมเนียม',
        fileName: 'Fee_Deferral_Request_Form.pdf',
        fileSize: 450000,
        downloadCount: 380,
        publishedAt: new Date('2026-05-08'),
        category: { name: 'แบบฟอร์มคำร้อง' },
        department: { nameTh: 'ฝ่ายบริหารงานงบประมาณ' },
        fileUrl: '#',
      },
      {
        id: 'doc-3',
        title: 'หลักสูตรสถานศึกษาและเกณฑ์การวัดและประเมินผลการเรียนรู้',
        fileName: 'School_Curriculum_Evaluation_Guide.pdf',
        fileSize: 5200000,
        downloadCount: 890,
        publishedAt: new Date('2026-05-01'),
        category: { name: 'หลักสูตรการศึกษา' },
        department: { nameTh: 'กลุ่มบริหารวิชาการ' },
        fileUrl: '#',
      },
      {
        id: 'doc-4',
        title: 'แบบฟอร์มขออนุญาตลาหยุดเรียนสำหรับนักเรียน',
        fileName: 'Student_Leave_Request.pdf',
        fileSize: 220000,
        downloadCount: 2150,
        publishedAt: new Date('2026-04-25'),
        category: { name: 'แบบฟอร์มคำร้อง' },
        department: { nameTh: 'กลุ่มบริหารกิจการนักเรียน' },
        fileUrl: '#',
      },
    ];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            ศูนย์เอกสารดาวน์โหลดและแบบฟอร์ม (Document Management)
          </h2>
          <p className="text-xs text-slate-500">
            บริหารจัดการระเบียบการ คู่มือนักเรียน แบบฟอร์มคำร้อง และสถิติการดาวน์โหลด
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <th className="py-3.5 px-4 sm:px-6">ชื่อเอกสาร</th>
                <th className="py-3.5 px-4">หมวดหมู่</th>
                <th className="py-3.5 px-4">หน่วยงาน</th>
                <th className="py-3.5 px-4">ยอดดาวน์โหลด</th>
                <th className="py-3.5 px-4">วันที่เผยแพร่</th>
                <th className="py-3.5 px-4 text-right">ดาวน์โหลด</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{doc.title}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {doc.fileNumber || 'DDN-DOC'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                      {doc.category.name}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-medium">
                    {doc.department?.nameTh || 'ส่วนกลาง'}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-700">
                    {doc.downloadCount.toLocaleString()} ครั้ง
                  </td>
                  <td className="py-4 px-4 text-slate-500">
                    {formatThaiDate(doc.publishedAt)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <a
                      href={doc.fileUrl}
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ดาวน์โหลด</span>
                    </a>
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
