import prisma from '@/lib/prisma';
import { DEFAULT_SCHOOL_EVENTS, SchoolEventType } from './calendarConstants';

export type { SchoolEventType };
export { DEFAULT_SCHOOL_EVENTS };

export async function getSchoolEvents(category?: string): Promise<SchoolEventType[]> {
  let events: SchoolEventType[] = [];

  try {
    // If an Event model exists in Prisma, fetch it safely
    if ((prisma as any).event && typeof (prisma as any).event.findMany === 'function') {
      const whereClause: any = { isPublic: true };
      if (category && category !== 'all') {
        whereClause.category = category;
      }
      const dbEvents = await (prisma as any).event.findMany({
        where: whereClause,
        orderBy: { startDate: 'asc' },
      });
      if (dbEvents && dbEvents.length > 0) {
        events = dbEvents.map((e: any) => ({
          ...e,
          startDate: typeof e.startDate === 'string' ? e.startDate : e.startDate.toISOString(),
          endDate: e.endDate ? (typeof e.endDate === 'string' ? e.endDate : e.endDate.toISOString()) : undefined,
        }));
      }
    }
  } catch (err) {
    console.warn('Cannot fetch events from DB, falling back to default calendar:', err);
  }

  // Fallback to DEFAULT_SCHOOL_EVENTS
  if (events.length === 0) {
    events = [...DEFAULT_SCHOOL_EVENTS];
  }

  // Filter by category if specified
  if (category && category !== 'all') {
    const term = category.trim();
    events = events.filter((e) => {
      if (e.category === term) return true;
      if (term === 'วิชาการ' && e.category.includes('วิชาการ')) return true;
      if (term === 'กิจกรรม' && e.category.includes('กิจกรรม')) return true;
      if (term === 'วันสำคัญ' && (e.category.includes('วันสำคัญ') || e.category.includes('วันหยุด'))) return true;
      if (term === 'การสอบ' && e.category.includes('สอบ')) return true;
      return false;
    });
  }

  // Sort by startDate ascending
  events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return events;
}
