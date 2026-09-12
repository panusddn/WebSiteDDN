'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  Download,
  UploadCloud,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RefreshCw,
  Info,
  Users
} from 'lucide-react';

interface RowPreview {
  rowNumber: number;
  firstName: string;
  lastName: string;
  departmentName: string;
  matchedDepartmentId?: string;
  isValid: boolean;
  isDuplicate?: boolean;
  errors: string[];
}

export default function StaffImportPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [previewData, setPreviewData] = useState<{
    totalRows: number;
    validRows: RowPreview[];
    invalidRows: RowPreview[];
    allRows: RowPreview[];
  } | null>(null);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    message: string;
    summary?: { total: number; success: number; failed: number };
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewData(null);
      setImportResult(null);
      setErrorMessage(null);
      handlePreview(file);
    }
  };

  const handlePreview = async (file: File) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('action', 'preview');

      const res = await fetch('/api/staff/import', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'ตรวจสอบไฟล์ล้มเหลว');
      }

      setPreviewData(json.data);
    } catch (err: any) {
      setErrorMessage(err.message || 'เกิดข้อผิดพลาดในการอ่านไฟล์');
    } finally {
      setLoading(false);
    }
  };

  const handleCommit = async () => {
    if (!selectedFile) return;
    setImporting(true);
    setErrorMessage(null);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('action', 'commit');

      const res = await fetch('/api/staff/import', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'นำเข้าข้อมูลล้มเหลว');
      }

      setImportResult(json);
      setPreviewData(null);
    } catch (err: any) {
      setErrorMessage(err.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
            <Link href="/admin/staff" className="hover:text-blue-600">ครูและบุคลากร</Link>
            <span>/</span>
            <span className="text-slate-900">นำเข้าจาก Excel</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            นำเข้าข้อมูลบุคลากรผ่านไฟล์ Excel
          </h2>
          <p className="text-xs text-slate-500">
            ตามข้อกำหนด Spec 6A: รองรับเฉพาะ 3 คอลัมน์ (ชื่อ, นามสกุล, แผนก) เพื่อความรวดเร็วและแม่นยำ
          </p>
        </div>

        <a
          href="/api/staff/template"
          download
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-blue-600" />
          <span>ดาวน์โหลดแบบฟอร์ม (Template)</span>
        </a>
      </div>

      {/* Info Notice Banner */}
      <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">เงื่อนไขการนำเข้า:</span> ระบบจะตรวจสอบเฉพาะ 3 คอลัมน์แรกได้แก่{' '}
          <span className="font-bold underline">1. ชื่อ</span>,{' '}
          <span className="font-bold underline">2. นามสกุล</span>, และ{' '}
          <span className="font-bold underline">3. แผนก</span> โดยจะจับคู่ชื่อแผนกกับโครงสร้างองค์กรในระบบโดยอัตโนมัติ บุคลากรสามารถล็อกอินเข้ามาอัปเดตวันเกิด รูปภาพ และข้อมูลส่วนตัวได้ในภายหลังผ่านหน้า Self-Service Profile
        </div>
      </div>

      {/* Upload Box */}
      <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 text-center hover:border-blue-400 transition-colors">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-50 to-pink-50 text-blue-600 mx-auto flex items-center justify-center">
            <UploadCloud className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">
              เลือกไฟล์ Excel หรือ CSV ที่ต้องการนำเข้า
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              รองรับไฟล์สกุล <span className="font-semibold text-slate-700">.xlsx, .xls, .csv</span> (ขนาดไม่เกิน 10MB)
            </p>
          </div>

          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:opacity-90 text-white text-xs font-bold shadow-md shadow-blue-600/20 cursor-pointer transition-all active:scale-98">
            <FileSpreadsheet className="w-4 h-4" />
            <span>{selectedFile ? selectedFile.name : 'เลือกไฟล์จากเครื่อง'}</span>
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {loading && (
            <div className="flex items-center justify-center gap-2 text-xs text-blue-600 font-semibold pt-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>กำลังตรวจสอบโครงสร้างคอลัมน์และความถูกต้องของข้อมูล...</span>
            </div>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-xs text-rose-700">
          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success Result */}
      {importResult && (
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-900">{importResult.message}</h3>
              <p className="text-xs text-emerald-700">
                ข้อมูลบุคลากรได้รับการบันทึกลงสู่ฐานข้อมูลเรียบร้อยแล้ว
              </p>
            </div>
          </div>

          {importResult.summary && (
            <div className="grid grid-cols-3 gap-3 text-center bg-white p-4 rounded-2xl border border-emerald-100 text-xs">
              <div>
                <span className="text-slate-500 block">ทั้งหมด</span>
                <span className="text-lg font-bold text-slate-800">{importResult.summary.total}</span>
              </div>
              <div>
                <span className="text-emerald-600 block font-semibold">สำเร็จ</span>
                <span className="text-lg font-bold text-emerald-600">{importResult.summary.success}</span>
              </div>
              <div>
                <span className="text-rose-600 block font-semibold">ล้มเหลว</span>
                <span className="text-lg font-bold text-rose-600">{importResult.summary.failed}</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/admin/staff"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>ไปยังหน้ารายชื่อบุคลากร</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                setPreviewData(null);
                setImportResult(null);
              }}
              className="px-4 py-2 rounded-xl bg-white border border-emerald-200 text-slate-700 text-xs font-bold hover:bg-emerald-50"
            >
              นำเข้าไฟล์อื่นเพิ่มเติม
            </button>
          </div>
        </div>
      )}

      {/* Preview Table & Action */}
      {previewData && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                ผลการตรวจสอบข้อมูลล่วงหน้า (Validation Preview)
              </h3>
              <p className="text-xs text-slate-500">
                พบข้อมูลทั้งหมด {previewData.totalRows} แถว (ถูกต้อง {previewData.validRows.length} รายการ, มีข้อผิดพลาด {previewData.invalidRows.length} รายการ)
              </p>
            </div>

            <button
              type="button"
              onClick={handleCommit}
              disabled={importing || previewData.validRows.length === 0}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-98"
            >
              {importing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>กำลังบันทึกข้อมูล...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>ยืนยันนำเข้าข้อมูล ({previewData.validRows.length} รายการ)</span>
                </>
              )}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <th className="py-3 px-4">แถว</th>
                  <th className="py-3 px-4">ชื่อ</th>
                  <th className="py-3 px-4">นามสกุล</th>
                  <th className="py-3 px-4">แผนกในไฟล์</th>
                  <th className="py-3 px-4">การจับคู่แผนก</th>
                  <th className="py-3 px-4">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {previewData.allRows.map((row) => (
                  <tr
                    key={row.rowNumber}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      !row.isValid ? 'bg-rose-50/40' : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-slate-400 font-mono">{row.rowNumber}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{row.firstName || '-'}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{row.lastName || '-'}</td>
                    <td className="py-3 px-4 text-slate-600">{row.departmentName || '-'}</td>
                    <td className="py-3 px-4">
                      {row.matchedDepartmentId ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                          <CheckCircle className="w-3 h-3" />
                          <span>พบแผนกตรงกัน</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md font-semibold">
                          <AlertTriangle className="w-3 h-3" />
                          <span>ไม่พบแผนก</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {row.isValid ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>พร้อมนำเข้า</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600 font-bold" title={row.errors.join(', ')}>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{row.errors.join(', ')}</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
