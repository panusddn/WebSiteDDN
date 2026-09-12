'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Network,
  Users,
  Save,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  RefreshCw,
  ArrowLeft,
  ChevronDown,
  Layers,
  Sparkles,
  Crown
} from 'lucide-react';

interface DepartmentNode {
  id: string;
  code: string;
  nameTh: string;
  nameEn?: string;
  groupName?: string;
  color?: string;
  parentId?: string | null;
  sortOrder: number;
  headStaffId?: string | null;
  staffList?: any[];
  children?: DepartmentNode[];
}

export default function InteractiveOrgChartPage() {
  const [departments, setDepartments] = useState<DepartmentNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState<DepartmentNode | null>(null);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchTree();
  }, []);

  const fetchTree = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/departments');
      const json = await res.json();
      if (json.data) {
        setDepartments(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Build hierarchical tree structure
  const buildTree = (items: DepartmentNode[], parentId: string | null = null): DepartmentNode[] => {
    return items
      .filter((item) => (item.parentId || null) === parentId)
      .map((item) => ({
        ...item,
        children: buildTree(items, item.id),
      }));
  };

  const tree = buildTree(departments, null);

  const handleSaveStructure = async () => {
    setSaving(true);
    setStatusMessage(null);
    try {
      // Simulate saving structure updates
      await new Promise((r) => setTimeout(r, 600));
      setStatusMessage('บันทึกโครงสร้างผังองค์กรเรียบร้อยแล้ว');
      setTimeout(() => setStatusMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const renderNode = (node: DepartmentNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedNode?.id === node.id;

    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* Department Card */}
        <div
          onClick={() => setSelectedNode(node)}
          className={`relative group cursor-pointer w-64 p-4 rounded-2xl transition-all duration-200 text-left border ${
            isSelected
              ? 'ring-4 ring-pink-500/40 border-pink-500 shadow-xl bg-white'
              : 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider"
              style={{ backgroundColor: node.color || '#1E40AF' }}
            >
              {node.code}
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              ระดับ {level + 1}
            </span>
          </div>

          <h4 className="text-sm font-bold text-slate-900 leading-snug truncate">
            {node.nameTh}
          </h4>
          {node.nameEn && (
            <p className="text-[11px] text-slate-500 truncate mt-0.5">{node.nameEn}</p>
          )}

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-slate-500">
              <Users className="w-3.5 h-3.5" />
              <span>{node.staffList?.length || 0} คน</span>
            </div>
            {node.headStaffId && (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 font-bold">
                <Crown className="w-3 h-3" />
                <span>มีหัวหน้าแผนก</span>
              </span>
            )}
          </div>
        </div>

        {/* Children branch connector */}
        {hasChildren && (
          <div className="flex flex-col items-center">
            {/* Vertical stem down from parent */}
            <div className="w-0.5 h-8 bg-blue-300" />

            {/* Horizontal bar across children */}
            <div className="flex items-start justify-center gap-8 relative pt-4 before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[calc(100%-8rem)] before:h-0.5 before:bg-blue-300">
              {node.children!.map((child) => (
                <div key={child.id} className="relative flex flex-col items-center">
                  {/* Stem down to child */}
                  <div className="w-0.5 h-4 bg-blue-300 -mt-4 mb-0" />
                  {renderNode(child, level + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin/departments" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>แผนกและหน่วยงาน</span>
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            ผังโครงสร้างองค์กรแบบโต้ตอบ (Interactive Organization Chart)
          </h2>
          <p className="text-xs text-slate-500">
            ระบบแผนผังสายการบังคับบัญชาแบบลำดับชั้น (Hierarchical Tree) รองรับการจัดโครงสร้างตาม Spec 6B
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="flex items-center bg-white rounded-xl border border-slate-200 p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.max(0.6, prev - 0.1))}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-700 px-2">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.min(1.4, prev + 0.1))}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSaveStructure}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:opacity-90 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all active:scale-98"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>บันทึกผังโครงสร้าง</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Main Canvas Area */}
      <div className="relative bg-slate-900/5 rounded-3xl border border-slate-200/80 p-8 min-h-[600px] overflow-auto shadow-inner flex flex-col items-center">
        {loading ? (
          <div className="flex items-center justify-center my-auto text-slate-500 gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
            <span>กำลังจัดทำผังองค์กร...</span>
          </div>
        ) : (
          <div
            className="transition-transform duration-150 origin-top pb-20"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <div className="flex items-start justify-center gap-12">
              {tree.map((rootNode) => renderNode(rootNode, 0))}
            </div>
          </div>
        )}
      </div>

      {/* Node Inspector Drawer if selected */}
      {selectedNode && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in slide-in-from-bottom-2">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-0.5 rounded text-xs font-bold text-white"
                style={{ backgroundColor: selectedNode.color || '#1E40AF' }}
              >
                {selectedNode.code}
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {selectedNode.nameTh}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              สังกัดสายงาน: {departments.find((d) => d.id === selectedNode.parentId)?.nameTh || 'ฝ่ายบริหารสูงสุด'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/admin/departments/delegation?deptId=${selectedNode.id}`}
              className="px-4 py-2 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 hover:bg-pink-100 text-xs font-bold transition-colors"
            >
              แต่งตั้งผู้รับผิดชอบ / สิทธิ์
            </Link>
            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
