import React from 'react';
import prisma from '@/lib/prisma';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';
import { formatThaiDate } from '@/lib/age';
import { FileText, Download, Search, Folder } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PublicDocumentsPage() {
  let branding: any = null;
  let documents: any[] = [];
  let categories: any[] = [];

  try {
    const [b, d, c] = await Promise.all([
      prisma.brandingSetting.findFirst(),
      prisma.document.findMany({
        where: { isPublic: true },
        include: { category: true, department: true },
        orderBy: { downloadCount: 'desc' },
      }),
      prisma.documentCategory.findMany(),
    ]);
    branding = b;
    documents = d;
    categories = c;
  } catch (err) {
    console.warn('Database not reachable in Documents, using fallback data:', err);
  }

  // Fallback documents list
  if (documents.length === 0) {
    documents = [
      {
        id: 'doc-1',
        title: 'คู่มือนักเรียนและผู้ปกครอง ประจำปีการศึกษา 2569',
        category: { name: 'คู่มือ / ระเบียบการ' },
        department: { name: 'ฝ่ายบริหารงานวิชาการ' },
        fileSize: '4.8 MB',
        fileType: 'PDF',
        fileUrl: '#',
        downloadCount: 1540,
        createdAt: new Date('2026-05-01'),
      },
      {
        id: 'doc-2',
        title: 'แบบคำร้องขอหนังสือรับรองการเป็นนักเรียน (ปพ.7)',
        category: { name: 'แบบฟอร์มคำร้อง' },
        department: { name: 'งานทะเบียนและวัดผล' },
        fileSize: '320 KB',
        fileType: 'PDF',
        fileUrl: '#',
        downloadCount: 980,
        createdAt: new Date('2026-05-05'),
      },
      {
        id: 'doc-3',
        title: 'ปฏิทินปฏิบัติงานวิชาการและกำหนดการสอบ ประจำปีการศึกษา 2569',
        category: { name: 'วิชาการ' },
        department: { name: 'ฝ่ายบริหารงานวิชาการ' },
        fileSize: '1.2 MB',
        fileType: 'PDF',
        fileUrl: '#',
        downloadCount: 840,
        createdAt: new Date('2026-04-20'),
      },
    ];
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar
        schoolName={branding?.schoolName}
        shortName={branding?.shortName}
        tagline={branding?.schoolNameEn}
      />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8 w-full">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            Document Center
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">
            ศูนย์เอกสารและแบบฟอร์มดาวน์โหลด
          </h1>
          <p className="text-xs text-slate-500">
            รวมแบบคำร้อง คู่มือนักเรียน ประกาศ และเอกสารทางวิชาการ
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <th className="py-3.5 px-4 sm:px-6">เอกสาร</th>
                  <th className="py-3.5 px-4">หมวดหมู่</th>
                  <th className="py-3.5 px-4">หน่วยงาน</th>
                  <th className="py-3.5 px-4">ยอดดาวน์โหลด</th>
                  <th className="py-3.5 px-4 text-right">ดาวน์โหลดไฟล์</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{doc.title}</div>
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
                    <td className="py-4 px-4 text-right">
                      <a
                        href={doc.fileUrl}
                        download
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold transition-colors shadow-xs"
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
