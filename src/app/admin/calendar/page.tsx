'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatThaiDate } from '@/lib/age';
import { DEFAULT_SCHOOL_EVENTS, SchoolEventType } from '@/lib/calendarConstants';
import {
  CalendarCheck2,
  Plus,
  MapPin,
  Calendar,
  ExternalLink,
  Clock,
  Sparkles,
  CheckCircle,
  Trash2,
  X,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AdminCalendarPage() {
  const [events, setEvents] = useState<SchoolEventType[]>(DEFAULT_SCHOOL_EVENTS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'วิชาการ' | 'กิจกรรม' | 'วันสำคัญ' | 'การสอบ'>('วิชาการ');
  const [formStartDate, setFormStartDate] = useState('');
  const [formTimeRange, setFormTimeRange] = useState('08:30 - 16:30 น.');
  const [formLocation, setFormLocation] = useState('โรงเรียนดัดดรุณี');
  const [formDescription, setFormDescription] = useState('');
  const [formIsPublic, setFormIsPublic] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch initial events from API
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/calendar');
      const json = await res.json();
      if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
        setEvents(json.data);
      }
    } catch (err) {
      console.warn('Error loading calendar events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setFormTitle('');
    setFormCategory('วิชาการ');
    // Default to tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFormStartDate(tomorrow.toISOString().split('T')[0]);
    setFormTimeRange('08:30 - 16:30 น.');
    setFormLocation('หอประชุมใหญ่ โรงเรียนดัดดรุณี');
    setFormDescription('');
    setFormIsPublic(true);
    setFormError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormError(null);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('กรุณากรอกหัวข้อกิจกรรม');
      return;
    }
    if (!formStartDate) {
      setFormError('กรุณาเลือกวันที่จัดกิจกรรม');
      return;
    }

    try {
      setSubmitting(true);
      setFormError(null);

      const payload = {
        title: formTitle.trim(),
        category: formCategory,
        startDate: new Date(formStartDate).toISOString(),
        timeRange: formTimeRange.trim() || '08:30 - 16:30 น.',
        location: formLocation.trim() || 'โรงเรียนดัดดรุณี',
        description: formDescription.trim(),
        isPublic: formIsPublic,
      };

      const res = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'เกิดข้อผิดพลาดในการบันทึกกิจกรรม');
      }

      // Add to local state immediately
      setEvents((prev) => [json.data, ...prev]);
      setShowModal(false);
      setToastMessage(`เพิ่มกิจกรรม "${formTitle}" สำเร็จแล้ว!`);
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err: any) {
      setFormError(err.message || 'ไม่สามารถบันทึกกิจกรรมได้');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    if (!confirm(`คุณต้องการลบกิจกรรม "${title}" ใช่หรือไม่?`)) return;

    try {
      await fetch(`/api/calendar?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      setToastMessage(`ลบกิจกรรม "${title}" สำเร็จแล้ว`);
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการลบกิจกรรม');
    }
  };

  // Filtered Events
  const filteredEvents = events.filter((ev) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      ev.category === selectedCategory ||
      (selectedCategory === 'วิชาการ' && ev.category.includes('วิชาการ')) ||
      (selectedCategory === 'กิจกรรม' && ev.category.includes('กิจกรรม')) ||
      (selectedCategory === 'วันสำคัญ' && (ev.category.includes('วันสำคัญ') || ev.category.includes('วันหยุด'))) ||
      (selectedCategory === 'การสอบ' && ev.category.includes('สอบ'));

    const matchesSearch =
      !searchQuery.trim() ||
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ev.description && ev.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white text-xs font-bold rounded-2xl shadow-xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            ปฏิทินกิจกรรมโรงเรียน (Activity Calendar)
          </h2>
          <p className="text-xs text-slate-500">
            กำหนดการ วันสำคัญ กิจกรรมวิชาการ และกิจกรรมส่งเสริมศักยภาพนักเรียน
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/calendar"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <span>เปิดดูหน้าปฏิทินสาธารณะ</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleOpenModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>สร้างกิจกรรมใหม่</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] text-slate-400 font-medium">กิจกรรมทั้งหมด</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{events.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] text-slate-400 font-medium">กิจกรรมวิชาการ</span>
          <div className="text-2xl font-black text-blue-600 mt-1">
            {events.filter((e) => e.category.includes('วิชาการ')).length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] text-slate-400 font-medium">วันสำคัญ / วันหยุด</span>
          <div className="text-2xl font-black text-pink-600 mt-1">
            {events.filter((e) => e.category.includes('วันสำคัญ') || e.category.includes('วันหยุด')).length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] text-slate-400 font-medium">ตารางการสอบ</span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {events.filter((e) => e.category.includes('สอบ')).length}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { key: 'all', label: 'ทั้งหมด' },
            { key: 'วิชาการ', label: 'วิชาการ' },
            { key: 'กิจกรรม', label: 'กิจกรรม' },
            { key: 'วันสำคัญ', label: 'วันสำคัญ' },
            { key: 'การสอบ', label: 'การสอบ' },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.key
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหากิจกรรมหรือสถานที่..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Events List Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">ไม่พบกิจกรรมที่ค้นหา</h3>
          <p className="text-xs text-slate-400">ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((ev) => {
            const eventDate = new Date(ev.startDate);
            const monthTh = eventDate.toLocaleString('th-TH', { month: 'short' });
            const dayNum = eventDate.getDate();

            return (
              <div
                key={ev.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-start gap-4 hover:shadow-md transition-all group relative"
              >
                {/* Date Square */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-pink-600 text-white flex flex-col items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <span className="text-xs uppercase font-bold opacity-85">{monthTh}</span>
                  <span className="text-xl font-black">{dayNum}</span>
                </div>

                {/* Content */}
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-100">
                      {ev.category || 'กิจกรรมโรงเรียน'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                        <CheckCircle className="w-3 h-3" />
                        <span>เผยแพร่แล้ว</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteEvent(ev.id, ev.title)}
                        className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="ลบกิจกรรมนี้"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {ev.title}
                  </h3>

                  {ev.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {ev.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                    {ev.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                        <span>{ev.location}</span>
                      </div>
                    )}
                    {ev.timeRange && (
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>{ev.timeRange}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE EVENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">สร้างกิจกรรมโรงเรียนใหม่</h3>
                  <p className="text-[11px] text-slate-500">
                    เพิ่มกิจกรรมลงในปฏิทินกิจกรรมโรงเรียนและหน้าเว็บไซต์
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateEvent} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  หัวข้อกิจกรรม <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น พิธีไหว้ครู ประจำปีการศึกษา 2569"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Category & Date in 2 Cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    หมวดหมู่ <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e: any) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    <option value="วิชาการ">วิชาการ</option>
                    <option value="กิจกรรม">กิจกรรมนักเรียน</option>
                    <option value="วันสำคัญ">วันสำคัญ / วันหยุด</option>
                    <option value="การสอบ">ตารางการสอบ</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    วันที่จัดกิจกรรม <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Time Range & Location in 2 Cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">ช่วงเวลา</label>
                  <input
                    type="text"
                    placeholder="เช่น 08:30 - 16:30 น."
                    value={formTimeRange}
                    onChange={(e) => setFormTimeRange(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">สถานที่</label>
                  <input
                    type="text"
                    placeholder="เช่น หอประชุมใหญ่ โรงเรียนดัดดรุณี"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">รายละเอียดกิจกรรม</label>
                <textarea
                  rows={3}
                  placeholder="ระบุกำหนดการย่อ หรือรายละเอียดสำหรับนักเรียนและผู้ปกครอง..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Toggle Public */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="formIsPublic"
                  checked={formIsPublic}
                  onChange={(e) => setFormIsPublic(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500"
                />
                <label htmlFor="formIsPublic" className="text-xs font-medium text-slate-700 cursor-pointer">
                  เผยแพร่กิจกรรมนี้บนเว็บไซต์ทันที (สาธารณะ)
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all disabled:opacity-50"
                >
                  {submitting ? 'กำลังบันทึก...' : 'บันทึกกิจกรรม'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
