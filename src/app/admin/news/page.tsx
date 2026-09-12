import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { formatThaiDate } from '@/lib/age';
import {
  Newspaper,
  Plus,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  Archive,
  Layers,
  Sparkles,
  FolderSync
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminNewsPage() {
  let newsList: any[] = [];
  let departments: any[] = [];
  let templates: any[] = [];

  try {
    const [n, d, t] = await Promise.all([
      prisma.news.findMany({
        include: {
          department: true,
          author: true,
          template: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.department.findMany(),
      prisma.newsTemplate.findMany(),
    ]);
    newsList = n;
    departments = d;
    templates = t;
  } catch (err) {
    console.warn('Database error in AdminNewsPage, using fallback data:', err);
  }

  if (newsList.length === 0) {
    newsList = [
      {
        id: 'news-1',
        title: 'พิธีมอบเกียรติบัตรและรางวัลดีเด่นแก่นักเรียนผู้สร้างชื่อเสียงระดับประเทศ',
        slug: 'award-ceremony-2569',
        summary: 'โรงเรียนดัดดรุณีจัดพิธีมอบเกียรติบัตรเชิดชูเกียรตินักเรียนที่มีผลงานวิชาการและนวัตกรรมดีเด่น',
        content: 'โรงเรียนดัดดรุณีจัดพิธีมอบเกียรติบัตรเชิดชูเกียรตินักเรียนที่มีผลงานวิชาการและนวัตกรรมดีเด่น ประจำปีการศึกษา 2569 ณ หอประชุมใหญ่ โดยมี ดร.สมพร ปัญญาเลิศ ผู้อำนวยการโรงเรียน เป็นประธานในพิธี...',
        status: 'PUBLISHED',
        category: 'วิชาการ',
        department: { nameTh: 'กลุ่มบริหารวิชาการ', code: 'ACAD' },
        author: { name: 'งานประชาสัมพันธ์' },
        template: { name: 'Standard News' },
        publishedAt: new Date('2026-05-18'),
        createdAt: new Date('2026-05-18'),
      },
      {
        id: 'news-2',
        title: 'ประกาศผลการแข่งขันโครงงานวิทยาศาสตร์และนวัตกรรม AI ระดับชาติ',
        slug: 'ai-robotics-competition-winner',
        summary: 'ทีมนักเรียนโรงเรียนดัดดรุณีคว้ารางวัลชนะเลิศอันดับ 1 ในการแข่งขันโครงงานปัญญาประดิษฐ์',
        content: 'ขอแสดงความยินดีกับทีมนักเรียนแผนการเรียนวิทยาศาสตร์-คอมพิวเตอร์ โรงเรียนดัดดรุณี ที่ได้รับรางวัลชนะเลิศอันดับที่ 1 จากการนำเสนอโครงงาน AI เพื่อการคัดแยกขยะอัตโนมัติ...',
        status: 'PUBLISHED',
        category: 'ผลงานนักเรียน',
        department: { nameTh: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี', code: 'SCI' },
        author: { name: 'ครูชาญณรงค์ ปรีชาญชัย' },
        template: { name: 'Standard News' },
        publishedAt: new Date('2026-05-12'),
        createdAt: new Date('2026-05-12'),
      },
      {
        id: 'news-3',
        title: 'กำหนดการประชุมผู้ปกครองภาคเรียนที่ 1 ปีการศึกษา 2569',
        slug: 'parent-meeting-term1-2569',
        summary: 'ขอเชิญผู้ปกครองนักเรียนทุกระดับชั้นเข้าร่วมการประชุมเพื่อสร้างความเข้าใจและร่วมมือพัฒนาผู้เรียน',
        content: 'โรงเรียนดัดดรุณีขอเรียนเชิญผู้ปกครองนักเรียนระดับชั้น ม.1 - ม.6 เข้าร่วมการประชุมผู้ปกครองภาคเรียนที่ 1 ปีการศึกษา 2569 เพื่อรับทราบนโยบายการจัดการศึกษาและพบปะครูที่ปรึกษา...',
        status: 'PUBLISHED',
        category: 'ประชาสัมพันธ์',
        department: { nameTh: 'สำนักงานผู้อำนวยการ', code: 'DIR' },
        author: { name: 'ฝ่ายบริหารงานทั่วไป' },
        template: { name: 'Formal Document' },
        publishedAt: new Date('2026-05-08'),
        createdAt: new Date('2026-05-08'),
      },
      {
        id: 'news-4',
        title: 'โครงการอบรมเชิงปฏิบัติการพัฒนาทักษะดิจิทัลและ AI สำหรับคณาจารย์',
        slug: 'teacher-digital-skills-workshop',
        summary: 'เสริมศักยภาพครูยุคดิจิทัลด้วยการประยุกต์ใช้ Generative AI ในการออกแบบการเรียนการสอน',
        content: 'กลุ่มบริหารงานบุคคล ร่วมกับกลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี จัดการอบรมเชิงปฏิบัติการให้แก่คณะครู เพื่อพัฒนาทักษะการใช้เครื่องมือ AI สำหรับการจัดการเรียนรู้ในศตวรรษที่ 21...',
        status: 'DRAFT',
        category: 'อบรมพัฒนา',
        department: { nameTh: 'ฝ่ายบริหารงานบุคคล', code: 'HR' },
        author: { name: 'ครูกัญญาภัทร วรกิจเจริญ' },
        template: { name: 'Standard News' },
        publishedAt: null,
        createdAt: new Date('2026-05-05'),
      },
    ];
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            จัดการข่าวและประกาศ (News & Announcements CMS)
          </h2>
          <p className="text-xs text-slate-500">
            ระบบเผยแพร่ข่าวสารตามหน่วยงาน พร้อม News Template Gallery และ Google Drive Integration
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/news/drive"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-xs transition-colors"
          >
            <FolderSync className="w-4 h-4 text-blue-600" />
            <span>Google Drive Integration</span>
          </Link>
          <Link
            href="/admin/news/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-pink-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>สร้างข่าว/ประกาศใหม่</span>
          </Link>
        </div>
      </div>

      {/* News List Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="text-sm font-bold text-slate-800">
            รายการข่าวและประกาศทั้งหมด ({newsList.length} รายการ)
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <th className="py-3.5 px-4 sm:px-6">หัวข้อข่าว</th>
                <th className="py-3.5 px-4">แผนกเจ้าของเรื่อง</th>
                <th className="py-3.5 px-4">เทมเพลต</th>
                <th className="py-3.5 px-4">สถานะ</th>
                <th className="py-3.5 px-4">ผู้เขียน / วันที่</th>
                <th className="py-3.5 px-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {newsList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 sm:px-6 max-w-sm">
                    <div className="font-bold text-slate-900 text-sm line-clamp-1">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {item.summary || item.content.slice(0, 80)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-semibold border border-blue-100">
                      {item.department?.nameTh || 'ส่วนกลาง'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-600 font-medium">
                      {item.template?.name || 'มาตรฐาน'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {item.status === 'PUBLISHED' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle className="w-3 h-3" />
                        <span>เผยแพร่อยู่</span>
                      </span>
                    )}
                    {item.status === 'DRAFT' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                        <Clock className="w-3 h-3" />
                        <span>แบบร่าง</span>
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-slate-800 font-medium">{item.author.name}</div>
                    <div className="text-[11px] text-slate-400">
                      {formatThaiDate(item.publishedAt || item.createdAt)}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/news/${item.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100"
                        title="ดูบนเว็บ"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
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
