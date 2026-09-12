'use client';

import React, { useState } from 'react';
import {
  Settings,
  School,
  Globe,
  Mail,
  Phone,
  MapPin,
  Save,
  CheckCircle2,
  ShieldCheck,
  Bell,
  Sliders,
  Database,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    schoolNameTh: 'โรงเรียนดัดดรุณี',
    schoolNameEn: 'Datdaruni School',
    schoolAbbr: 'ด.ด.',
    academicYear: '2569',
    currentSemester: '1',
    phone: '038-511-011',
    fax: '038-511-012',
    email: 'info@datdaruni.ac.th',
    address: 'เลขที่ 1 ถนนมหาจักรพรรดิ์ ตำบลหน้าเมือง อำเภอเมืองฉะเชิงเทรา จังหวัดฉะเชิงเทรา 24000',
    websiteTitle: 'โรงเรียนดัดดรุณี | Datdaruni School - สู่ความเป็นเลิศทางวิชาการและดิจิทัล',
    tagline: 'มุ่งมั่นพัฒนาศักยภาพผู้เรียน สู่ความเป็นเลิศและก้าวทันยุคดิจิทัล',
    enableBirthdays: true,
    enableConfetti: true,
    enablePublicRegistration: false,
    maintenanceMode: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-blue-600" />
            <span>ตั้งค่าระบบทั่วไป (General Settings)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            กำหนดข้อมูลพื้นฐานของสถานศึกษา ข้อมูลการติดต่อ และการเปิด-ปิดระบบย่อย
          </p>
        </div>
        {saved && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>บันทึกการตั้งค่าเรียบร้อยแล้ว</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic School Info */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">ข้อมูลพื้นฐานสถานศึกษา</h3>
              <p className="text-xs text-slate-400">ชื่อโรงเรียน ตัวย่อ และปีการศึกษาปัจจุบัน</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">ชื่อโรงเรียน (ภาษาไทย)</label>
              <input
                type="text"
                value={formData.schoolNameTh}
                onChange={(e) => setFormData({ ...formData, schoolNameTh: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">ชื่อโรงเรียน (ภาษาอังกฤษ)</label>
              <input
                type="text"
                value={formData.schoolNameEn}
                onChange={(e) => setFormData({ ...formData, schoolNameEn: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">อักษรย่อ</label>
              <input
                type="text"
                value={formData.schoolAbbr}
                onChange={(e) => setFormData({ ...formData, schoolAbbr: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">ปีการศึกษา</label>
                <input
                  type="text"
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">ภาคเรียนที่</label>
                <select
                  value={formData.currentSemester}
                  onChange={(e) => setFormData({ ...formData, currentSemester: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="ฤดูร้อน">ฤดูร้อน</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">ข้อมูลการติดต่อและที่อยู่</h3>
              <p className="text-xs text-slate-400">ใช้แสดงในส่วนท้ายเว็บไซต์ (Footer) และหน้าติดต่อเรา</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>หมายเลขโทรศัพท์</span>
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>อีเมลกลางสถานศึกษา</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 font-medium"
              />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>ที่อยู่สถานศึกษา</span>
              </label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">ฟังก์ชันและระบบย่อย (Feature Flags)</h3>
              <p className="text-xs text-slate-400">ควบคุมการทำงานของโมดูลเสริมต่างๆ ในระบบ</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <div className="text-xs font-bold text-slate-900">ระบบอวยพรวันเกิดบุคลากรอัตโนมัติ</div>
                <div className="text-[11px] text-slate-500">แจ้งเตือนวันเกิดและแสดงไฮไลต์ในหน้าพอร์ทัล</div>
              </div>
              <input
                type="checkbox"
                checked={formData.enableBirthdays}
                onChange={(e) => setFormData({ ...formData, enableBirthdays: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded-md focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <div className="text-xs font-bold text-slate-900">เอฟเฟกต์พลุกระดาษเฉลิมฉลอง (Confetti Animation)</div>
                <div className="text-[11px] text-slate-500">แสดงผลเมื่อผู้ใช้อวยพรวันเกิดหรือทำรายการสำเร็จ</div>
              </div>
              <input
                type="checkbox"
                checked={formData.enableConfetti}
                onChange={(e) => setFormData({ ...formData, enableConfetti: e.target.checked })}
                className="w-5 h-5 text-pink-600 rounded-md focus:ring-pink-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <div className="text-xs font-bold text-slate-900">โหมดปรับปรุงเว็บไซต์ (Maintenance Mode)</div>
                <div className="text-[11px] text-slate-500">ปิดการเข้าชมหน้าบ้านชั่วคราว ยกเว้นผู้ดูแลระบบ</div>
              </div>
              <input
                type="checkbox"
                checked={formData.maintenanceMode}
                onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                className="w-5 h-5 text-rose-600 rounded-md focus:ring-rose-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:opacity-95 transition-opacity cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>บันทึกการตั้งค่าทั้งหมด</span>
          </button>
        </div>
      </form>
    </div>
  );
}
