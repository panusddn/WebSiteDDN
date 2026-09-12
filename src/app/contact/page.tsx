'use client';

import React, { useState } from 'react';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function PublicContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 w-full">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-700">
            Contact Us
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">
            ติดต่อสอบถามโรงเรียนดัดดรุณี
          </h1>
          <p className="text-xs text-slate-500">
            เรายินดีตอบทุกข้อสงสัยและให้ข้อมูลการศึกษาแก่ทุกท่าน
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Info (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-indigo-900 to-pink-900 rounded-3xl p-8 text-white shadow-xl space-y-8">
            <div>
              <h2 className="text-xl font-bold">ข้อมูลการติดต่อสถานศึกษา</h2>
              <p className="text-xs text-slate-300 mt-1">ยินดีต้อนรับสู่โรงเรียนดัดดรุณี</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  เลขที่ 1 ถนนมหาจักรพรรดิ์ ตำบลหน้าเมือง อำเภอเมืองฉะเชิงเทรา จังหวัดฉะเชิงเทรา 24000
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>038-511-011</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-pink-400 shrink-0" />
                <span>admin@datdaruni.ac.th</span>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden aspect-video bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xs text-slate-300">
              [ แผนที่ Google Maps: โรงเรียนดัดดรุณี ฉะเชิงเทรา ]
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-4">ส่งข้อความถึงเรา</h2>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">ส่งข้อความเรียบร้อยแล้ว</h4>
                <p className="text-xs text-emerald-700">เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด ขอบพระคุณครับ</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">ชื่อ-นามสกุล *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">อีเมลติดต่อ *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">หัวข้อเรื่อง *</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">รายละเอียดข้อความ *</label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-500 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>ส่งข้อความ</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
