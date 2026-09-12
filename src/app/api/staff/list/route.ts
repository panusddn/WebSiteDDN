import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const DEFAULT_STAFF = [
  {
    id: 's1',
    employeeId: 'DDN001',
    prefix: 'ดร.',
    firstName: 'สมพร',
    lastName: 'ปัญญาเลิศ',
    nickname: 'พร',
    gender: 'ชาย',
    position: 'ผู้อำนวยการโรงเรียนดัดดรุณี',
    academicRank: 'เชี่ยวชาญพิเศษ',
    departmentId: 'dep-dir',
    department: { id: 'dep-dir', nameTh: 'สำนักงานผู้อำนวยการ', code: 'DIR' },
    dateOfBirth: '1980-08-12T00:00:00.000Z',
    phone: '081-234-5678',
    email: 'director@datdaruni.ac.th',
    bio: 'มุ่งมั่นพัฒนาโรงเรียนดัดดรุณีสู่ความเป็นผู้นำด้านการศึกษาสมัยใหม่และปัญญาประดิษฐ์',
    isExecutive: true,
    hideAgePublic: false,
    hideBirthday: false,
  },
  {
    id: 's2',
    employeeId: 'DDN002',
    prefix: 'นาง',
    firstName: 'กัญญาภัทร',
    lastName: 'วรกิจเจริญ',
    nickname: 'กัญญา',
    gender: 'หญิง',
    position: 'รองผู้อำนวยการกลุ่มบริหารวิชาการ',
    academicRank: 'ชำนาญการพิเศษ',
    departmentId: 'dep-acad',
    department: { id: 'dep-acad', nameTh: 'กลุ่มบริหารวิชาการ', code: 'ACAD' },
    dateOfBirth: '1984-03-25T00:00:00.000Z',
    phone: '082-345-6789',
    email: 'academic@datdaruni.ac.th',
    bio: 'ขับเคลื่อนหลักสูตรความเป็นเลิศทางวิชาการและทักษะแห่งอนาคต',
    isExecutive: true,
    hideAgePublic: false,
    hideBirthday: false,
  },
  {
    id: 's3',
    employeeId: 'DDN003',
    prefix: 'นาย',
    firstName: 'ชาญณรงค์',
    lastName: 'ปรีชาญชัย',
    nickname: 'ณรงค์',
    gender: 'ชาย',
    position: 'หัวหน้ากลุ่มสาระฯ วิทยาศาสตร์และเทคโนโลยี',
    academicRank: 'ชำนาญการพิเศษ',
    departmentId: 'dep-sci',
    department: { id: 'dep-sci', nameTh: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี', code: 'SCI' },
    dateOfBirth: '1988-11-04T00:00:00.000Z',
    phone: '083-456-7890',
    email: 'science@datdaruni.ac.th',
    bio: 'ส่งเสริมการคิดเชิงนวัตกรรม วิทยาศาสตร์ ดิจิทัล และสะเต็มศึกษา',
    isExecutive: false,
    hideAgePublic: false,
    hideBirthday: false,
  },
  {
    id: 's4',
    employeeId: 'DDN004',
    prefix: 'นางสาว',
    firstName: 'สุดารัตน์',
    lastName: 'เจริญสุข',
    nickname: 'ดา',
    gender: 'หญิง',
    position: 'หัวหน้ากลุ่มสาระฯ คณิตศาสตร์',
    academicRank: 'ชำนาญการ',
    departmentId: 'dep-math',
    department: { id: 'dep-math', nameTh: 'กลุ่มสาระการเรียนรู้คณิตศาสตร์', code: 'MATH' },
    dateOfBirth: '1992-05-18T00:00:00.000Z',
    phone: '084-567-8901',
    email: 'math@datdaruni.ac.th',
    bio: 'คณิตศาสตร์พัฒนาสมองและทักษะการแก้ปัญหาในชีวิตประจำวัน',
    isExecutive: false,
    hideAgePublic: false,
    hideBirthday: false,
  },
];

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      where: { isActive: true },
      include: {
        department: true,
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    if (!staff || staff.length === 0) {
      return NextResponse.json({ success: true, data: DEFAULT_STAFF });
    }

    return NextResponse.json({ success: true, data: staff });
  } catch (error: any) {
    console.warn('Database error in /api/staff/list, returning default staff:', error);
    return NextResponse.json({ success: true, data: DEFAULT_STAFF });
  }
}
