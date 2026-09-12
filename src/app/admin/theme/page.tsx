'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Palette,
  Laptop,
  Tablet,
  Smartphone,
  Check,
  Save,
  RotateCcw,
  Sparkles,
  Layers,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  Eye
} from 'lucide-react';
import { defaultColors, defaultLayout, defaultTypography } from '@/lib/theme';

export default function WebsiteThemePage() {
  const [themes, setThemes] = useState<any[]>([]);
  const [activeThemeId, setActiveThemeId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Editable theme tokens state
  const [colors, setColors] = useState(defaultColors);
  const [typography, setTypography] = useState(defaultTypography);
  const [layout, setLayout] = useState(defaultLayout);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/theme');
      const json = await res.json();
      if (json.themes) {
        setThemes(json.themes);
        const active = json.active || json.themes[0];
        setActiveThemeId(active.id);
        if (active.colors) setColors({ ...defaultColors, ...JSON.parse(active.colors) });
        if (active.typography) setTypography({ ...defaultTypography, ...JSON.parse(active.typography) });
        if (active.layout) setLayout({ ...defaultLayout, ...JSON.parse(active.layout) });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (theme: any) => {
    setActiveThemeId(theme.id);
    if (theme.colors) setColors({ ...defaultColors, ...JSON.parse(theme.colors) });
    if (theme.typography) setTypography({ ...defaultTypography, ...JSON.parse(theme.typography) });
    if (theme.layout) setLayout({ ...defaultLayout, ...JSON.parse(theme.layout) });
  };

  const handleColorChange = (key: keyof typeof colors, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (action: 'draft' | 'publish') => {
    setSaving(true);
    setStatusMsg(null);
    try {
      const res = await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: activeThemeId,
          colors,
          typography,
          layout,
          action,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);

      setStatusMsg(action === 'publish' ? 'เผยแพร่ธีมสู่หน้าเว็บไซต์จริงเรียบร้อยแล้ว!' : 'บันทึกฉบับร่าง (Draft) เรียบร้อยแล้ว');
      setTimeout(() => setStatusMsg(null), 4000);
      fetchThemes();
    } catch (err: any) {
      alert(err.message || 'บันทึกไม่สำเร็จ');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-500 gap-2">
        <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
        <span>กำลังโหลด Theme & Template Manager...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            จัดการภาพลักษณ์และธีมเว็บไซต์ (Theme & Template Manager)
          </h2>
          <p className="text-xs text-slate-500">
            ปรับเปลี่ยนแม่สีหลัก ฟอนต์ ขอบมน และสลับ Template พร้อมระบบ Live Preview และ Versioning ตาม Spec 5A
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-xs transition-colors"
          >
            บันทึกแบบร่าง (Draft)
          </button>
          <button
            type="button"
            onClick={() => handleSave('publish')}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-500 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-blue-600/25 transition-all active:scale-98"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            <span>เผยแพร่ใช้งานจริง (Publish Theme)</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Template Presets Gallery */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              คลังเทมเพลตเว็บไซต์ (Website Template Gallery)
            </h3>
          </div>
          <span className="text-xs text-slate-500">คลิกเพื่อเลือก Template สไตล์</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((t) => {
            const isSelected = t.id === activeThemeId;
            let tColors = defaultColors;
            try {
              if (t.colors) tColors = JSON.parse(t.colors);
            } catch {}

            return (
              <div
                key={t.id}
                onClick={() => handleSelectPreset(t)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-pink-500 ring-2 ring-pink-500/20 bg-pink-50/20 shadow-md'
                    : 'border-slate-200 hover:border-blue-300 bg-white hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">{t.name}</span>
                  {t.isActive && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      เผยแพร่อยู่
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{t.description}</p>
                <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-100">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: tColors.primary }} />
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: tColors.secondary }} />
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: tColors.accent }} />
                  <span className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: tColors.background }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Customizer (Left) + Live Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tokens Editor (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Palette className="w-4 h-4 text-pink-500" />
            <h3 className="text-sm font-bold text-slate-900">
              ปรับค่าสีและ Design Tokens (CSS Variables)
            </h3>
          </div>

          {/* Colors Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-800 block">Primary Blue</label>
                <span className="text-[10px] text-slate-400">สีหลัก แถบเนวิเกชัน และปุ่มหลัก</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
                />
                <span className="text-xs font-mono text-slate-600 uppercase">{colors.primary}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-800 block">Secondary Sky Blue</label>
                <span className="text-[10px] text-slate-400">สีรอง การเน้นข้อความและไอคอน</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
                />
                <span className="text-xs font-mono text-slate-600 uppercase">{colors.secondary}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-800 block">Accent Pink</label>
                <span className="text-[10px] text-slate-400">สีชมพูไฮไลต์ Badge และ CTA</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
                />
                <span className="text-xs font-mono text-slate-600 uppercase">{colors.accent}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-800 block">Background Color</label>
                <span className="text-[10px] text-slate-400">พื้นหลังของเว็บไซต์</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
                />
                <span className="text-xs font-mono text-slate-600 uppercase">{colors.background}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-800 block">Hero Gradient Start</label>
                <span className="text-[10px] text-slate-400">จุดเริ่มต้นการไล่เฉดสี Hero</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.heroGradientStart || '#1E3A8A'}
                  onChange={(e) => handleColorChange('heroGradientStart', e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
                />
                <span className="text-xs font-mono text-slate-600 uppercase">{colors.heroGradientStart}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-800 block">Hero Gradient End</label>
                <span className="text-[10px] text-slate-400">จุดสิ้นสุดการไล่เฉดสี Hero</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.heroGradientEnd || '#831843'}
                  onChange={(e) => handleColorChange('heroGradientEnd', e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
                />
                <span className="text-xs font-mono text-slate-600 uppercase">{colors.heroGradientEnd}</span>
              </div>
            </div>
          </div>

          {/* Radii & Layout */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              ขอบมนและเลย์เอาต์ (Layout & Radii)
            </h4>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>ความโค้งขอบการ์ด (Card Radius)</span>
                <span>{layout.cardRadius}</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                step="4"
                value={parseInt(layout.cardRadius) || 16}
                onChange={(e) => setLayout((prev) => ({ ...prev, cardRadius: `${e.target.value}px` }))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>ความโค้งปุ่ม (Button Radius)</span>
                <span>{layout.buttonRadius}</span>
              </div>
              <input
                type="range"
                min="0"
                max="28"
                step="2"
                value={parseInt(layout.buttonRadius) || 12}
                onChange={(e) => setLayout((prev) => ({ ...prev, buttonRadius: `${e.target.value}px` }))}
                className="w-full accent-pink-600"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Responsive Live Preview (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/5 rounded-3xl border border-slate-200/80 p-6 flex flex-col shadow-inner">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-800">
                ตัวอย่างการแสดงผลแบบตอบสนอง (Responsive Live Preview)
              </span>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center bg-white rounded-xl border border-slate-200 p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded-lg transition-colors ${
                  previewDevice === 'desktop' ? 'bg-blue-100 text-blue-800' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Desktop Preview"
              >
                <Laptop className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('tablet')}
                className={`p-1.5 rounded-lg transition-colors ${
                  previewDevice === 'tablet' ? 'bg-blue-100 text-blue-800' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Tablet Preview"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-lg transition-colors ${
                  previewDevice === 'mobile' ? 'bg-blue-100 text-blue-800' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Mobile Preview"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Simulated Browser Frame with Live Styled Components */}
          <div className="flex-1 flex justify-center items-start overflow-x-auto py-2">
            <div
              className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300"
              style={{
                width: previewDevice === 'desktop' ? '100%' : previewDevice === 'tablet' ? '540px' : '340px',
                minHeight: '480px',
                backgroundColor: colors.background,
              }}
            >
              {/* Simulated Header */}
              <div
                className="px-4 py-3 flex items-center justify-between text-white"
                style={{ backgroundColor: colors.headerBg }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: colors.accent, color: '#fff' }}
                  >
                    ด.ด.
                  </div>
                  <span className="text-xs font-bold">โรงเรียนดัดดรุณี</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span>หน้าแรก</span>
                  <span>ข่าวสาร</span>
                  <span>ปฏิทิน</span>
                </div>
              </div>

              {/* Simulated Hero Banner */}
              <div
                className="p-6 text-white text-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.heroGradientStart || colors.primary} 0%, ${colors.heroGradientEnd || colors.accent} 100%)`,
                }}
              >
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-block mb-2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  Modern Technology • Digital School
                </span>
                <h4 className="text-base sm:text-lg font-black tracking-tight leading-tight">
                  ก้าวสู่ความเป็นเลิศในยุคดิจิทัล
                </h4>
                <p className="text-[11px] text-white/80 mt-1 max-w-xs mx-auto">
                  มุ่งมั่นพัฒนาศักยภาพผู้เรียนด้วยนวัตกรรมและเทคโนโลยี
                </p>
                <div className="mt-3 flex justify-center gap-2">
                  <button
                    type="button"
                    className="px-3 py-1.5 text-xs font-bold text-white shadow-xs"
                    style={{
                      backgroundColor: colors.accent,
                      borderRadius: layout.buttonRadius,
                    }}
                  >
                    ดูหลักสูตร
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 text-xs font-bold text-white/90 border border-white/40"
                    style={{
                      borderRadius: layout.buttonRadius,
                    }}
                  >
                    ติดต่อเรา
                  </button>
                </div>
              </div>

              {/* Simulated Cards Grid */}
              <div className="p-4 space-y-3">
                <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>ข่าวประชาสัมพันธ์ล่าสุด</span>
                  <span style={{ color: colors.accent }}>ดูทั้งหมด →</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div
                    className="p-3 border border-slate-100 shadow-xs"
                    style={{
                      backgroundColor: colors.surface,
                      borderRadius: layout.cardRadius,
                    }}
                  >
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-bold inline-block mb-1"
                      style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}
                    >
                      ข่าวเด่น
                    </span>
                    <h5 className="text-xs font-bold text-slate-800 line-clamp-1">
                      ชนะเลิศแข่งขันหุ่นยนต์ระดับชาติ 2569
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">
                      นักเรียนตัวแทนโรงเรียนดัดดรุณีคว้ารางวัลชนะเลิศอันดับ 1
                    </p>
                  </div>

                  <div
                    className="p-3 border border-slate-100 shadow-xs"
                    style={{
                      backgroundColor: colors.surface,
                      borderRadius: layout.cardRadius,
                    }}
                  >
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-bold inline-block mb-1"
                      style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
                    >
                      วิชาการ
                    </span>
                    <h5 className="text-xs font-bold text-slate-800 line-clamp-1">
                      เปิดรับสมัคร ม.1 และ ม.4 ปีการศึกษา 2569
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">
                      ห้องเรียนพิเศษวิทย์-คณิต-เทคโนโลยี ผ่านระบบออนไลน์
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
