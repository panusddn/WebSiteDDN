'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Search,
  Sparkles,
  ExternalLink,
  Menu,
  User,
  Settings,
  LogOut,
  Cake,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  userName?: string;
  userRole?: string;
  departmentName?: string;
  onToggleSidebar?: () => void;
}

export default function AdminHeader({
  title = 'แดชบอร์ดภาพรวมผู้บริหาร',
  subtitle = 'ยินดีต้อนรับสู่ระบบบริหารจัดการ โรงเรียนดัดดรุณี',
  userName = 'ผู้ดูแลระบบสูงสุด',
  userRole = 'SUPER_ADMIN',
  departmentName = 'สำนักงานผู้อำนวยการ',
  onToggleSidebar,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: '🎂 สุขสันต์วันเกิดครูประจำวันนี้',
      desc: 'วันนี้เป็นวันคล้ายวันเกิดของ นางกัญญาภัทร วรกิจเจริญ',
      time: 'เมื่อ 1 ชม. ที่แล้ว',
      href: '/admin/birthdays',
    },
    {
      id: 2,
      title: '📄 มีเอกสารแบบคำร้องใหม่',
      desc: 'คำร้องขอหนังสือรับรอง ปพ.7 รอตรวจสอบ 3 รายการ',
      time: 'เมื่อ 3 ชม. ที่แล้ว',
      href: '/admin/documents',
    },
    {
      id: 3,
      title: '✅ สำรองข้อมูลระบบอัตโนมัติสำเร็จ',
      desc: 'ระบบได้สำรองข้อมูลประจำวันเสร็จสมบูรณ์',
      time: 'เมื่อวานนี้',
      href: '/admin/audit-logs',
    },
  ];

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile / Tablet Hamburger Toggle */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
            {title}
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium hidden xs:block">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick View Public Site */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-colors"
        >
          <span>เปิดเว็บไซต์สาธารณะ</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </Link>

        {/* Notifications Icon with Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="text-xs font-bold text-slate-900">การแจ้งเตือน (Notifications)</div>
                <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">
                  3 ใหม่
                </span>
              </div>

              <div className="space-y-2">
                {notifications.map((n) => (
                  <Link
                    key={n.id}
                    href={n.href}
                    onClick={() => setShowNotifications(false)}
                    className="block p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors"
                  >
                    <div className="text-xs font-bold text-slate-800">{n.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.desc}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{n.time}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Info & Avatar with Dropdown */}
        <div className="relative pl-2 sm:pl-3 border-l border-slate-200">
          <button
            type="button"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-pink-500 p-0.5 flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                {userName.slice(0, 1)}
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-slate-900 leading-tight">{userName}</div>
              <div className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{departmentName}</span>
              </div>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 text-xs">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="font-bold text-slate-900">{userName}</div>
                <div className="text-[11px] text-slate-400 font-mono">admin@datdaruni.ac.th</div>
              </div>

              <Link
                href="/admin/profile"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium transition-colors"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>ข้อมูลโปรไฟล์ของฉัน</span>
              </Link>

              <Link
                href="/admin/settings"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-500" />
                <span>ตั้งค่าระบบทั่วไป</span>
              </Link>

              <div className="pt-1 border-t border-slate-100">
                <Link
                  href="/login"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold transition-colors"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>ออกจากระบบ</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
