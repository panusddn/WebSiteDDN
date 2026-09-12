export interface NewsItemType {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImageUrl: string;
  category: string;
  contentType?: string;
  isPinned: boolean;
  isFeatured?: boolean;
  viewsCount: number;
  publishedAt: string | Date | null;
  createdAt: string | Date;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  department?: {
    id?: string;
    nameTh: string;
    code?: string;
  } | null;
  author?: {
    id?: string;
    name: string;
  } | null;
  template?: {
    id?: string;
    name: string;
  } | null;
}

export const DEFAULT_NEWS_ITEMS: NewsItemType[] = [
  {
    id: 'news-1',
    title: 'พิธีมอบเกียรติบัตรและรางวัลดีเด่นแก่นักเรียนผู้สร้างชื่อเสียงระดับประเทศ',
    slug: 'award-ceremony-2569',
    summary: 'โรงเรียนดัดดรุณีจัดพิธีมอบเกียรติบัตรเชิดชูเกียรตินักเรียนที่มีผลงานวิชาการและนวัตกรรมดีเด่น ประจำปีการศึกษา 2569 ณ หอประชุมใหญ่',
    content: `โรงเรียนดัดดรุณีได้จัดพิธีมอบเกียรติบัตรและโล่รางวัลเชิดชูเกียรติแก่นักเรียนที่ได้สร้างชื่อเสียงให้แก่โรงเรียนในระดับประเทศและระดับนานาชาติ ประจำปีการศึกษา 2569 ณ หอประชุมใหญ่โรงเรียนดัดดรุณี

โดยมี ดร.สมพร ปัญญาเลิศ ผู้อำนวยการโรงเรียนดัดดรุณี เป็นประธานในพิธี พร้อมด้วยคณะรองผู้อำนวยการ คณะครู และตัวแทนสมาคมผู้ปกครองและครูโรงเรียนดัดดรุณีเข้าร่วมแสดงความยินดี

กิจกรรมในครั้งนี้จัดขึ้นเพื่อส่งเสริมและสร้างแรงบันดาลใจให้แก่นักเรียนทุกคนในการมุ่งมั่นพัฒนาตนเองสู่ความเป็นเลิศในทุกมิติ ทั้งด้านวิชาการ นวัตกรรมเทคโนโลยี กีฬา และคุณธรรมจริยธรรม`,
    coverImageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    category: 'วิชาการ',
    contentType: 'NEWS',
    isPinned: true,
    isFeatured: true,
    viewsCount: 1420,
    publishedAt: '2026-05-18T00:00:00.000Z',
    createdAt: '2026-05-18T00:00:00.000Z',
    status: 'PUBLISHED',
    department: { nameTh: 'กลุ่มบริหารวิชาการ', code: 'ACAD' },
    author: { name: 'งานประชาสัมพันธ์' },
    template: { name: 'Standard News' },
  },
  {
    id: 'news-2',
    title: 'ประกาศผลการแข่งขันโครงงานวิทยาศาสตร์และนวัตกรรม AI ระดับชาติ 2026',
    slug: 'ai-robotics-competition-winner',
    summary: 'ทีมนักเรียนโรงเรียนดัดดรุณีคว้ารางวัลชนะเลิศอันดับ 1 ในการแข่งขันโครงงานปัญญาประดิษฐ์และหุ่นยนต์อัตโนมัติ',
    content: `ขอแสดงความยินดีอย่างยิ่งกับทีมนักเรียนแผนการเรียนวิทยาศาสตร์-คอมพิวเตอร์ โรงเรียนดัดดรุณี ที่ได้รับรางวัลชนะเลิศอันดับที่ 1 จากการแข่งขันโครงงานปัญญาประดิษฐ์และหุ่นยนต์อัตโนมัติ ระดับชาติ ประจำปี 2569 (National AI & Robotics Hackathon 2026)

ผลงานที่ได้รับรางวัลชนะเลิศคือ "Smart School Waste Sorting AI" ระบบคัดแยกขยะอัจฉริยะด้วยการประมวลผลภาพคอมพิวเตอร์วิทัศน์ (Computer Vision) ซึ่งพัฒนาขึ้นเพื่อแก้ปัญหาสิ่งแวดล้อมในสถานศึกษา

ครูผู้ควบคุมทีม: ครูชาญณรงค์ ปรีชาญชัย หัวหน้ากลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี`,
    coverImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    category: 'ผลงานนักเรียน',
    contentType: 'NEWS',
    isPinned: true,
    isFeatured: true,
    viewsCount: 980,
    publishedAt: '2026-05-12T00:00:00.000Z',
    createdAt: '2026-05-12T00:00:00.000Z',
    status: 'PUBLISHED',
    department: { nameTh: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี', code: 'SCI' },
    author: { name: 'ครูชาญณรงค์ ปรีชาญชัย' },
    template: { name: 'Standard News' },
  },
  {
    id: 'news-3',
    title: 'กำหนดการประชุมผู้ปกครองภาคเรียนที่ 1 ปีการศึกษา 2569',
    slug: 'parent-meeting-term1-2569',
    summary: 'ขอเชิญผู้ปกครองนักเรียนทุกระดับชั้นเข้าร่วมการประชุมเพื่อสร้างความเข้าใจและร่วมมือพัฒนาผู้เรียน ณ หอประชุมโรงเรียนดัดดรุณี',
    content: `โรงเรียนดัดดรุณีขอเรียนเชิญผู้ปกครองนักเรียนทุกระดับชั้น (ม.1 ถึง ม.6) เข้าร่วมการประชุมผู้ปกครอง ประจำภาคเรียนที่ 1 ปีการศึกษา 2569

กำหนดการแบ่งตามระดับชั้น:
- ระดับชั้นมัธยมศึกษาตอนต้น (ม.1 - ม.3): วันเสาร์ เวลา 08:30 - 12:00 น.
- ระดับชั้นมัธยมศึกษาตอนปลาย (ม.4 - ม.6): วันอาทิตย์ เวลา 08:30 - 12:00 น.

เพื่อรับทราบนโยบายการจัดการศึกษา ทิศทางการพัฒนาผู้เรียนในยุคดิจิทัล และพบปะครูที่ปรึกษาประจำห้องเรียน`,
    coverImageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    category: 'ประกาศ',
    contentType: 'ANNOUNCEMENT',
    isPinned: false,
    isFeatured: false,
    viewsCount: 840,
    publishedAt: '2026-05-08T00:00:00.000Z',
    createdAt: '2026-05-08T00:00:00.000Z',
    status: 'PUBLISHED',
    department: { nameTh: 'สำนักงานผู้อำนวยการ', code: 'DIR' },
    author: { name: 'ฝ่ายบริหารงานทั่วไป' },
    template: { name: 'Formal Document' },
  },
  {
    id: 'news-4',
    title: 'เปิดรับสมัครนักเรียนเข้าศึกษาต่อห้องเรียนพิเศษ SMTE และห้องเรียนปกติ ปีการศึกษา 2569',
    slug: 'admission-announcement-m1-m4-2026',
    summary: 'เปิดรับสมัครนักเรียนห้องเรียนพิเศษวิทยาศาสตร์-คณิตศาสตร์-เทคโนโลยี และห้องเรียนปกติ ผ่านระบบออนไลน์โรงเรียนดัดดรุณี',
    content: `โรงเรียนดัดดรุณี ประกาศกำหนดการรับสมัครนักเรียนเข้าศึกษาต่อในระดับชั้นมัธยมศึกษาปีที่ 1 และมัธยมศึกษาปีที่ 4 ประจำปีการศึกษา 2569

ผู้ปกครองและนักเรียนสามารถศึกษาคุณสมบัติ กำหนดการสอบคัดเลือก และดาวน์โหลดใบสมัครผ่านระบบออนไลน์ของโรงเรียนดัดดรุณี ได้ตั้งแต่วันนี้เป็นต้นไป

สอบถามรายละเอียดเพิ่มเติมได้ที่ กลุ่มบริหารวิชาการ โทร. 038-511-011`,
    coverImageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    category: 'ประกาศ',
    contentType: 'ANNOUNCEMENT',
    isPinned: false,
    isFeatured: true,
    viewsCount: 2890,
    publishedAt: '2026-05-06T00:00:00.000Z',
    createdAt: '2026-05-06T00:00:00.000Z',
    status: 'PUBLISHED',
    department: { nameTh: 'กลุ่มบริหารวิชาการ', code: 'ACAD' },
    author: { name: 'กลุ่มบริหารวิชาการ' },
    template: { name: 'Formal Document' },
  },
  {
    id: 'news-5',
    title: 'ภาพบรรยากาศการแข่งขันกีฬาภายใน "ดัดดรุณีเกมส์ 2569" เปี่ยมด้วยความสามัคคีและพลังสร้างสรรค์',
    slug: 'sports-day-datdaruni-games-2026',
    summary: 'ขบวนพาเหรดตระการตา การประกวดกองเชียร์ และการแข่งขันกีฬาประเภทต่างๆ สานสัมพันธ์ลูกดัดดรุณี',
    content: `บรรยากาศการแข่งขันกีฬาภายในโรงเรียนดัดดรุณี ประจำปีการศึกษา 2569 เป็นไปด้วยความสนุกสนานและสร้างสรรค์ โดยนักเรียนทุกคณะสีได้ร่วมแรงร่วมใจจัดแสดงขบวนพาเหรดที่สะท้อนแนวคิดการอนุรักษ์สิ่งแวดล้อมและเทคโนโลยียุคใหม่

การแข่งขันประกอบด้วย กรีฑา วอลเลย์บอล บาสเกตบอล และกีฬาพื้นบ้าน เพื่อส่งเสริมสุขภาพพลานามัยและความมีน้ำใจนักกีฬา`,
    coverImageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    category: 'กิจกรรม',
    contentType: 'ACTIVITY',
    isPinned: false,
    isFeatured: false,
    viewsCount: 950,
    publishedAt: '2026-05-02T00:00:00.000Z',
    createdAt: '2026-05-02T00:00:00.000Z',
    status: 'PUBLISHED',
    department: { nameTh: 'กลุ่มบริหารทั่วไปและอาคารสถานที่', code: 'GEN' },
    author: { name: 'กลุ่มบริหารทั่วไป' },
    template: { name: 'Photo Gallery' },
  },
  {
    id: 'news-6',
    title: 'โครงการอบรมเชิงปฏิบัติการพัฒนาทักษะดิจิทัลและ Generative AI สำหรับคณาจารย์',
    slug: 'teacher-digital-skills-workshop',
    summary: 'เสริมศักยภาพครูยุคดิจิทัลด้วยการประยุกต์ใช้ Generative AI ในการออกแบบการเรียนการสอนและพัฒนานวัตกรรม',
    content: `กลุ่มบริหารงานบุคคล ร่วมกับกลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี จัดการอบรมเชิงปฏิบัติการให้แก่คณะครู เพื่อพัฒนาทักษะการใช้เครื่องมือ Generative AI สำหรับการจัดการเรียนรู้ในศตวรรษที่ 21

เพื่อให้ครูสามารถนำเทคโนโลยีปัญญาประดิษฐ์มาช่วยวิเคราะห์และพัฒนาศักยภาพผู้เรียนได้อย่างมีประสิทธิภาพและเท่าทันการเปลี่ยนแปลงของโลก`,
    coverImageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    category: 'วิชาการ',
    contentType: 'NEWS',
    isPinned: false,
    isFeatured: false,
    viewsCount: 650,
    publishedAt: '2026-04-28T00:00:00.000Z',
    createdAt: '2026-04-28T00:00:00.000Z',
    status: 'PUBLISHED',
    department: { nameTh: 'ฝ่ายบริหารงานบุคคล', code: 'HR' },
    author: { name: 'ครูกัญญาภัทร วรกิจเจริญ' },
    template: { name: 'Standard News' },
  },
];
