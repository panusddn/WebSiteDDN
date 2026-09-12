'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowRight, RefreshCw, KeyRound, Sparkles, Home, UserCheck, ShieldCheck, BookOpen, GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@datdaruni.ac.th');
  const [password, setPassword] = useState('Admin@123456');
  const [activeRoleName, setActiveRoleName] = useState('Super Admin');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const demoRoles = [
    {
      role: 'Super Admin',
      email: 'admin@datdaruni.ac.th',
      title: 'ผู้ดูแลระบบสูงสุด',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      icon: ShieldCheck,
    },
    {
      role: 'ผู้อำนวยการ',
      email: 'director@datdaruni.ac.th',
      title: 'ผู้บริหารสถานศึกษา',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      icon: UserCheck,
    },
    {
      role: 'หัวหน้าวิชาการ',
      email: 'academic@datdaruni.ac.th',
      title: 'กลุ่มบริหารวิชาการ',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      icon: BookOpen,
    },
    {
      role: 'ครูผู้สอน',
      email: 'somchai@datdaruni.ac.th',
      title: 'ครู ค.ศ.2 วิทยาศาสตร์',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      icon: GraduationCap,
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'เข้าสู่ระบบไม่สำเร็จ');

      router.push('/admin/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setLoading(false);
    }
  };

  const selectDemoRole = (role: typeof demoRoles[0]) => {
    setEmail(role.email);
    setPassword('Admin@123456');
    setActiveRoleName(role.role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-pink-950 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden text-white">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-pink-500/25 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md sm:max-w-lg space-y-6 relative z-10">
        {/* Logo and Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-pink-500 p-0.5 shadow-xl group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-lg sm:text-xl text-pink-400">
                ด.ด.
              </div>
            </div>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            ระบบบริหารจัดการสถานศึกษา (Portal)
          </h1>
          <p className="text-xs text-slate-400">
            โรงเรียนดัดดรุณี • Future Ready School Portal
          </p>
        </div>

        {/* Login Card (Optimized padding for Mobile & Tablet/Desktop) */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/25 border border-rose-500/40 text-xs text-rose-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-bold text-xs text-slate-300 mb-1.5">
                อีเมลผู้ใช้งาน (Email)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@datdaruni.ac.th"
                  className="w-full pl-10 pr-4 py-3 sm:py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-pink-500 text-base sm:text-xs transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-bold text-xs text-slate-300">
                  รหัสผ่าน (Password)
                </label>
                <span className="text-[10px] text-pink-400 hover:underline cursor-pointer">
                  ลืมรหัสผ่าน?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 sm:py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-pink-500 text-base sm:text-xs transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 hover:opacity-95 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all active:scale-98 cursor-pointer"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>เข้าสู่ระบบบริหารจัดการ</span>
            </button>
          </form>

          {/* Quick Demo Accounts Touch Grid (Responsive: 1-col on tiny screens, 2-cols on mobile/tablet) */}
          <div className="pt-4 border-t border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-pink-400" />
                <span>คลิกเพื่อทดสอบบัญชีตัวอย่าง (Demo Roles):</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">รหัส: Admin@123456</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {demoRoles.map((role) => {
                const isSelected = email === role.email;
                const Icon = role.icon;
                return (
                  <button
                    key={role.role}
                    type="button"
                    onClick={() => selectDemoRole(role)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[56px] active:scale-98 cursor-pointer ${
                      isSelected
                        ? 'bg-pink-500/20 border-pink-500/60 ring-1 ring-pink-500/50'
                        : 'bg-white/5 hover:bg-white/10 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-white truncate">
                        {role.role}
                      </span>
                      <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </div>
                    <span className="text-[10px] text-slate-400 truncate mt-0.5">
                      {role.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>กลับสู่หน้าหลักเว็บไซต์โรงเรียน</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
