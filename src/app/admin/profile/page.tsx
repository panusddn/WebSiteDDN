'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { calculateAge, getBirthdayStatus, formatThaiDate } from '@/lib/age';
import {
  UserCheck,
  Calendar,
  Save,
  Cake,
  Shield,
  EyeOff,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Camera,
  ArrowLeft
} from 'lucide-react';

export default function StaffProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [departments, setDepartments] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    id: '',
    prefix: 'ครู',
    firstName: '',
    lastName: '',
    nickname: '',
    gender: 'หญิง',
    position: 'ครูผู้สอน',
    academicRank: 'ชำนาญการ',
    departmentId: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    bio: '',
    hideAgePublic: false,
    hideBirthday: false,
  });

  // Calculate dynamic age on the fly whenever dateOfBirth changes
  const dynamicAge = calculateAge(formData.dateOfBirth);
  const bdayStatus = getBirthdayStatus(formData.dateOfBirth);

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch departments and staff list
        const [dRes, sRes] = await Promise.all([
          fetch('/api/departments'),
          fetch('/api/staff/list'),
        ]);

        const dJson = await dRes.json();
        const sJson = await sRes.json();

        setDepartments(dJson.data || []);

        if (sJson.data && sJson.data.length > 0) {
          const s = sJson.data[0]; // Load first staff for demonstration/self-service
          setFormData({
            id: s.id,
            prefix: s.prefix || 'ครู',
            firstName: s.firstName || '',
            lastName: s.lastName || '',
            nickname: s.nickname || '',
            gender: s.gender || 'หญิง',
            position: s.position || 'ครูผู้สอน',
            academicRank: s.academicRank || '',
            departmentId: s.departmentId || '',
            dateOfBirth: s.dateOfBirth ? s.dateOfBirth.split('T')[0] : '',
            phone: s.phone || '',
            email: s.email || '',
            bio: s.bio || '',
            hideAgePublic: Boolean(s.hideAgePublic),
            hideBirthday: Boolean(s.hideBirthday),
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/staff/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'บันทึกข้อมูลไม่สำเร็จ');

      setSuccessMsg('บันทึกการแก้ไขข้อมูลโปรไฟล์เรียบร้อยแล้ว');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-500 gap-2">
        <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
        <span>กำลังโหลดข้อมูลโปรไฟล์...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin/staff" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>กลับสู่ทำเนียบบุคลากร</span>
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            โปรไฟล์ของฉัน (Self-Service Profile)
          </h2>
          <p className="text-xs text-slate-500">
            แก้ไขรูปถ่าย ข้อมูลส่วนตัว และวันเดือนปีเกิด พร้อมคำนวณอายุอัตโนมัติตาม Spec 6A
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-xs text-rose-800">
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Avatar & Dynamic Age Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-pink-500 p-1 shadow-md">
              <div className="w-full h-full bg-slate-100 rounded-[20px] flex items-center justify-center text-3xl font-black text-blue-800">
                {formData.firstName ? formData.firstName.slice(0, 1) : 'ด'}
              </div>
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 p-2 rounded-xl bg-slate-900 text-white hover:bg-blue-600 shadow-md transition-colors"
              title="เปลี่ยนรูปถ่าย"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <h3 className="text-xl font-extrabold text-slate-900">
              {formData.prefix}{formData.firstName} {formData.lastName}
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              {formData.position} • {formData.academicRank || 'ข้าราชการครู'}
            </p>

            {/* Dynamic Realtime Age Calculation Widget */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold">
                <Cake className="w-4 h-4 text-pink-500" />
                <span>อายุคำนวณอัตโนมัติ: {dynamicAge ? dynamicAge.formattedText : 'ยังไม่ได้ระบุวันเกิด'}</span>
              </div>
              {bdayStatus?.isToday && (
                <span className="px-2.5 py-1 rounded-xl bg-pink-500 text-white text-xs font-bold animate-pulse">
                  🎉 สุขสันต์วันเกิดวันนี้!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
            ข้อมูลส่วนตัวและการปฏิบัติงาน
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">คำนำหน้าชื่อ</label>
              <input
                type="text"
                name="prefix"
                value={formData.prefix}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="เช่น นาย, นาง, ดร., ว่าที่ ร.ต."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อจริง *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">นามสกุล *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อเล่น</label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="เช่น ครูพร"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">เพศ</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                วันเดือนปีเกิด (ค.ศ.) *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-pink-300 bg-pink-50/30 text-xs focus:outline-hidden focus:ring-2 focus:ring-pink-500 font-semibold"
              />
              <span className="text-[10px] text-pink-600 font-medium mt-1 block">
                ระบบจะคำนวณอายุและแสดงการ์ดวันเกิดให้อัตโนมัติ
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">แผนก / กลุ่มสาระการเรียนรู้</label>
              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="">-- เลือกแผนก --</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nameTh}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ตำแหน่งงาน</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="เช่น ครูชำนาญการพิเศษ, หัวหน้ากลุ่มสาระ"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">เบอร์โทรศัพท์ติดต่อ</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="08x-xxx-xxxx"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">อีเมลทางการ</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="name@datdaruni.ac.th"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">แนะนำตัว / ประวัติย่อ</label>
            <textarea
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              placeholder="ความเชี่ยวชาญ คติพจน์ หรือประวัติการศึกษา..."
            />
          </div>

          {/* Privacy Controls (Section 6A & 13A) */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>การตั้งค่าความเป็นส่วนตัว (Privacy Controls)</span>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="hideAgePublic"
                  checked={formData.hideAgePublic}
                  onChange={handleChange}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>ซ่อนอายุจริงบนหน้าเว็บไซต์สาธารณะ (แสดงเฉพาะตำแหน่งและผลงาน)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="hideBirthday"
                  checked={formData.hideBirthday}
                  onChange={handleChange}
                  className="rounded text-pink-600 focus:ring-pink-500 w-4 h-4"
                />
                <span>ไม่ประสงค์แสดงในวิดเจ็ตอวยพรวันเกิดประจำสัปดาห์</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/staff"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
          >
            ยกเลิก
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:opacity-90 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all active:scale-98"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>กำลังบันทึก...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>บันทึกข้อมูลโปรไฟล์</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
