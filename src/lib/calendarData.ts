import prisma from '@/lib/prisma';
import { DEFAULT_SCHOOL_EVENTS, SchoolEventType } from './calendarConstants';

export type { SchoolEventType };
export { DEFAULT_SCHOOL_EVENTS };

// In-memory persistent cache for server lifecycle
let inMemoryEvents: SchoolEventType[] = [...DEFAULT_SCHOOL_EVENTS];

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
    console.warn('Cannot fetch events from DB, falling back to memory store:', err);
  }

  // Fallback to in-memory store
  if (events.length === 0) {
    events = [...inMemoryEvents];
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

export async function addSchoolEvent(data: Omit<SchoolEventType, 'id'>): Promise<SchoolEventType> {
  const newEvent: SchoolEventType = {
    id: `ev-${Date.now()}`,
    ...data,
  };

  try {
    if ((prisma as any).event && typeof (prisma as any).event.create === 'function') {
      const created = await (prisma as any).event.create({
        data: {
          title: data.title,
          description: data.description || '',
          category: data.category,
          startDate: new Date(data.startDate),
          endDate: data.endDate ? new Date(data.endDate) : null,
          location: data.location,
          isPublic: data.isPublic !== false,
        },
      });
      if (created) {
        newEvent.id = created.id;
      }
    }
  } catch (err) {
    console.warn('Cannot save event to DB, keeping in memory store:', err);
  }

  inMemoryEvents.unshift(newEvent);
  return newEvent;
}

export async function deleteSchoolEvent(id: string): Promise<boolean> {
  try {
    if ((prisma as any).event && typeof (prisma as any).event.delete === 'function') {
      await (prisma as any).event.delete({ where: { id } }).catch(() => {});
    }
  } catch (err) {
    console.warn('Cannot delete event from DB:', err);
  }

  inMemoryEvents = inMemoryEvents.filter((e) => e.id !== id);
  return true;
}
