import { cookies } from 'next/headers';
import prisma from './prisma';

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  role: string;
  staffId?: string;
  departmentId?: string;
  departmentName?: string;
}

export async function getCurrentUser(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('ddn_session_user')?.value;

  if (!sessionToken) {
    // Return default demo admin session in development if cookie is not set
    // Or return null if we want explicit login
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: sessionToken },
      include: {
        staff: {
          include: {
            department: true,
          },
        },
      },
    });

    if (!user || !user.isActive) return null;

    return {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      staffId: user.staff?.id,
      departmentId: user.staff?.departmentId ?? undefined,
      departmentName: user.staff?.department?.nameTh ?? undefined,
    };
  } catch {
    return null;
  }
}

/**
 * Checks if user has permission in a specific department
 * As mandated by Spec Section 6C (Department Administration Delegation):
 * 1. Super Admin has universal permission.
 * 2. Head of Department has default admin permission in that department.
 * 3. Delegated Staff with active DepartmentAssignment has granted permissions.
 */
export async function canManageDepartment(
  userId: string,
  departmentId: string,
  requiredPermission?: string
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      staff: true,
      departmentAssignments: {
        where: {
          departmentId,
          isActive: true,
        },
      },
    },
  });

  if (!user || !user.isActive) return false;

  // Super Admin can do anything
  if (user.role === 'SUPER_ADMIN') return true;

  // Check if user is Head of Department
  const dept = await prisma.department.findUnique({
    where: { id: departmentId },
  });

  if (dept && user.staff && dept.headStaffId === user.staff.id) {
    return true;
  }

  // Check active delegations
  const now = new Date();
  const activeAssignment = user.departmentAssignments.find(
    (a) => !a.validUntil || a.validUntil >= now
  );

  if (!activeAssignment) return false;

  if (!requiredPermission) return true;

  try {
    const permissions: string[] = JSON.parse(activeAssignment.permissions || '[]');
    return permissions.includes(requiredPermission) || permissions.includes('ALL');
  } catch {
    return false;
  }
}
