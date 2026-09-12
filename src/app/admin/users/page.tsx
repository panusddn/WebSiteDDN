'use client';

import React, { useState } from 'react';
import {
  Users,
  ShieldAlert,
  UserPlus,
  Search,
  CheckCircle2,
  XCircle,
  KeyRound,
  MoreVertical,
  ShieldCheck,
  User,
  GraduationCap
} from 'lucide-react';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');

  const [users, setUsers] = useState([
    {
      id: 'u-1',
      name: 'ผู้ดูแลระบบสูงสุด',
      email: 'admin@datdaruni.ac.th',
      role: 'SUPER_ADMIN',
      roleLabel: 'Super Admin',
      department: 'ศูนย์เทคโนโลยีสารสนเทศ',
      isActive: true,
      lastLogin: 'วันนี้, 19:45 น.',
    },
    {
      id: 'u-2',
      name: 'นายสมหมาย การุณวิทย์',
      email: 'director@datdaruni.ac.th',
      role: 'EXECUTIVE',
      roleLabel: 'ผู้อำนวยการโรงเรียน',
      department: 'ฝ่ายบริหาร',
      isActive: true,
      lastLogin: 'เมื่อวานนี้, 14:20 น.',
    },
    {
      id: 'u-3',
      name: 'นางกัญญาภัทร วรกิจเจริญ',
      email: 'academic@datdaruni.ac.th',
      role: 'DEPT_ADMIN',
      roleLabel: 'หัวหน้างานวิชาการ',
      department: 'ฝ่ายบริหารงานวิชาการ',
      isActive: true,
      lastLogin: '10 ก.ย. 2569',
    },
    {
      id: 'u-4',
      name: 'ครูสมศรี มีสุข',
      email: 'teacher@datdaruni.ac.th',
      role: 'TEACHER_STAFF',
      roleLabel: 'ครูผู้สอน',
      department: 'กลุ่มสาระฯ วิทยาศาสตร์และเทคโนโลยี',
      isActive: true,
      lastLogin: '08 ก.ย. 2569',
    },
    {
      id: 'u-5',
      name: 'เจ้าหน้าที่ประชาสัมพันธ์',
      email: 'pr@datdaruni.ac.th',
      role: 'CONTENT_EDITOR',
      roleLabel: 'ผู้ดูแลเนื้อหา (Editor)',
      department: 'งานประชาสัมพันธ์',
      isActive: true,
      lastLogin: '05 ก.ย. 2569',
    },
  ]);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'ALL' || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'EXECUTIVE':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'DEPT_ADMIN':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-pink-600" />
            <span>บัญชีผู้ใช้และบทบาท (User Management & RBAC)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            จัดการสิทธิ์การเข้าถึง กำหนดบทบาท และตรวจสอบสถานะบัญชีบุคลากรในระบบ
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>เพิ่มผู้ใช้งานใหม่</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาชื่อ, อีเมล หรือแผนก..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">บทบาท:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-2 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">ทั้งหมดทุกบทบาท</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="EXECUTIVE">ผู้อำนวยการ / ผู้บริหาร</option>
            <option value="DEPT_ADMIN">หัวหน้าฝ่าย / แผนก</option>
            <option value="TEACHER_STAFF">ครูและบุคลากร</option>
            <option value="CONTENT_EDITOR">ผู้ดูแลเนื้อหา</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold">
                <th className="py-3.5 px-6">ผู้ใช้งาน</th>
                <th className="py-3.5 px-6">อีเมลระบบ</th>
                <th className="py-3.5 px-6">บทบาท (Role)</th>
                <th className="py-3.5 px-6">กลุ่มสาระฯ / ฝ่ายงาน</th>
                <th className="py-3.5 px-6">เข้าสู่ระบบล่าสุด</th>
                <th className="py-3.5 px-6 text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-pink-500 p-0.5 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                          {u.name.slice(0, 1)}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{u.name}</div>
                        <div className="text-[11px] text-slate-400">ID: {u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-mono text-[11px]">
                    {u.email}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${getRoleBadgeClass(
                        u.role
                      )}`}
                    >
                      <ShieldCheck className="w-3 h-3" />
                      <span>{u.roleLabel}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    {u.department}
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-[11px]">
                    {u.lastLogin}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>ใช้งานอยู่</span>
                    </span>
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
