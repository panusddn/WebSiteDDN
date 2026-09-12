import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { parseStaffExcelBuffer } from '@/lib/excel';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const action = formData.get('action') as string | null; // 'preview' | 'commit'

    if (!file) {
      return NextResponse.json({ error: 'ไม่พบไฟล์ที่อัปโหลด' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Fetch departments from DB for matching
    const departments = await prisma.department.findMany({
      select: { id: true, nameTh: true, code: true },
    });

    const parsed = parseStaffExcelBuffer(buffer, departments);

    // If only preview requested
    if (action === 'preview') {
      return NextResponse.json({
        success: true,
        data: parsed,
      });
    }

    // Commit to database
    if (action === 'commit') {
      if (parsed.validRows.length === 0) {
        return NextResponse.json(
          { error: 'ไม่มีแถวข้อมูลที่ถูกต้องสำหรับการนำเข้า' },
          { status: 400 }
        );
      }

      // 1. Create StaffImport history
      const importRecord = await prisma.staffImport.create({
        data: {
          fileName: file.name,
          totalRows: parsed.totalRows,
          successRows: parsed.validRows.length,
          failedRows: parsed.invalidRows.length,
          status: 'COMPLETED',
        },
      });

      // 2. Insert valid staff rows
      for (const row of parsed.validRows) {
        await prisma.staff.create({
          data: {
            firstName: row.firstName,
            lastName: row.lastName,
            departmentId: row.matchedDepartmentId,
            position: 'ครูผู้สอน',
            prefix: 'ครู',
          },
        });

        await prisma.staffImportRow.create({
          data: {
            importId: importRecord.id,
            rowNumber: row.rowNumber,
            firstName: row.firstName,
            lastName: row.lastName,
            departmentName: row.departmentName,
            status: 'SUCCESS',
          },
        });
      }

      // 3. Record failed rows in import logs
      for (const row of parsed.invalidRows) {
        await prisma.staffImportRow.create({
          data: {
            importId: importRecord.id,
            rowNumber: row.rowNumber,
            firstName: row.firstName || '-',
            lastName: row.lastName || '-',
            departmentName: row.departmentName || '-',
            status: 'ERROR',
            errorMessage: row.errors.join(', '),
          },
        });
      }

      // 4. Record Audit Log
      await prisma.auditLog.create({
        data: {
          action: 'IMPORT',
          entityType: 'STAFF',
          entityId: importRecord.id,
          details: JSON.stringify({
            fileName: file.name,
            totalRows: parsed.totalRows,
            successRows: parsed.validRows.length,
            failedRows: parsed.invalidRows.length,
          }),
        },
      });

      return NextResponse.json({
        success: true,
        message: `นำเข้าข้อมูลสำเร็จ ${parsed.validRows.length} รายการ`,
        importId: importRecord.id,
        summary: {
          total: parsed.totalRows,
          success: parsed.validRows.length,
          failed: parsed.invalidRows.length,
        },
      });
    }

    return NextResponse.json({ error: 'ระบุคำสั่ง action ไม่ถูกต้อง' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'เกิดข้อผิดพลาดในการประมวลผลไฟล์' },
      { status: 500 }
    );
  }
}
