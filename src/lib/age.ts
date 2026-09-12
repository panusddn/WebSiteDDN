/**
 * Age Calculation & Birthday Utility
 *
 * As mandated by Datdaruni School Spec Section 6A & 13A:
 * - Age MUST be calculated dynamically from date of birth, never stored as a fixed value.
 * - Handles upcoming birthdays (today, 7 days, 30 days).
 * - Formats Thai Buddhist calendar dates (พ.ศ.).
 */

export interface AgeDetail {
  years: number;
  months: number;
  days: number;
  formattedText: string;
}

export function calculateAge(dateOfBirth: Date | string | null | undefined): AgeDetail | null {
  if (!dateOfBirth) return null;

  const birth = new Date(dateOfBirth);
  if (isNaN(birth.getTime())) return null;

  const now = new Date();

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    // Days in previous month
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const formattedText = years > 0 ? `${years} ปี ${months > 0 ? `${months} เดือน` : ''}`.trim() : `${months} เดือน`;

  return { years, months, days, formattedText };
}

export interface BirthdayStatus {
  isToday: boolean;
  isUpcoming7Days: boolean;
  isUpcoming30Days: boolean;
  daysRemaining: number;
  nextBirthday: Date;
}

export function getBirthdayStatus(dateOfBirth: Date | string | null | undefined): BirthdayStatus | null {
  if (!dateOfBirth) return null;

  const birth = new Date(dateOfBirth);
  if (isNaN(birth.getTime())) return null;

  const now = new Date();
  const currentYear = now.getFullYear();

  // Next birthday this year
  let nextBday = new Date(currentYear, birth.getMonth(), birth.getDate());

  // Set times to midnight for clean day comparisons
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const bdayMidnight = new Date(nextBday.getFullYear(), nextBday.getMonth(), nextBday.getDate());

  // If already passed this year, it's next year
  if (bdayMidnight < todayMidnight) {
    nextBday = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
  }

  const diffMs = nextBday.getTime() - todayMidnight.getTime();
  const daysRemaining = Math.round(diffMs / (1000 * 60 * 60 * 24));

  const isToday = daysRemaining === 0;
  const isUpcoming7Days = daysRemaining >= 0 && daysRemaining <= 7;
  const isUpcoming30Days = daysRemaining >= 0 && daysRemaining <= 30;

  return {
    isToday,
    isUpcoming7Days,
    isUpcoming30Days,
    daysRemaining,
    nextBirthday: nextBday,
  };
}

export function formatThaiDate(date: Date | string | null | undefined, includeYear = true): string {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';

  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
  ];

  const day = d.getDate();
  const month = thaiMonths[d.getMonth()];
  const thaiYear = d.getFullYear() + 543;

  return includeYear ? `${day} ${month} ${thaiYear}` : `${day} ${month}`;
}
