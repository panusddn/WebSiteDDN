import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export const metadata = {
  title: 'DDN Portal | ระบบบริหารจัดการโรงเรียนดัดดรุณี',
  description: 'Management Portal สำหรับผู้บริหาร ครู และบุคลากรโรงเรียนดัดดรุณี',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Fixed Admin Sidebar */}
      <AdminSidebar userRole="SUPER_ADMIN" userName="ผู้ดูแลระบบสูงสุด" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
