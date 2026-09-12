export interface SchoolEventType {
  id: string;
  title: string;
  description?: string;
  category: 'วิชาการ' | 'กิจกรรม' | 'วันสำคัญ' | 'การสอบ' | string;
  startDate: string; // ISO String
  endDate?: string;
  timeRange?: string;
  location: string;
  isPublic: boolean;
}

export const DEFAULT_SCHOOL_EVENTS: SchoolEventType[] = [
  {
    id: 'ev-1',
    title: 'พิธีเปิดภาคเรียนที่ 1 ประจำปีการศึกษา 2569',
    description: 'ปฐมนิเทศนักเรียนทุกระดับชั้น กิจกรรมต้อนรับนักเรียนใหม่สู่รั้วดัดดรุณี',
    category: 'วันสำคัญ',
    startDate: '2026-05-16T08:30:00.000Z',
    endDate: '2026-05-16T16:30:00.000Z',
    timeRange: '08:30 - 16:30 น.',
    location: 'หอประชุมใหญ่ โรงเรียนดัดดรุณี',
    isPublic: true,
  },
  {
    id: 'ev-2',
    title: 'การแข่งขันหุ่นยนต์และปัญญาประดิษฐ์ DDN AI & Robotics Hackathon 2026',
    description: 'การแข่งขันเขียนโค้ดและพัฒนาโครงงาน AI สำหรับนักเรียนชั้นมัธยมศึกษา',
    category: 'วิชาการ',
    startDate: '2026-06-20T08:30:00.000Z',
    endDate: '2026-06-20T16:30:00.000Z',
    timeRange: '08:30 - 16:30 น.',
    location: 'ศูนย์นวัตกรรมดิจิทัล อาคาร 5',
    isPublic: true,
  },
  {
    id: 'ev-3',
    title: 'การสอบกลางภาคเรียนที่ 1 ประจำปีการศึกษา 2569',
    description: 'ตารางการทดสอบวัดผลกลางภาคสำหรับนักเรียนชั้น ม.1 - ม.6',
    category: 'การสอบ',
    startDate: '2026-07-22T08:30:00.000Z',
    endDate: '2026-07-22T15:30:00.000Z',
    timeRange: '08:30 - 15:30 น.',
    location: 'อาคารเรียน 1-4 โรงเรียนดัดดรุณี',
    isPublic: true,
  },
  {
    id: 'ev-4',
    title: 'กิจกรรมวันแม่แห่งชาติและวันเชิดชูเกียรติครูดีเด่น',
    description: 'พิธีถวายพระพรชัยมงคล และมอบทุนการศึกษาแก่นักเรียนเรียนดี ประจำปี 2569',
    category: 'กิจกรรม',
    startDate: '2026-08-12T08:00:00.000Z',
    endDate: '2026-08-12T12:00:00.000Z',
    timeRange: '08:00 - 12:00 น.',
    location: 'หอประชุมใหญ่ โรงเรียนดัดดรุณี',
    isPublic: true,
  },
  {
    id: 'ev-5',
    title: 'สัปดาห์วันวิทยาศาสตร์และเทคโนโลยีแห่งชาติ',
    description: 'นิทรรศการโครงงานสะเต็มศึกษา (STEM) และการประกวดสิ่งประดิษฐ์นวัตกรรม',
    category: 'วิชาการ',
    startDate: '2026-08-18T08:30:00.000Z',
    endDate: '2026-08-18T16:30:00.000Z',
    timeRange: '08:30 - 16:30 น.',
    location: 'ลานกิจกรรมและหอประชุม',
    isPublic: true,
  },
  {
    id: 'ev-6',
    title: 'นิทรรศการเปิดบ้านวิชาการ Datdaruni Open House 2026',
    description: 'เปิดบ้านแสดงศักยภาพทางวิชาการ กิจกรรมชุมนุม และผลงานนักเรียนสู่ชุมชน',
    category: 'วิชาการ',
    startDate: '2026-11-15T08:30:00.000Z',
    endDate: '2026-11-15T16:00:00.000Z',
    timeRange: '08:30 - 16:00 น.',
    location: 'โรงเรียนดัดดรุณี',
    isPublic: true,
  },
];
