import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Video, QrCode } from 'lucide-react';

interface FooterProps {
  schoolName?: string;
  contactAddress?: string;
  contactPhone?: string;
  contactEmail?: string;
  footerText?: string;
}

export default function PublicFooter({
  schoolName = 'โรงเรียนดัดดรุณี',
  contactAddress = '123 หมู่ 1 ต.หน้าเมือง อ.เมือง จ.ฉะเชิงเทรา 24000',
  contactPhone = '038-511-011',
  contactEmail = 'school@datdaruni.ac.th',
  footerText = '© 2026 โรงเรียนดัดดรุณี. All Rights Reserved.',
}: FooterProps) {
  return (
    <footer className="bg-[#06152E] text-slate-300 pt-16 pb-10 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80 text-xs">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-500 p-0.5 flex items-center justify-center shrink-0 shadow-md">
                <div className="w-full h-full bg-[#0B0F19] rounded-[14px] flex items-center justify-center font-bold text-pink-400 text-sm">
                  ด.ด.
                </div>
              </div>
              <div>
                <span className="text-base font-extrabold text-white tracking-tight block">
                  {schoolName}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  DATDARUNI SCHOOL
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed pt-2">
              เรียนรู้ สร้างสรรค์ ก้าวทันอนาคต
            </p>
          </div>

          {/* Col 2: School Info */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">
              ข้อมูลโรงเรียน
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>{contactAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Website Menu */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">
              เมนูเว็บไซต์
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <Link href="/" className="hover:text-pink-400 transition-colors">
                  • หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-pink-400 transition-colors">
                  • เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/#curriculum" className="hover:text-pink-400 transition-colors">
                  • หลักสูตร
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-pink-400 transition-colors">
                  • ข่าวสาร
                </Link>
              </li>
              <li>
                <Link href="/staff" className="hover:text-pink-400 transition-colors">
                  • บุคลากร
                </Link>
              </li>
              <li>
                <Link href="/#achievements" className="hover:text-pink-400 transition-colors">
                  • ผลงานนักเรียน
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pink-400 transition-colors">
                  • ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Online Systems */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">
              ระบบออนไลน์
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <Link href="/admin/dashboard" className="hover:text-blue-400 transition-colors">
                  • ระบบนักเรียน
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-blue-400 transition-colors">
                  • ระบบครู
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-blue-400 transition-colors">
                  • ระบบผู้ปกครอง
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-pink-400 transition-colors">
                  • ดาวน์โหลดเอกสาร
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-blue-400 transition-colors">
                  • ปฏิทินกิจกรรม
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Social & QR Code */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">
              ติดตามเรา
            </h4>
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-blue-600 hover:opacity-90 flex items-center justify-center text-white font-bold text-xs"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-red-600 hover:opacity-90 flex items-center justify-center text-white"
                title="YouTube"
              >
                <Video className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:opacity-90 flex items-center justify-center text-white font-bold text-xs"
                title="TikTok"
              >
                ♪
              </a>
              <a
                href="https://line.me"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-500 hover:opacity-90 flex items-center justify-center text-white font-bold text-xs"
                title="LINE"
              >
                L
              </a>
            </div>

            {/* QR Code Card */}
            <div className="pt-2 flex items-center gap-3">
              <div className="w-16 h-16 bg-white rounded-xl p-1 shadow-md flex items-center justify-center shrink-0">
                <QrCode className="w-14 h-14 text-slate-900" />
              </div>
              <span className="text-[10px] text-slate-400 leading-tight">
                สแกนเพื่อติดตามเราผ่าน LINE Official
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{footerText}</p>
          <p className="text-slate-400 font-medium">
            Future Ready Education • Learn • Create • Innovate
          </p>
        </div>
      </div>
    </footer>
  );
}
