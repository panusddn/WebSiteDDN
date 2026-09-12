'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ArrowRight, LogIn, ChevronRight, Phone, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  schoolName?: string;
  shortName?: string;
  tagline?: string;
}

export default function PublicNavbar({
  schoolName = 'โรงเรียนดัดดรุณี',
  shortName = 'ด.ด.',
  tagline = 'DATDARUNI SCHOOL',
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'หน้าแรก' },
    { href: '/about', label: 'เกี่ยวกับเรา' },
    { href: '/#curriculum', label: 'หลักสูตร' },
    { href: '/news', label: 'ข่าวสาร' },
    { href: '/staff', label: 'บุคลากร' },
    { href: '/#achievements', label: 'ผลงานนักเรียน' },
    { href: '/calendar', label: 'ตารางกิจกรรม' },
    { href: '/documents', label: 'เอกสาร' },
    { href: '/contact', label: 'ติดต่อเรา' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && path !== '/#curriculum' && path !== '/#achievements' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo & School Name */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-pink-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-[10px] sm:rounded-[14px] flex items-center justify-center">
                  <span className="font-extrabold text-xs sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-pink-600">
                    {shortName}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm sm:text-lg text-slate-900 tracking-tight leading-tight group-hover:text-blue-700 transition-colors">
                  {schoolName}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  {tagline}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation (>= 1024px) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 overflow-x-auto py-1 px-1 max-w-2xl no-scrollbar">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3 xl:px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      active
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                        : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Login Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 sm:p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="ค้นหาข้อมูล"
                title="ค้นหา"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Login Button (Responsive: Full Pill on desktop & tablet sm+, Icon on extra small mobile) */}
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 lg:px-5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:opacity-95 shadow-md shadow-pink-500/25 transition-all active:scale-98 shrink-0"
                title="เข้าสู่ระบบบริหารจัดการ"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>เข้าสู่ระบบ</span>
              </Link>

              {/* Mobile Direct Login Quick Icon */}
              <Link
                href="/login"
                className="sm:hidden p-2 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
                aria-label="เข้าสู่ระบบ"
                title="เข้าสู่ระบบ"
              >
                <LogIn className="w-4 h-4" />
              </Link>

              {/* Mobile/Tablet Menu Button (Visible on < 1024px) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 lg:hidden transition-colors"
                aria-label="เปิดเมนู"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Bar on Top */}
        {searchOpen && (
          <div className="border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 py-3 shadow-inner animate-in slide-in-from-top-1">
            <div className="max-w-3xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาข่าวสาร, ตารางกิจกรรม, ผลงานนักเรียน หรือข้อมูลบุคลากร..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              <Link
                href={`/news?q=${encodeURIComponent(searchQuery)}`}
                onClick={() => setSearchOpen(false)}
                className="px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                ค้นหา
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Full-Screen Mobile & Tablet Drawer Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Blur overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu Container */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-right duration-200">
            <div className="space-y-5 overflow-y-auto pr-1">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-pink-500 p-0.5 flex items-center justify-center font-black text-xs text-white">
                    ด.ด.
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-sm text-slate-900">เมนูนำทาง</span>
                    <span className="text-[10px] text-slate-400 font-medium">โรงเรียนดัดดรุณี</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer In-Menu Quick Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/news?q=${encodeURIComponent(searchQuery)}`;
                      setMobileMenuOpen(false);
                    }
                  }}
                  placeholder="ค้นหาข้อมูลในเว็บไซต์..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Navigation Link Items with generous touch target (min 48px) */}
              <nav className="space-y-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all active:scale-98 ${
                        active
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-blue-700'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom Actions: Login & Portal */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition-all active:scale-98"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>เข้าสู่ระบบบริหารจัดการ (Portal)</span>
              </Link>
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                <span>โทร 038-511-042</span>
                <span>Future Ready School</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
