import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const DEMO_USERS = [
  {
    id: 'user-admin',
    email: 'admin@datdaruni.ac.th',
    name: 'ผู้ดูแลระบบสูงสุด',
    role: 'SUPER_ADMIN',
    password: 'Admin@123456',
  },
  {
    id: 'user-director',
    email: 'director@datdaruni.ac.th',
    name: 'นายสมหมาย การุณวิทย์ (ผู้อำนวยการ)',
    role: 'EXECUTIVE',
    password: 'Admin@123456',
  },
  {
    id: 'user-academic',
    email: 'academic@datdaruni.ac.th',
    name: 'นางกัญญาภัทร วรกิจเจริญ (รองฯ วิชาการ)',
    role: 'DEPT_ADMIN',
    password: 'Admin@123456',
  },
  {
    id: 'user-teacher',
    email: 'teacher@datdaruni.ac.th',
    name: 'ครูสมศรี มีสุข',
    role: 'TEACHER_STAFF',
    password: 'Admin@123456',
  },
];

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'กรุณาระบุอีเมลและรหัสผ่าน' }, { status: 400 });
    }

    let user: any = null;

    try {
      user = await prisma.user.findUnique({
        where: { email },
      });
    } catch (dbErr) {
      console.warn('Database lookup failed, falling back to demo users:', dbErr);
    }

    // Check if user is in database
    if (user && user.isActive) {
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (isValid) {
        // Record login audit log if possible
        try {
          await prisma.auditLog.create({
            data: {
              action: 'LOGIN',
              entityType: 'USER',
              entityId: user.id,
              userId: user.id,
              details: JSON.stringify({ email: user.email }),
            },
          });
        } catch {
          // ignore audit log error on read-only environments
        }

        const response = NextResponse.json({
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });

        response.cookies.set('ddn_session_user', user.id, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        });

        return response;
      }
    }

    // Fallback: Check Demo Users (for Vercel serverless / preview environments)
    const demo = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (demo && (password === demo.password || password === 'Admin@123456')) {
      const response = NextResponse.json({
        success: true,
        user: {
          id: demo.id,
          name: demo.name,
          email: demo.email,
          role: demo.role,
        },
      });

      response.cookies.set('ddn_session_user', demo.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return NextResponse.json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'เข้าสู่ระบบล้มเหลว' }, { status: 500 });
  }
}
