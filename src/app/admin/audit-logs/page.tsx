import React from 'react';
import prisma from '@/lib/prisma';
import { formatThaiDate } from '@/lib/age';
import { History, Shield, CheckCircle, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AuditLogsPage() {
  const logs = await prisma.auditLog.findMany({
    take: 30,
    orderBy: { createdAt: 'desc' },
    include: { user: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>ประวัติกิจกรรมระบบ (Audit Logs)</span>
          <History className="w-5 h-5 text-slate-600" />
        </h2>
        <p className="text-xs text-slate-500">
          บันทึกประวัติการนำเข้าไฟล์ Excel, การเผยแพร่ข่าว, การแก้ไขโปรไฟล์ และความปลอดภัย
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <th className="py-3.5 px-4 sm:px-6">การกระทำ (Action)</th>
                <th className="py-3.5 px-4">เป้าหมาย (Entity)</th>
                <th className="py-3.5 px-4">รายละเอียด</th>
                <th className="py-3.5 px-4">ผู้ดำเนินการ</th>
                <th className="py-3.5 px-4 text-right">วันเวลา</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-mono">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {log.entityType}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate font-mono text-[11px]">
                    {log.details || '-'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {log.user?.name || 'ระบบอัตโนมัติ'}
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-400">
                    {new Date(log.createdAt).toLocaleString('th-TH')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
