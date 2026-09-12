'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Search, Sparkles, ExternalLink } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  userName?: string;
  userRole?: string;
  departmentName?: string;
}

export default function AdminHeader({
  title = 'แดชบอร์ดภาพรวมผู้บริหาร',
  subtitle = 'ยินดีต้อนรับสู่ระบบบริหารจัดการ โรงเรียนดัดดรุณี',
  userName = 'ผู้ดูแลระบบสูงสุด',
  userRole = 'SUPER_ADMIN',
  departmentName = 'สำนักงานผู้อำนวยการ',
}: HeaderProps) {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
        <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick View Public Site */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-colors"
        >
          <span>เปิดเว็บไซต์สาธารณะ</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </Link>

        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button
            type="button"
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white animate-pulse" />
          </button>
        </div>

        {/* User Info & Avatar */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-pink-500 p-0.5 flex items-center justify-center text-white font-bold text-sm shadow-xs">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              {userName.slice(0, 1)}
            </div>
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-bold text-slate-900 leading-tight">{userName}</div>
            <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{departmentName}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
