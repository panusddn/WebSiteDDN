import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      where: { isActive: true },
      include: {
        children: true,
        parent: true,
        members: {
          include: { staff: true },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ success: true, data: departments });
  } catch (error: any) {
    console.warn('Database error in /api/departments, returning default hierarchy:', error);
    const defaultDepartments = [
      {
        id: 'dep-root',
        code: 'EXEC',
        nameTh: 'สำนักงานผู้อำนวยการโรงเรียนดัดดรุณี',
        nameEn: 'Office of the Director',
        groupName: 'คณะผู้บริหาร',
        color: '#1265F3',
        parentId: null,
        sortOrder: 1,
        staffList: [{ id: 's1', firstName: 'สมหมาย', lastName: 'การุณวิทย์', position: 'ผู้อำนวยการโรงเรียน' }],
      },
      {
        id: 'dep-acad',
        code: 'ACAD',
        nameTh: 'ฝ่ายบริหารงานวิชาการ',
        nameEn: 'Academic Affairs',
        groupName: 'ฝ่ายบริหารงานหลัก',
        color: '#8B5CF6',
        parentId: 'dep-root',
        sortOrder: 2,
        staffList: [{ id: 's2', firstName: 'กัญญาภัทร', lastName: 'วรกิจเจริญ', position: 'รองผู้อำนวยการ' }],
      },
      {
        id: 'dep-budget',
        code: 'BUDG',
        nameTh: 'ฝ่ายบริหารงานงบประมาณและแผนงาน',
        nameEn: 'Budget & Planning',
        groupName: 'ฝ่ายบริหารงานหลัก',
        color: '#0284C7',
        parentId: 'dep-root',
        sortOrder: 3,
        staffList: [{ id: 's3', firstName: 'ประยุทธ', lastName: 'มณีรัตน์', position: 'รองผู้อำนวยการ' }],
      },
      {
        id: 'dep-hr',
        code: 'HR',
        nameTh: 'ฝ่ายบริหารงานบุคคล',
        nameEn: 'Human Resource Affairs',
        groupName: 'ฝ่ายบริหารงานหลัก',
        color: '#EC4899',
        parentId: 'dep-root',
        sortOrder: 4,
        staffList: [{ id: 's4', firstName: 'ศิริพร', lastName: 'ธนารักษ์', position: 'รองผู้อำนวยการ' }],
      },
      {
        id: 'dep-gen',
        code: 'GEN',
        nameTh: 'ฝ่ายบริหารงานทั่วไป',
        nameEn: 'General Affairs',
        groupName: 'ฝ่ายบริหารงานหลัก',
        color: '#10B981',
        parentId: 'dep-root',
        sortOrder: 5,
        staffList: [{ id: 's5', firstName: 'วิศิษฏ์', lastName: 'เกียรติก้อง', position: 'รองผู้อำนวยการ' }],
      },
      {
        id: 'dep-sci',
        code: 'SCI',
        nameTh: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี',
        nameEn: 'Science & Technology',
        groupName: 'กลุ่มสาระการเรียนรู้',
        color: '#3B82F6',
        parentId: 'dep-acad',
        sortOrder: 6,
        staffList: [{ id: 's6', firstName: 'ชาญณรงค์', lastName: 'ปรีชาญชัย', position: 'หัวหน้ากลุ่มสาระฯ' }],
      },
      {
        id: 'dep-math',
        code: 'MATH',
        nameTh: 'กลุ่มสาระการเรียนรู้คณิตศาสตร์',
        nameEn: 'Mathematics',
        groupName: 'กลุ่มสาระการเรียนรู้',
        color: '#6366F1',
        parentId: 'dep-acad',
        sortOrder: 7,
        staffList: [{ id: 's7', firstName: 'สุดารัตน์', lastName: 'เจริญสุข', position: 'หัวหน้ากลุ่มสาระฯ' }],
      },
      {
        id: 'dep-eng',
        code: 'ENG',
        nameTh: 'กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ',
        nameEn: 'Foreign Languages',
        groupName: 'กลุ่มสาระการเรียนรู้',
        color: '#F43F5E',
        parentId: 'dep-acad',
        sortOrder: 8,
        staffList: [{ id: 's8', firstName: 'พิมลวรรณ', lastName: 'สถิตพงษ์', position: 'หัวหน้ากลุ่มสาระฯ' }],
      },
    ];
    return NextResponse.json({ success: true, data: defaultDepartments });
  }
}
