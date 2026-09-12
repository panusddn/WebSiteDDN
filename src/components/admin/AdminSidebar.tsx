'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Palette,
  Users,
  UserCheck,
  Network,
  CalendarDays,
  FileText,
  Newspaper,
  CalendarCheck2,
  Cake,
  Share2,
  BarChart3,
  ShieldAlert,
  Settings,
  History,
  ChevronDown,
  Globe,
  LogOut,
  FolderSync,
  Layers,
  Sparkles,
  FileSpreadsheet,
  X
} from 'lucide-react';

interface SidebarProps {
  userRole?: string;
  userName?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({
  userRole = 'SUPER_ADMIN',
  userName = 'ผู้ดูแลระบบ',
  isOpen = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const menuSections = [
    {
      title: 'หลัก',
      items: [
        {
          name: 'Dashboard ผู้บริหาร',
          href: '/admin/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'ภาพลักษณ์ & ดีไซน์เว็บ',
      items: [
        {
          name: 'จัดการธีมและเทมเพลต',
          href: '/admin/theme',
          icon: Palette,
          submenu: [
            { name: 'Template Gallery & Colors', href: '/admin/theme' },
            { name: 'Branding & Favicon', href: '/admin/theme/branding' },
            { name: 'จัดลำดับหน้าแรก (Sections)', href: '/admin/theme/sections' },
            { name: 'ประวัติ & Rollback', href: '/admin/theme/versions' },
          ],
        },
      ],
    },
    {
      title: 'บุคลากร & โครงสร้าง',
      items: [
        {
          name: 'ครูและบุคลากร',
          href: '/admin/staff',
          icon: Users,
          submenu: [
            { name: 'ทำเนียบบุคลากรทั้งหมด', href: '/admin/staff' },
            { name: 'นำเข้าจาก Excel (3 คอลัมน์)', href: '/admin/staff/import', icon: FileSpreadsheet },
            { name: 'ประวัติการนำเข้า', href: '/admin/staff/history' },
          ],
        },
        {
          name: 'โปรไฟล์ของฉัน',
          href: '/admin/profile',
          icon: UserCheck,
        },
        {
          name: 'ผังองค์กร & แผนก',
          href: '/admin/departments',
          icon: Network,
          submenu: [
            { name: 'แผนกและฝ่ายงาน', href: '/admin/departments' },
            { name: 'ผังองค์กรแบบโต้ตอบ (Org Chart)', href: '/admin/departments/org-chart' },
            { name: 'ผู้รับผิดชอบและสิทธิ์แผนก', href: '/admin/departments/delegation' },
          ],
        },
      ],
    },
    {
      title: 'สารสนเทศ & สื่อการเรียนรู้',
      items: [
        {
          name: 'ข่าวและประกาศ',
          href: '/admin/news',
          icon: Newspaper,
          submenu: [
            { name: 'จัดการข่าวและประกาศ (CMS)', href: '/admin/news' },
            { name: 'News Template Gallery', href: '/admin/news/templates', icon: Layers },
            { name: 'เชื่อมต่อ Google Drive', href: '/admin/news/drive', icon: FolderSync },
          ],
        },
        {
          name: 'ระบบอวยพรวันเกิด',
          href: '/admin/birthdays',
          icon: Cake,
          badge: 'อัตโนมัติ',
        },
        {
          name: 'ตารางเรียน',
          href: '/admin/schedules',
          icon: CalendarDays,
        },
        {
          name: 'ศูนย์เอกสารดาวน์โหลด',
          href: '/admin/documents',
          icon: FileText,
        },
        {
          name: 'ปฏิทินกิจกรรม',
          href: '/admin/calendar',
          icon: CalendarCheck2,
        },
        {
          name: 'Social Media Feeds',
          href: '/admin/social',
          icon: Share2,
        },
      ],
    },
    {
      title: 'การบริหาร & ความปลอดภัย',
      items: [
        {
          name: 'ศูนย์รายงาน (Reports)',
          href: '/admin/reports',
          icon: BarChart3,
        },
        {
          name: 'บัญชีผู้ใช้และบทบาท',
          href: '/admin/users',
          icon: ShieldAlert,
        },
        {
          name: 'Audit Logs (ประวัติระบบ)',
          href: '/admin/audit-logs',
          icon: History,
        },
        {
          name: 'ตั้งค่าระบบทั่วไป',
          href: '/admin/settings',
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <>
      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`w-72 bg-slate-950 text-slate-300 flex flex-col h-screen fixed lg:sticky top-0 z-50 border-r border-slate-800 select-none transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 border-b border-slate-800/80 flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-pink-500 p-0.5 shadow-md flex-shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center font-extrabold text-pink-400 text-sm">
                ด.ด.
              </div>
            </div>
            <div>
              <div className="font-bold text-white text-base tracking-tight leading-tight">
                DDN Portal
              </div>
              <div className="text-[11px] font-medium text-pink-400 uppercase tracking-wider">
                {userRole}
              </div>
            </div>
          </Link>

          {/* Close button for Mobile */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden cursor-pointer"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      {/* Navigation Links with Scrollbar */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {menuSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              {section.title}
            </div>

            {section.items.map((item) => {
              const Icon = item.icon;
              const hasSubmenu = Boolean(item.submenu);
              const isItemActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const isSubOpen = openSubmenu === item.name || (hasSubmenu && isItemActive);

              if (hasSubmenu) {
                return (
                  <div key={item.name} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => toggleSubmenu(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isItemActive
                          ? 'text-white bg-slate-800/90 font-semibold'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isItemActive ? 'text-pink-400' : 'text-slate-400'}`} />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform ${
                          isSubOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </button>

                    {isSubOpen && (
                      <div className="pl-9 pr-2 py-1 space-y-1 border-l border-slate-800 ml-4 animate-in slide-in-from-top-1">
                        {item.submenu!.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={onClose}
                              className={`block px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                isSubActive
                                  ? 'text-pink-400 bg-pink-950/40 font-semibold'
                                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                              }`}
                            >
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isItemActive
                      ? 'text-white bg-gradient-to-r from-blue-700/80 to-pink-600/40 border-l-4 border-pink-500 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isItemActive ? 'text-pink-400' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / Quick public link */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <span>ดูหน้าเว็บไซต์สาธารณะ</span>
        </Link>
        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>ออกจากระบบ</span>
        </Link>
      </div>
    </aside>
    </>
  );
}
