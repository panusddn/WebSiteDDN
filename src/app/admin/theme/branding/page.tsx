'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Palette,
  Image as ImageIcon,
  Save,
  CheckCircle2,
  UploadCloud,
  Globe,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export default function AdminBrandingPage() {
  const [saved, setSaved] = useState(false);
  const [branding, setBranding] = useState({
    schoolTitle: 'โรงเรียนดัดดรุณี | Datdaruni School',
    tagline: 'มุ่งมั่นพัฒนาศักยภาพผู้เรียน สู่ความเป็นเลิศและก้าวทันยุคดิจิทัล',
    shortName: 'ด.ด.',
    primaryColor: '#1265F3',
    accentColor: '#FF4F9A',
    navyColor: '#07182F',
    logoUrl: '/favicon.ico',
    faviconUrl: '/favicon.ico',
    footerCopyright: '© 2026 โรงเรียนดัดดรุณี (Datdaruni School). สงวนลิขสิทธิ์ทุกประการ',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/theme"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>กลับสู่จัดการธีม</span>
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Palette className="w-6 h-6 text-pink-600" />
            <span>อัตลักษณ์และแบรนดิ้งสถานศึกษา (Branding & Identity)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            กำหนดตราสัญลักษณ์ ข้อความสโลแกน และโทนสีหลักของโรงเรียน
          </p>
        </div>
        {saved && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>บันทึกอัตลักษณ์เรียบร้อย</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Logos & Favicon */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">ตราประจำโรงเรียน และ Favicon</h3>
              <p className="text-xs text-slate-400">ภาพสัญลักษณ์สำหรับแสดงในแถบนำทาง (Navbar) และเบราว์เซอร์แท็บ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-pink-500 p-0.5 shadow-md flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-pink-400 text-lg">
                  ด.ด.
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800">ตราสัญลักษณ์โรงเรียน (Badge)</div>
                <div className="text-[11px] text-slate-500">รองรับ SVG, PNG ขนาดแนะนำ 512x512 px</div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
                  <span>เปลี่ยนรูปสัญลักษณ์</span>
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                  DDN
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800">ไอคอนแท็บเบราว์เซอร์ (Favicon)</div>
                <div className="text-[11px] text-slate-500">แสดงผลบนแท็บบนสุดของ Web Browser (.ico, .png)</div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-pink-600" />
                  <span>เปลี่ยน Favicon</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Colors */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">โทนสีอัตลักษณ์ (Brand Palette)</h3>
              <p className="text-xs text-slate-400">Cyber Blue, Vivid Pink และ Deep Navy ตามข้อกำหนดดีไซน์</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="h-14 rounded-xl bg-[#1265F3] flex items-center justify-center text-white font-bold shadow-xs">
                #1265F3
              </div>
              <div>
                <div className="font-bold text-slate-800">Primary Blue (น้ำเงินดัดดรุณี)</div>
                <div className="text-[11px] text-slate-500">สีหลักสำหรับปุ่ม ลิงก์ และหัวข้อ</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="h-14 rounded-xl bg-[#FF4F9A] flex items-center justify-center text-white font-bold shadow-xs">
                #FF4F9A
              </div>
              <div>
                <div className="font-bold text-slate-800">Vivid Pink (ชมพูดัดดรุณี)</div>
                <div className="text-[11px] text-slate-500">สีไฮไลต์ แบดจ์ และเอฟเฟกต์สีสด</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="h-14 rounded-xl bg-[#07182F] flex items-center justify-center text-white font-bold shadow-xs">
                #07182F
              </div>
              <div>
                <div className="font-bold text-slate-800">Deep Navy (กรมท่าดัดดรุณี)</div>
                <div className="text-[11px] text-slate-500">สีพื้นหลัง Footer และแผง Sidebar</div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:opacity-95 transition-opacity cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>บันทึกการตั้งค่าอัตลักษณ์</span>
          </button>
        </div>
      </form>
    </div>
  );
}
