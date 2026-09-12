'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Newspaper,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  FolderSync,
  Layers,
  Cloud,
  CheckCircle2,
  RefreshCw,
  FileText
} from 'lucide-react';

export default function CreateNewsPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    departmentId: '',
    templateId: '',
    category: 'วิชาการ',
    contentType: 'NEWS',
    coverImageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
  });

  const [showDrivePickerModal, setShowDrivePickerModal] = useState(false);

  useEffect(() => {
    async function loadMeta() {
      try {
        const dRes = await fetch('/api/departments');
        const dJson = await dRes.json();
        setDepartments(dJson.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadMeta();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    // Auto slug
    const slug = title
      .toLowerCase()
      .replace(/[^\u0E00-\u0E7Fa-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData((prev) => ({ ...prev, title, slug: slug || `news-${Date.now()}` }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/news/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'บันทึกข่าวไม่สำเร็จ');

      router.push('/admin/news');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin/news" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>รายการข่าวทั้งหมด</span>
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            สร้างข่าวและประกาศใหม่
          </h2>
          <p className="text-xs text-slate-500">
            ระบบเผยแพร่ข้อมูลข่าวสารพร้อมเทมเพลต และ Google Drive Picker ตาม Spec 9 & 10B
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Title & Slug */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              หัวข้อข่าวหรือประกาศ *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="ระบุชื่อหัวข้อข่าวให้น่าสนใจ ชัดเจน และกระชับ..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              URL Slug (ระบบสร้างให้อัตโนมัติ)
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 bg-slate-50"
            />
          </div>
        </div>

        {/* Department & Category & Content Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              แผนกเจ้าของเรื่อง *
            </label>
            <select
              value={formData.departmentId}
              onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- งานสารสนเทศส่วนกลาง --</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nameTh}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ประเภทเนื้อหา</label>
            <select
              value={formData.contentType}
              onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500"
            >
              <option value="NEWS">ข่าวประชาสัมพันธ์ทั่วไป</option>
              <option value="ANNOUNCEMENT">ประกาศทางการ</option>
              <option value="ACTIVITY">ภาพกิจกรรมนักเรียน</option>
              <option value="PRESS_RELEASE">แถลงข่าว / รางวัล</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">หมวดหมู่</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500"
              placeholder="เช่น วิชาการ, กิจกรรม, รางวัล"
            />
          </div>
        </div>

        {/* Cover Image & Google Drive Integration */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">รูปภาพหน้าปก</label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="url"
              value={formData.coverImageUrl}
              onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
              placeholder="https://..."
              className="flex-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
            />
            <button
              type="button"
              onClick={() => setShowDrivePickerModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-bold shrink-0 transition-colors"
            >
              <FolderSync className="w-4 h-4 text-blue-600" />
              <span>เลือกจาก Google Drive</span>
            </button>
          </div>
        </div>

        {/* Summary */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            บทคัดย่อ / สรุปความสำคัญ
          </label>
          <textarea
            rows={2}
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            placeholder="สรุปสั้นๆ 1-2 บรรทัด สำหรับแสดงในการ์ดหน้าแรกของเว็บไซต์..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Full Content */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            เนื้อหาข่าวฉบับเต็ม *
          </label>
          <textarea
            rows={8}
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="เขียนรายละเอียดข่าว เนื้อหา กำหนดการ และข้อมูลที่ต้องการสื่อสาร..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 leading-relaxed font-sans"
          />
        </div>

        {/* Visibility & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ขอบเขตการแสดงผล</label>
            <select
              value={formData.visibility}
              onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
            >
              <option value="PUBLIC">สาธารณะ (แสดงบนหน้าเว็บไซต์หลัก)</option>
              <option value="INTERNAL">ภายในโรงเรียน (เฉพาะบุคลากรที่ล็อกอิน)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">สถานะการเผยแพร่</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
            >
              <option value="PUBLISHED">เผยแพร่ทันที (Published)</option>
              <option value="DRAFT">บันทึกเป็นแบบร่าง (Draft)</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Link
            href="/admin/news"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold"
          >
            ยกเลิก
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-500 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-blue-600/25 transition-all active:scale-98"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>บันทึกและเผยแพร่ข่าว</span>
          </button>
        </div>
      </form>

      {/* Google Drive Picker Modal Simulation */}
      {showDrivePickerModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FolderSync className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Google Drive File Picker</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDrivePickerModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕ ปิด
              </button>
            </div>

            <p className="text-xs text-slate-500">
              คลิกเลือกรูปภาพจาก Google Drive เพื่อนำมาเป็นรูปหน้าปก (ใช้นโยบาย Import Copy เพื่อความเสถียร)
            </p>

            <div className="space-y-2">
              <div
                onClick={() => {
                  setFormData({
                    ...formData,
                    coverImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
                  });
                  setShowDrivePickerModal(false);
                }}
                className="p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer flex items-center gap-3 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs shrink-0">
                  IMG
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate">
                    robotics_competition_finals_2026.jpg
                  </div>
                  <div className="text-[10px] text-slate-400">2.4 MB • Google Drive</div>
                </div>
              </div>

              <div
                onClick={() => {
                  setFormData({
                    ...formData,
                    coverImageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
                  });
                  setShowDrivePickerModal(false);
                }}
                className="p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer flex items-center gap-3 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                  IMG
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate">
                    sports_day_parade_overview.png
                  </div>
                  <div className="text-[10px] text-slate-400">3.1 MB • Google Drive</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
