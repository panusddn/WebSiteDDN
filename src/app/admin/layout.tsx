import React from 'react';
import AdminShell from '@/components/admin/AdminShell';

export const metadata = {
  title: 'DDN Portal | ระบบบริหารจัดการโรงเรียนดัดดรุณี',
  description: 'Management Portal สำหรับผู้บริหาร ครู และบุคลากรโรงเรียนดัดดรุณี',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
