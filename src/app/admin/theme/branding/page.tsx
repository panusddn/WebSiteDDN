'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Palette,
  Image as ImageIcon,
  Save,
  CheckCircle2,
  UploadCloud,
  Globe,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Eye
} from 'lucide-react';

export default function AdminBrandingPage() {
  const [saved, setSaved] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  const [branding, setBranding] = useState({
    schoolTitle: 'โรงเรียนดัดดรุณี | Datdaruni School',
    tagline: 'มุ่งมั่นพัฒนาศักยภาพผู้เรียน สู่ความเป็นเลิศและก้าวทันยุคดิจิทัล',
    shortName: 'ด.ด.',
    primaryColor: '#1265F3',
    accentColor: '#FF4F9A',
    navyColor: '#07182F',
    footerCopyright: '© 2026 โรงเรียนดัดดรุณี (Datdaruni School). สงวนลิขสิทธิ์ทุกประการ',
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFaviconPreview(url);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={logoInputRef}
        onChange={handleLogoUpload}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={faviconInputRef}
        onChange={handleFaviconUpload}
        accept="image/*,.ico"
        className="hidden"
      />

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
            <span>บันทึกอัตลักษณ์เรียบร้อยแล้ว</span>
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
              <div
                className="w-16 h-16 rounded-2xl p-0.5 shadow-md flex items-center justify-center shrink-0 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.accentColor})`,
                }}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="w-full h-full object-cover rounded-[14px]" />
                ) : (
                  <div
                    className="w-full h-full rounded-[14px] flex items-center justify-center font-black text-lg"
                    style={{ backgroundColor: branding.navyColor, color: branding.accentColor }}
                  >
                    {branding.shortName}
                  </div>
                )}
              </div>
              <div className="space-y-2 flex-1">
                <div className="text-xs font-bold text-slate-800">ตราสัญลักษณ์โรงเรียน (Badge)</div>
                <div className="text-[11px] text-slate-500">รองรับ SVG, PNG ขนาดแนะนำ 512x512 px</div>
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-xs cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
                  <span>{logoPreview ? 'เปลี่ยนรูปใหม่' : 'อัปโหลดรูปสัญลักษณ์'}</span>
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                {faviconPreview ? (
                  <img src={faviconPreview} alt="Favicon" className="w-10 h-10 object-contain" />
                ) : (
                  <div
                    className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-black text-xs shadow-xs"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    DDN
                  </div>
                )}
              </div>
              <div className="space-y-2 flex-1">
                <div className="text-xs font-bold text-slate-800">ไอคอนแท็บเบราว์เซอร์ (Favicon)</div>
                <div className="text-[11px] text-slate-500">แสดงผลบนแท็บบนสุดของ Web Browser (.ico, .png)</div>
                <button
                  type="button"
                  onClick={() => faviconInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-xs cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-pink-600" />
                  <span>{faviconPreview ? 'เปลี่ยน Favicon ใหม่' : 'อัปโหลด Favicon'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Text & Slogans */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">ชื่อและสโลแกนสถานศึกษา</h3>
              <p className="text-xs text-slate-400">ข้อความหัวเรื่องเว็บไซต์และคำขวัญประจำโรงเรียน</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">ชื่อหัวเรื่องเว็บไซต์ (Website Title)</label>
              <input
                type="text"
                value={branding.schoolTitle}
                onChange={(e) => setBranding({ ...branding, schoolTitle: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">อักษรย่อโรงเรียน (Short Name)</label>
              <input
                type="text"
                value={branding.shortName}
                onChange={(e) => setBranding({ ...branding, shortName: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="font-bold text-slate-700">สโลแกน / ปรัชญาประจำโรงเรียน (Tagline)</label>
              <input
                type="text"
                value={branding.tagline}
                onChange={(e) => setBranding({ ...branding, tagline: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              />
            </div>
          </div>
        </div>

        {/* Brand Colors with Interactive Pickers */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">โทนสีอัตลักษณ์ (คลิกเลือกสีหรือแก้ไขรหัส HEX ได้)</h3>
              <p className="text-xs text-slate-400">Cyber Blue, Vivid Pink และ Deep Navy ตามข้อกำหนดดีไซน์</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Primary Blue */}
            <div className="p-4 rounded-2xl border border-slate-200 space-y-3 bg-slate-50/50">
              <div
                className="h-16 rounded-xl flex items-center justify-center text-white font-bold shadow-xs transition-colors cursor-pointer relative overflow-hidden group"
                style={{ backgroundColor: branding.primaryColor }}
              >
                <input
                  type="color"
                  value={branding.primaryColor}
                  onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  title="คลิกเพื่อเลือกสี"
                />
                <span className="font-mono bg-black/25 px-2.5 py-1 rounded-md text-xs group-hover:scale-105 transition-transform">
                  {branding.primaryColor}
                </span>
              </div>
              <div className="space-y-1">
                <div className="font-bold text-slate-800">Primary Blue (น้ำเงินดัดดรุณี)</div>
                <div className="text-[11px] text-slate-500">สีหลักสำหรับปุ่ม ลิงก์ และหัวข้อ</div>
                <input
                  type="text"
                  value={branding.primaryColor}
                  onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                  className="w-full p-2 mt-1 rounded-lg border border-slate-200 bg-white font-mono text-center font-bold"
                />
              </div>
            </div>

            {/* Vivid Pink */}
            <div className="p-4 rounded-2xl border border-slate-200 space-y-3 bg-slate-50/50">
              <div
                className="h-16 rounded-xl flex items-center justify-center text-white font-bold shadow-xs transition-colors cursor-pointer relative overflow-hidden group"
                style={{ backgroundColor: branding.accentColor }}
              >
                <input
                  type="color"
                  value={branding.accentColor}
                  onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  title="คลิกเพื่อเลือกสี"
                />
                <span className="font-mono bg-black/25 px-2.5 py-1 rounded-md text-xs group-hover:scale-105 transition-transform">
                  {branding.accentColor}
                </span>
              </div>
              <div className="space-y-1">
                <div className="font-bold text-slate-800">Vivid Pink (ชมพูดัดดรุณี)</div>
                <div className="text-[11px] text-slate-500">สีไฮไลต์ แบดจ์ และเอฟเฟกต์สีสด</div>
                <input
                  type="text"
                  value={branding.accentColor}
                  onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                  className="w-full p-2 mt-1 rounded-lg border border-slate-200 bg-white font-mono text-center font-bold"
                />
              </div>
            </div>

            {/* Deep Navy */}
            <div className="p-4 rounded-2xl border border-slate-200 space-y-3 bg-slate-50/50">
              <div
                className="h-16 rounded-xl flex items-center justify-center text-white font-bold shadow-xs transition-colors cursor-pointer relative overflow-hidden group"
                style={{ backgroundColor: branding.navyColor }}
              >
                <input
                  type="color"
                  value={branding.navyColor}
                  onChange={(e) => setBranding({ ...branding, navyColor: e.target.value })}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  title="คลิกเพื่อเลือกสี"
                />
                <span className="font-mono bg-white/20 px-2.5 py-1 rounded-md text-xs group-hover:scale-105 transition-transform">
                  {branding.navyColor}
                </span>
              </div>
              <div className="space-y-1">
                <div className="font-bold text-slate-800">Deep Navy (กรมท่าดัดดรุณี)</div>
                <div className="text-[11px] text-slate-500">สีพื้นหลัง Footer และแผง Sidebar</div>
                <input
                  type="text"
                  value={branding.navyColor}
                  onChange={(e) => setBranding({ ...branding, navyColor: e.target.value })}
                  className="w-full p-2 mt-1 rounded-lg border border-slate-200 bg-white font-mono text-center font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
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
