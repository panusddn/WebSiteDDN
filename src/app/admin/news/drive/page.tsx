'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FolderSync,
  Cloud,
  CheckCircle2,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Download,
  Link as LinkIcon,
  ShieldCheck,
  RefreshCw,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export default function GoogleDriveIntegrationPage() {
  const [isConnected, setIsConnected] = useState(true);
  const [googleEmail, setGoogleEmail] = useState('teacher.somchai@datdaruni.ac.th');
  const [storagePolicy, setStoragePolicy] = useState<'IMPORT_COPY' | 'LINKED'>('IMPORT_COPY');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Mock files in Drive for simulation
  const [driveFiles] = useState([
    {
      id: 'drive_img_001',
      name: 'robotics_competition_finals_2026.jpg',
      type: 'image',
      size: '2.4 MB',
      updated: '10 มี.ค. 2569',
    },
    {
      id: 'drive_doc_002',
      name: 'admission_guidelines_m1_m4_2569.pdf',
      type: 'document',
      size: '1.8 MB',
      updated: '8 มี.ค. 2569',
    },
    {
      id: 'drive_img_003',
      name: 'sports_day_parade_overview.png',
      type: 'image',
      size: '3.1 MB',
      updated: '5 มี.ค. 2569',
    },
    {
      id: 'drive_doc_004',
      name: 'curriculum_plan_stem_2569.pdf',
      type: 'document',
      size: '4.2 MB',
      updated: '1 มี.ค. 2569',
    },
  ]);

  const handleToggleConnection = () => {
    setIsConnected(!isConnected);
    setStatusMsg(
      !isConnected
        ? 'เชื่อมต่อ Google Drive บัญชีโรงเรียนสำเร็จ'
        : 'ยกเลิกการเชื่อมต่อ Google Drive เรียบร้อยแล้ว'
    );
    setTimeout(() => setStatusMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin/news" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ข่าวและประกาศ</span>
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>เชื่อมต่อ Google Drive สำหรับผู้ลงข่าว (Spec 10B)</span>
            <FolderSync className="w-5 h-5 text-blue-600" />
          </h2>
          <p className="text-xs text-slate-500">
            เชื่อมโยงคลาวด์ไดรฟ์ส่วนตัวเพื่อเลือกรูปภาพและเอกสารแนบประกอบข่าว พร้อมนโยบาย Import Copy เพื่อความปลอดภัย
          </p>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Connection Status Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-500 to-blue-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Cloud className="w-7 h-7 text-blue-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Google Workspace Drive Connection</h3>
                {isConnected ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    เชื่อมต่ออยู่
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                    ไม่ได้เชื่อมต่อ
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isConnected ? `เชื่อมต่อด้วยบัญชี: ${googleEmail}` : 'เชื่อมต่อบัญชี Google ของท่านเพื่อดึงไฟล์เข้าสู่ระบบ'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleConnection}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              isConnected
                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isConnected ? 'ตัดการเชื่อมต่อ' : 'เชื่อมต่อ Google Account'}
          </button>
        </div>

        {/* Storage Policy Configuration */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            นโยบายการจัดเก็บไฟล์ (Recommended Storage Policy ตาม Spec 10B)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <label
              onClick={() => setStoragePolicy('IMPORT_COPY')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                storagePolicy === 'IMPORT_COPY'
                  ? 'border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <Download className="w-4 h-4 text-blue-600" />
                <span>Import Copy (แนะนำสำหรับข่าวสาธารณะ)</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                ระบบจะดาวน์โหลดสำเนาไฟล์จาก Google Drive เข้าสู่เซิร์ฟเวอร์โรงเรียนโดยอัตโนมัติ เพื่อป้องกันรูปภาพหรือเอกสารเปิดไม่ได้ หากเจ้าของไฟล์ลบไฟล์หรือเปลี่ยน Permission ภายหลัง
              </p>
            </label>

            <label
              onClick={() => setStoragePolicy('LINKED')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                storagePolicy === 'LINKED'
                  ? 'border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <LinkIcon className="w-4 h-4 text-blue-600" />
                <span>Linked Reference (ลิงก์ตรงไปยัง Drive)</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                เปิดไฟล์โดยตรงจาก Google Drive ช่วยประหยัดพื้นที่เซิร์ฟเวอร์ เหมาะสำหรับเอกสารขนาดใหญ่หรือไฟล์ที่ต้องการให้แก้ไขได้แบบเรียลไทม์
              </p>
            </label>
          </div>
        </div>

        {/* Google Drive Picker Simulator */}
        {isConnected && (
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  คลังไฟล์ใน Google Drive ของคุณ (Google Picker Simulator)
                </h4>
                <p className="text-[11px] text-slate-500">
                  ไฟล์ที่พร้อมดึงไปใช้งานใน News Editor
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {driveFiles.map((file) => (
                <div
                  key={file.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                      {file.type === 'image' ? (
                        <ImageIcon className="w-4 h-4 text-pink-500" />
                      ) : (
                        <FileText className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">{file.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {file.size} • แก้ไข {file.updated}
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[10px] shrink-0">
                    พร้อมใช้งาน
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
