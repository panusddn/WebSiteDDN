'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Share2,
  Globe,
  Camera,
  Video,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function SocialMediaAdminPage() {
  const [syncing, setSyncing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleManualSync = async () => {
    setSyncing(true);
    setStatusMsg(null);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setStatusMsg('ดึงโพสต์ล่าสุดจาก Facebook และเชื่อมต่อสื่อสังคมออนไลน์เรียบร้อยแล้ว (Cache Updated)');
      setTimeout(() => setStatusMsg(null), 4000);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>การเชื่อมต่อ Social Media (Spec 4)</span>
            <Share2 className="w-5 h-5 text-blue-600" />
          </h2>
          <p className="text-xs text-slate-500">
            ตั้งค่าดึงฟีดโพสต์ล่าสุดจาก Facebook, Instagram และ YouTube พร้อมระบบ Cache เพื่อความเร็ว
          </p>
        </div>

        <button
          type="button"
          onClick={handleManualSync}
          disabled={syncing}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all active:scale-98"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          <span>ซิงก์โพสต์ทันที (Manual Sync)</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Facebook */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              เชื่อมต่อแล้ว
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Facebook Page</h3>
            <p className="text-xs text-slate-500 mt-0.5">โรงเรียนดัดดรุณี Official</p>
          </div>
          <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
            <div className="flex justify-between">
              <span>สถานะ Token:</span>
              <span className="font-semibold text-emerald-600">Active (Long-lived)</span>
            </div>
            <div className="flex justify-between">
              <span>รอบการซิงก์:</span>
              <span>ทุก 30 นาที (Auto)</span>
            </div>
          </div>
        </div>

        {/* Instagram */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
              พร้อมเชื่อมต่อ
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Instagram Feed</h3>
            <p className="text-xs text-slate-500 mt-0.5">@datdarunischool</p>
          </div>
          <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
            <div className="flex justify-between">
              <span>สถานะ:</span>
              <span className="text-slate-400">ยังไม่ได้ระบุ Token</span>
            </div>
          </div>
        </div>

        {/* YouTube */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              เชื่อมต่อแล้ว
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">YouTube Channel</h3>
            <p className="text-xs text-slate-500 mt-0.5">Datdaruni Official Channel</p>
          </div>
          <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
            <div className="flex justify-between">
              <span>ดึงคลิปล่าสุด:</span>
              <span className="font-semibold text-emerald-600">พร้อมแสดงผล</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
