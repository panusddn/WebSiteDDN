'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { calculateAge, getBirthdayStatus, formatThaiDate } from '@/lib/age';
import {
  Cake,
  Sparkles,
  Send,
  Heart,
  Palette,
  CheckCircle2,
  Calendar,
  Gift,
  PartyPopper,
  Crown,
  RefreshCw,
  Eye,
  Sliders
} from 'lucide-react';

interface StaffItem {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  position?: string;
  dateOfBirth?: string;
  department?: { nameTh: string };
  bStatus?: any;
  ageInfo?: any;
}

export default function BirthdayWishesPage() {
  const [staffList, setStaffList] = useState<StaffItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState<StaffItem | null>(null);
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Card Editor State
  const [templateTheme, setTemplateTheme] = useState<'festive' | 'academic' | 'elegant' | 'modern'>('festive');
  const [greetingTitle, setGreetingTitle] = useState('สุขสันต์วันคล้ายวันเกิด');
  const [customMessage, setCustomMessage] = useState(
    'ขออาราธนาคุณพระศรีรัตนตรัยและสิ่งศักดิ์สิทธิ์ โปรดดลบันดาลประทานพรให้ท่านและครอบครัวมีความสุข สุขภาพพลานามัยสมบูรณ์แข็งแรง เจริญก้าวหน้าในหน้าที่การงานตลอดไป'
  );
  const [senderSignature, setSenderSignature] = useState('คณะผู้บริหาร ครู และบุคลากร โรงเรียนดัดดรุณี');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/staff/list');
      const json = await res.json();
      if (json.data) {
        const enriched = json.data.map((s: any) => ({
          ...s,
          bStatus: getBirthdayStatus(s.dateOfBirth),
          ageInfo: calculateAge(s.dateOfBirth),
        }));

        setStaffList(enriched);

        // Auto select first upcoming birthday
        const upcoming = enriched.find((s: any) => s.bStatus?.isUpcoming30Days);
        if (upcoming) setSelectedStaff(upcoming);
        else if (enriched.length > 0) setSelectedStaff(enriched[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fireCelebrationConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#1E40AF', '#EC4899', '#3B82F6', '#F43F5E', '#FBBF24'],
    });
  };

  const handleSendWish = async () => {
    if (!selectedStaff) return;
    setSending(true);
    setSuccessMsg(null);

    try {
      fireCelebrationConfetti();
      await new Promise((r) => setTimeout(r, 600));
      setSuccessMsg(`ส่งการ์ดอวยพรวันเกิดให้แก่ ${selectedStaff.prefix}${selectedStaff.firstName} ${selectedStaff.lastName} เรียบร้อยแล้ว!`);
      setTimeout(() => setSuccessMsg(null), 5000);
    } finally {
      setSending(false);
    }
  };

  const birthdayUpcomingList = staffList
    .filter((s) => s.bStatus && s.bStatus.isUpcoming30Days)
    .sort((a, b) => (a.bStatus!.daysRemaining - b.bStatus!.daysRemaining));

  // Themes configurations
  const themeStyles = {
    festive: {
      bg: 'linear-gradient(135deg, #1E3A8A 0%, #BE185D 100%)',
      text: '#FFFFFF',
      accent: '#F472B6',
      border: 'border-pink-300/40',
      badge: 'bg-pink-500 text-white',
    },
    academic: {
      bg: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
      text: '#FDE047',
      accent: '#EAB308',
      border: 'border-amber-400/40',
      badge: 'bg-amber-500 text-slate-950 font-black',
    },
    elegant: {
      bg: 'linear-gradient(135deg, #831843 0%, #4C0519 100%)',
      text: '#FDF2F8',
      accent: '#FBCFE8',
      border: 'border-rose-300/40',
      badge: 'bg-rose-400 text-slate-900 font-bold',
    },
    modern: {
      bg: 'linear-gradient(135deg, #0284C7 0%, #2563EB 100%)',
      text: '#FFFFFF',
      accent: '#38BDF8',
      border: 'border-sky-300/40',
      badge: 'bg-white text-blue-800 font-bold',
    },
  };

  const currentTheme = themeStyles[templateTheme];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-500 gap-2">
        <RefreshCw className="w-5 h-5 animate-spin text-pink-600" />
        <span>กำลังโหลดระบบวันเกิดบุคลากร...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>ระบบอวยพรวันเกิดบุคลากร (Birthday Wishes System)</span>
            <span className="p-1 rounded-lg bg-pink-100 text-pink-600">
              <PartyPopper className="w-5 h-5" />
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            คำนวณวันเกิดอัตโนมัติ ออกแบบการ์ดอวยพรสำเร็จรูป และส่งข้อความร่วมแสดงความยินดีตาม Spec 13A
          </p>
        </div>

        <button
          type="button"
          onClick={fireCelebrationConfetti}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold transition-colors self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>ทดสอบเอฟเฟกต์พลุกระดาษ (Confetti)</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Upcoming Birthdays Selector Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cake className="w-4 h-4 text-pink-500" />
            <h3 className="text-sm font-bold text-slate-900">
              รายชื่อบุคลากรที่มีวันเกิดใน 30 วันนี้ ({birthdayUpcomingList.length} ท่าน)
            </h3>
          </div>
          <span className="text-xs text-slate-400">คลิกที่การ์ดเพื่อเลือกผู้รับ</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {birthdayUpcomingList.map((staff) => {
            const isSelected = selectedStaff?.id === staff.id;
            const isToday = staff.bStatus?.isToday;

            return (
              <div
                key={staff.id}
                onClick={() => setSelectedStaff(staff)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-pink-500 ring-2 ring-pink-500/20 bg-pink-50/30 shadow-md'
                    : 'border-slate-200 hover:border-pink-300 bg-white hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isToday ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-700'
                    }`}
                  >
                    {staff.firstName.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {staff.prefix}{staff.firstName} {staff.lastName}
                      </span>
                      {isToday && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-pink-500 text-white animate-pulse">
                          วันนี้
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">
                      {staff.department?.nameTh || 'ครูผู้สอน'}
                    </p>
                    <div className="text-[10px] text-pink-600 font-semibold mt-0.5">
                      วันเกิด: {formatThaiDate(staff.dateOfBirth, false)} ({staff.ageInfo?.years} ปี)
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-slate-500 shrink-0">
                  {isToday ? '🎉 วันนี้' : `อีก ${staff.bStatus?.daysRemaining} วัน`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column: Card Editor (Left) & Live Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              ปรับแต่งการ์ดอวยพร (Birthday Card Editor)
            </h3>
          </div>

          {/* Preset Theme Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              เลือกธีมการ์ด (Card Template Gallery)
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setTemplateTheme('festive')}
                className={`p-2.5 rounded-xl border font-bold text-left transition-all ${
                  templateTheme === 'festive'
                    ? 'border-pink-500 bg-pink-50 text-pink-800 ring-2 ring-pink-500/20'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Festive Blue-Pink
              </button>
              <button
                type="button"
                onClick={() => setTemplateTheme('academic')}
                className={`p-2.5 rounded-xl border font-bold text-left transition-all ${
                  templateTheme === 'academic'
                    ? 'border-amber-500 bg-amber-50 text-amber-800 ring-2 ring-amber-500/20'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Academic Gold
              </button>
              <button
                type="button"
                onClick={() => setTemplateTheme('elegant')}
                className={`p-2.5 rounded-xl border font-bold text-left transition-all ${
                  templateTheme === 'elegant'
                    ? 'border-rose-500 bg-rose-50 text-rose-800 ring-2 ring-rose-500/20'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Elegant Rose
              </button>
              <button
                type="button"
                onClick={() => setTemplateTheme('modern')}
                className={`p-2.5 rounded-xl border font-bold text-left transition-all ${
                  templateTheme === 'modern'
                    ? 'border-blue-500 bg-blue-50 text-blue-800 ring-2 ring-blue-500/20'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Modern Sky Blue
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">หัวข้อคำอวยพร</label>
            <input
              type="text"
              value={greetingTitle}
              onChange={(e) => setGreetingTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ข้อความอวยพร</label>
            <textarea
              rows={4}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-pink-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ลงชื่อผู้ส่ง / นามหน่วยงาน</label>
            <input
              type="text"
              value={senderSignature}
              onChange={(e) => setSenderSignature(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="button"
            onClick={handleSendWish}
            disabled={sending || !selectedStaff}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:opacity-95 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-pink-600/25 transition-all active:scale-98"
          >
            {sending ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>ส่งการ์ดอวยพรให้คุณครูท่านนี้</span>
          </button>
        </div>

        {/* Live Card Preview (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/5 rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-center items-center shadow-inner">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-pink-500" />
              <span>ตัวอย่างการ์ดอวยพรจริง (Live Preview)</span>
            </span>
            <span className="text-[11px] text-slate-500">
              {selectedStaff ? `ผู้รับ: ${selectedStaff.prefix}${selectedStaff.firstName} ${selectedStaff.lastName}` : 'ยังไม่ได้เลือกผู้รับ'}
            </span>
          </div>

          {/* Rendered Greeting Card */}
          <div
            className={`w-full max-w-lg rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-all duration-300 border ${currentTheme.border}`}
            style={{
              background: currentTheme.bg,
              color: currentTheme.text,
            }}
          >
            {/* Background Festive Lights */}
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-pink-400/20 rounded-full blur-2xl" />

            <div className="relative z-10 text-center space-y-4">
              {/* Badge & Logo */}
              <div className="flex items-center justify-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${currentTheme.badge}`}>
                  Datdaruni Birthday Card
                </span>
              </div>

              {/* Recipient Photo / Initial */}
              <div className="w-20 h-20 mx-auto rounded-2xl bg-white/20 backdrop-blur-md p-1 shadow-md">
                <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center text-3xl font-black text-pink-600">
                  {selectedStaff ? selectedStaff.firstName.slice(0, 1) : 'ด'}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-black tracking-tight" style={{ color: currentTheme.accent }}>
                  {greetingTitle}
                </h4>
                <div className="text-base font-bold mt-1 text-white">
                  {selectedStaff ? `${selectedStaff.prefix}${selectedStaff.firstName} ${selectedStaff.lastName}` : 'ชื่อ-นามสกุลบุคลากร'}
                </div>
                <div className="text-xs opacity-80 mt-0.5">
                  {selectedStaff?.position || 'ครูผู้สอน'} • {selectedStaff?.department?.nameTh || 'โรงเรียนดัดดรุณี'}
                </div>
                {selectedStaff?.ageInfo && (
                  <div className="text-xs font-bold mt-1 text-pink-200">
                    เจริญวัย {selectedStaff.ageInfo.years} ปี
                  </div>
                )}
              </div>

              {/* Message */}
              <p className="text-xs sm:text-sm leading-relaxed px-4 opacity-95 italic">
                “{customMessage}”
              </p>

              {/* Signature */}
              <div className="pt-4 border-t border-white/20 text-xs font-semibold tracking-wide opacity-90">
                {senderSignature}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
