/**
 * Staff Excel Import & Template Utility
 *
 * As mandated by Datdaruni School Spec Section 6A:
 * - Accepts strictly 3 columns:
 *   1. ชื่อ (First Name)
 *   2. นามสกุล (Last Name)
 *   3. แผนก (Department)
 * - Validates columns, detects duplicates, matches department names, and provides a preview.
 */

import * as XLSX from 'xlsx';

export interface ParsedStaffRow {
  rowNumber: number;
  firstName: string;
  lastName: string;
  departmentName: string;
  matchedDepartmentId?: string;
  isValid: boolean;
  isDuplicate?: boolean;
  errors: string[];
}

export interface ParseExcelResult {
  totalRows: number;
  validRows: ParsedStaffRow[];
  invalidRows: ParsedStaffRow[];
  duplicates: ParsedStaffRow[];
  allRows: ParsedStaffRow[];
}

export function parseStaffExcelBuffer(
  buffer: Buffer,
  departments: { id: string; nameTh: string; code: string }[]
): ParseExcelResult {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  // Convert to JSON array of objects or arrays
  const rawRows: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

  if (rawRows.length === 0) {
    throw new Error('ไฟล์ว่างเปล่า กรุณาตรวจสอบข้อมูล');
  }

  // Find header row
  let headerIndex = -1;
  let fnCol = -1;
  let lnCol = -1;
  let deptCol = -1;

  for (let i = 0; i < Math.min(rawRows.length, 5); i++) {
    const row = rawRows[i];
    for (let c = 0; c < row.length; c++) {
      const val = String(row[c] || '').trim().toLowerCase();
      if (val.includes('ชื่อ') && !val.includes('นามสกุล') && !val.includes('แผนก')) fnCol = c;
      if (val.includes('นามสกุล') || val.includes('สกุล') || val.includes('last')) lnCol = c;
      if (val.includes('แผนก') || val.includes('กลุ่มสาระ') || val.includes('ฝ่าย') || val.includes('dept')) deptCol = c;
    }
    if (fnCol !== -1 && lnCol !== -1 && deptCol !== -1) {
      headerIndex = i;
      break;
    }
  }

  // If standard headers not found, fallback to columns 0, 1, 2
  if (headerIndex === -1) {
    headerIndex = 0;
    fnCol = 0;
    lnCol = 1;
    deptCol = 2;
  }

  const allRows: ParsedStaffRow[] = [];
  const seenKeys = new Set<string>();

  for (let r = headerIndex + 1; r < rawRows.length; r++) {
    const row = rawRows[r];
    if (!row || row.length === 0) continue;

    const firstName = String(row[fnCol] || '').trim();
    const lastName = String(row[lnCol] || '').trim();
    const departmentName = String(row[deptCol] || '').trim();

    // Skip empty trailing rows
    if (!firstName && !lastName && !departmentName) continue;

    const errors: string[] = [];
    if (!firstName) errors.push('ไม่ได้ระบุชื่อ');
    if (!lastName) errors.push('ไม่ได้ระบุนามสกุล');
    if (!departmentName) errors.push('ไม่ได้ระบุแผนก/กลุ่มสาระ');

    // Duplicate check in this sheet
    const fullKey = `${firstName}_${lastName}`;
    let isDuplicate = false;
    if (seenKeys.has(fullKey)) {
      isDuplicate = true;
      errors.push('ข้อมูลชื่อ-นามสกุล ซ้ำกันในไฟล์');
    } else if (firstName && lastName) {
      seenKeys.add(fullKey);
    }

    // Match department
    let matchedDepartmentId: string | undefined;
    if (departmentName) {
      const match = departments.find(
        (d) =>
          d.nameTh.toLowerCase().includes(departmentName.toLowerCase()) ||
          departmentName.toLowerCase().includes(d.nameTh.toLowerCase()) ||
          d.code.toLowerCase() === departmentName.toLowerCase()
      );
      if (match) {
        matchedDepartmentId = match.id;
      } else {
        errors.push(`ไม่พบแผนก "${departmentName}" ในระบบ`);
      }
    }

    const isValid = errors.length === 0;

    allRows.push({
      rowNumber: r + 1,
      firstName,
      lastName,
      departmentName,
      matchedDepartmentId,
      isValid,
      isDuplicate,
      errors,
    });
  }

  const validRows = allRows.filter((r) => r.isValid);
  const invalidRows = allRows.filter((r) => !r.isValid);
  const duplicates = allRows.filter((r) => r.isDuplicate);

  return {
    totalRows: allRows.length,
    validRows,
    invalidRows,
    duplicates,
    allRows,
  };
}

export function generateStaffTemplateBuffer(): Buffer {
  const wsData = [
    ['ชื่อ', 'นามสกุล', 'แผนก'],
    ['สมใจ', 'รักเรียน', 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี'],
    ['วิเชียร', 'สมานฉันท์', 'กลุ่มสาระการเรียนรู้คณิตศาสตร์'],
    ['กานดา', 'สุขสมบูรณ์', 'กลุ่มสาระการเรียนรู้ภาษาไทย'],
    ['ปิยะ', 'สิทธิโชค', 'กลุ่มบริหารทั่วไปและอาคารสถานที่'],
  ];

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  // Set column widths
  ws['!cols'] = [{ wch: 18 }, { wch: 22 }, { wch: 45 }];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'StaffTemplate');

  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
}
