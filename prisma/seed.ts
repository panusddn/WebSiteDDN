import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Datdaruni School database...');

  // 1. Branding Settings
  await prisma.brandingSetting.upsert({
    where: { id: 'branding-primary' },
    update: {},
    create: {
      id: 'branding-primary',
      schoolName: 'โรงเรียนดัดดรุณี',
      schoolNameEn: 'Datdaruni School',
      shortName: 'ด.ด.',
      websiteTitle: 'โรงเรียนดัดดรุณี | พัฒนาการเรียนรู้สู่อนาคตดิจิทัล',
      tagline: 'มุ่งมั่นพัฒนาศักยภาพผู้เรียน สู่ความเป็นเลิศทางวิชาการและเทคโนโลยีดิจิทัล',
      logoUrl: '/images/logo-ddn.png',
      faviconUrl: '/favicon.ico',
      footerText: '© 2026 โรงเรียนดัดดรุณี (Datdaruni School). สังกัดสำนักงานเขตพื้นที่การศึกษามัธยมศึกษาฉะเชิงเทรา',
      contactAddress: 'เลขที่ 1 ถนนมหาจักรพรรดิ์ ตำบลหน้าเมือง อำเภอเมืองฉะเชิงเทรา จังหวัดฉะเชิงเทรา 24000',
      contactPhone: '038-511-011',
      contactEmail: 'admin@datdaruni.ac.th',
      mapEmbedUrl: 'https://maps.google.com/?q=Datdaruni+School',
    },
  });

  // 2. Default Website Themes
  const defaultThemeColors = JSON.stringify({
    primary: '#1E40AF',       // Blue 800
    primaryLight: '#3B82F6',  // Blue 500
    secondary: '#0284C7',     // Sky 600
    accent: '#EC4899',        // Pink 500
    accentLight: '#F472B6',   // Pink 400
    background: '#F8FAFC',    // Slate 50
    surface: '#FFFFFF',
    textMain: '#0F172A',      // Slate 900
    textMuted: '#64748B',     // Slate 500
    border: '#E2E8F0',
    headerBg: '#0F172A',
    footerBg: '#0B1329',
    heroGradientStart: '#1E3A8A',
    heroGradientEnd: '#831843',
  });

  const defaultThemeTypography = JSON.stringify({
    headingFont: 'Noto Sans Thai, sans-serif',
    bodyFont: 'Noto Sans Thai, sans-serif',
    fontSizeBase: '16px',
    lineHeight: '1.6',
    fontWeightBold: '700',
  });

  const defaultThemeLayout = JSON.stringify({
    containerWidth: '1280px',
    cardRadius: '16px',
    buttonRadius: '12px',
    shadowStrength: 'medium',
    headerStyle: 'sticky',
    footerStyle: 'multi-column',
  });

  const modernTheme = await prisma.websiteTheme.upsert({
    where: { slug: 'modern-technology' },
    update: {},
    create: {
      name: 'Modern Technology (Blue & Pink)',
      slug: 'modern-technology',
      description: 'ธีมดิจิทัลนำสมัย สีน้ำเงินตัดชมพู สื่อถึงความเป็นเลิศทางวิชาการและเทคโนโลยี',
      isDefault: true,
      isActive: true,
      isDraft: false,
      version: 1,
      colors: defaultThemeColors,
      typography: defaultThemeTypography,
      layout: defaultThemeLayout,
    },
  });

  await prisma.websiteTheme.upsert({
    where: { slug: 'clean-school' },
    update: {},
    create: {
      name: 'Clean School (White & Blue)',
      slug: 'clean-school',
      description: 'ธีมเรียบหรู สบายตา โทนขาว-ฟ้า เน้นการอ่านและนำเสนอข้อมูลที่เป็นทางการ',
      isDefault: false,
      isActive: false,
      isDraft: false,
      version: 1,
      colors: JSON.stringify({
        primary: '#1D4ED8',
        primaryLight: '#60A5FA',
        secondary: '#0D9488',
        accent: '#DB2777',
        accentLight: '#F472B6',
        background: '#FFFFFF',
        surface: '#F8FAFC',
        textMain: '#1E293B',
        textMuted: '#475569',
        border: '#CBD5E1',
        headerBg: '#FFFFFF',
        footerBg: '#0F172A',
        heroGradientStart: '#1E40AF',
        heroGradientEnd: '#0284C7',
      }),
      typography: defaultThemeTypography,
      layout: defaultThemeLayout,
    },
  });

  // 3. Homepage Sections
  const sections = [
    { key: 'hero', title: 'แบนเนอร์หลักและแนะนำโรงเรียน', isEnabled: true, sortOrder: 1, layoutType: 'hero-split' },
    { key: 'news', title: 'ข่าวเด่นและประกาศล่าสุด', subtitle: 'อัปเดตความเคลื่อนไหว กิจกรรม และผลงานโรงเรียนดัดดรุณี', isEnabled: true, sortOrder: 2, layoutType: 'grid', maxItems: 6 },
    { key: 'events', title: 'ปฏิทินกิจกรรมที่กำลังจะมาถึง', subtitle: 'ติดตามกำหนดการ วันสำคัญ และกิจกรรมภายในรั้วโรงเรียน', isEnabled: true, sortOrder: 3, layoutType: 'cards', maxItems: 4 },
    { key: 'social', title: 'Social Media Feed', subtitle: 'ข่าวสารและภาพบรรยากาศสดจาก Facebook & Instagram ทางการ', isEnabled: true, sortOrder: 4, layoutType: 'feed', maxItems: 4 },
    { key: 'birthdays', title: 'สุขสันต์วันเกิดครูและบุคลากร', subtitle: 'ร่วมแสดงความยินดีและส่งกำลังใจให้แก่คุณครูในรอบสัปดาห์นี้', isEnabled: true, sortOrder: 5, layoutType: 'carousel', maxItems: 5 },
    { key: 'staff', title: 'คณะผู้บริหารและคณาจารย์', subtitle: 'บุคลากรผู้เปี่ยมด้วยคุณภาพและประสบการณ์', isEnabled: true, sortOrder: 6, layoutType: 'grid', maxItems: 4 },
    { key: 'documents', title: 'เอกสารเผยแพร่และแบบฟอร์ม', subtitle: 'ดาวน์โหลดระเบียบการ คู่มือ และเอกสารสำหรับนักเรียน/ผู้ปกครอง', isEnabled: true, sortOrder: 7, layoutType: 'list', maxItems: 5 },
    { key: 'quicklinks', title: 'บริการออนไลน์และลิงก์สำคัญ', subtitle: 'เข้าถึงระบบสารสนเทศต่างๆ ได้อย่างสะดวกรวดเร็ว', isEnabled: true, sortOrder: 8, layoutType: 'icons', maxItems: 8 },
    { key: 'contact', title: 'ติดต่อสอบถามและที่ตั้ง', subtitle: 'ยินดีต้อนรับสู่โรงเรียนดัดดรุณี อำเภอเมืองฉะเชิงเทรา', isEnabled: true, sortOrder: 9, layoutType: 'split-map' },
  ];

  for (const sec of sections) {
    await prisma.homepageSection.upsert({
      where: { key: sec.key },
      update: {},
      create: sec,
    });
  }

  // 4. Users & Roles
  const passwordHash = await bcrypt.hash('Admin@123456', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@datdaruni.ac.th' },
    update: {},
    create: {
      email: 'admin@datdaruni.ac.th',
      passwordHash,
      name: 'ผู้ดูแลระบบสูงสุด (Super Admin)',
      role: 'SUPER_ADMIN',
    },
  });

  const directorUser = await prisma.user.upsert({
    where: { email: 'director@datdaruni.ac.th' },
    update: {},
    create: {
      email: 'director@datdaruni.ac.th',
      passwordHash,
      name: 'ดร.สมพร ปัญญาเลิศ (ผู้อำนวยการ)',
      role: 'EXECUTIVE',
    },
  });

  const academicAdminUser = await prisma.user.upsert({
    where: { email: 'academic@datdaruni.ac.th' },
    update: {},
    create: {
      email: 'academic@datdaruni.ac.th',
      passwordHash,
      name: 'อาจารย์รัตนา วรรณดี (หัวหน้าฝ่ายวิชาการ)',
      role: 'DEPT_ADMIN',
    },
  });

  const teacherUser = await prisma.user.upsert({
    where: { email: 'somchai@datdaruni.ac.th' },
    update: {},
    create: {
      email: 'somchai@datdaruni.ac.th',
      passwordHash,
      name: 'ครูสมชาย เทพประสิทธิ์',
      role: 'TEACHER_STAFF',
    },
  });

  // 5. Departments Hierarchy (Parent-Child)
  const dirDept = await prisma.department.upsert({
    where: { code: 'DIR' },
    update: {},
    create: {
      code: 'DIR',
      nameTh: 'สำนักงานผู้อำนวยการ',
      nameEn: 'Office of the Director',
      groupName: 'ฝ่ายบริหาร',
      sortOrder: 1,
      color: '#1E3A8A',
      description: 'ศูนย์กลางการบริหารงานนโยบายและการขับเคลื่อนวิสัยทัศน์โรงเรียนดัดดรุณี',
    },
  });

  const acadDept = await prisma.department.upsert({
    where: { code: 'ACAD' },
    update: {},
    create: {
      code: 'ACAD',
      nameTh: 'กลุ่มบริหารวิชาการ',
      nameEn: 'Academic Administration',
      groupName: 'ฝ่ายบริหารงานวิชาการ',
      parentId: dirDept.id,
      sortOrder: 2,
      color: '#2563EB',
      description: 'พัฒนาหลักสูตร การจัดการเรียนรู้ การวัดและประเมินผล และความเป็นเลิศทางวิชาการ',
    },
  });

  const sciDept = await prisma.department.upsert({
    where: { code: 'SCI' },
    update: {},
    create: {
      code: 'SCI',
      nameTh: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี',
      nameEn: 'Science and Technology Learning Group',
      groupName: 'กลุ่มสาระการเรียนรู้',
      parentId: acadDept.id,
      sortOrder: 3,
      color: '#0284C7',
      description: 'ส่งเสริมการคิดแบบวิทยาศาสตร์ นวัตกรรม หุ่นยนต์ และเทคโนโลยีดิจิทัล',
    },
  });

  const mathDept = await prisma.department.upsert({
    where: { code: 'MATH' },
    update: {},
    create: {
      code: 'MATH',
      nameTh: 'กลุ่มสาระการเรียนรู้คณิตศาสตร์',
      nameEn: 'Mathematics Learning Group',
      groupName: 'กลุ่มสาระการเรียนรู้',
      parentId: acadDept.id,
      sortOrder: 4,
      color: '#D97706',
      description: 'พัฒนาทักษะการคำนวณ ตรรกะ และการแก้ปัญหาเชิงคณิตศาสตร์',
    },
  });

  const thaiDept = await prisma.department.upsert({
    where: { code: 'THAI' },
    update: {},
    create: {
      code: 'THAI',
      nameTh: 'กลุ่มสาระการเรียนรู้ภาษาไทย',
      nameEn: 'Thai Language Learning Group',
      groupName: 'กลุ่มสาระการเรียนรู้',
      parentId: acadDept.id,
      sortOrder: 5,
      color: '#7C3AED',
      description: 'สืบสานคุณค่าภาษาและวรรณคดีไทย พร้อมทักษะการสื่อสารในศตวรรษที่ 21',
    },
  });

  const engDept = await prisma.department.upsert({
    where: { code: 'ENG' },
    update: {},
    create: {
      code: 'ENG',
      nameTh: 'กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ',
      nameEn: 'Foreign Languages Learning Group',
      groupName: 'กลุ่มสาระการเรียนรู้',
      parentId: acadDept.id,
      sortOrder: 6,
      color: '#DB2777',
      description: 'เปิดประตูสู่สากลด้วยภาษาอังกฤษ ภาษาจีน และภาษาต่างประเทศอื่นๆ',
    },
  });

  const generalDept = await prisma.department.upsert({
    where: { code: 'GEN' },
    update: {},
    create: {
      code: 'GEN',
      nameTh: 'กลุ่มบริหารทั่วไปและอาคารสถานที่',
      nameEn: 'General Administration',
      groupName: 'ฝ่ายบริหารทั่วไป',
      parentId: dirDept.id,
      sortOrder: 7,
      color: '#059669',
      description: 'ดูแลความปลอดภัย อาคารสถานที่ สิ่งแวดล้อม และบริการชุมชน',
    },
  });

  // 6. Staff with dynamic dates of birth for age calculation and birthday wishes
  // Today's date calculations
  const now = new Date();
  const todayMonth = now.getMonth();
  const todayDate = now.getDate();

  // Create dates: one today, one in 3 days, one in 12 days, one past
  const birthToday = new Date(1985, todayMonth, todayDate);
  const birthUpcoming3 = new Date(1990, todayMonth, todayDate + 3);
  const birthUpcoming10 = new Date(1988, todayMonth, todayDate + 10);
  const birthPast = new Date(1978, (todayMonth + 10) % 12, 15);

  const staff1 = await prisma.staff.create({
    data: {
      userId: directorUser.id,
      employeeId: 'DDN001',
      prefix: 'ดร.',
      firstName: 'สมพร',
      lastName: 'ปัญญาเลิศ',
      nickname: 'พร',
      gender: 'ชาย',
      position: 'ผู้อำนวยการโรงเรียนดัดดรุณี',
      academicRank: 'เชี่ยวชาญพิเศษ',
      departmentId: dirDept.id,
      dateOfBirth: birthToday, // Birthday today!
      phone: '081-234-5678',
      email: 'director@datdaruni.ac.th',
      isExecutive: true,
      bio: 'มุ่งมั่นพัฒนาโรงเรียนดัดดรุณีสู่ความเป็นผู้นำด้านการศึกษาสมัยใหม่และปัญญาประดิษฐ์',
    },
  });

  const staff2 = await prisma.staff.create({
    data: {
      userId: academicAdminUser.id,
      employeeId: 'DDN002',
      prefix: 'นางสาว',
      firstName: 'รัตนา',
      lastName: 'วรรณดี',
      nickname: 'นา',
      gender: 'หญิง',
      position: 'รองผู้อำนวยการกลุ่มบริหารวิชาการ',
      academicRank: 'เชี่ยวชาญ',
      departmentId: acadDept.id,
      dateOfBirth: birthUpcoming3, // Birthday in 3 days!
      phone: '082-345-6789',
      email: 'academic@datdaruni.ac.th',
      isExecutive: true,
      bio: 'ผู้ริเริ่มหลักสูตร Smart Classroom และ Coding for All ในโรงเรียน',
    },
  });

  const staff3 = await prisma.staff.create({
    data: {
      userId: teacherUser.id,
      employeeId: 'DDN003',
      prefix: 'นาย',
      firstName: 'สมชาย',
      lastName: 'เทพประสิทธิ์',
      nickname: 'ชาย',
      gender: 'ชาย',
      position: 'ครูชำนาญการพิเศษ กลุ่มสาระฯ วิทยาศาสตร์และเทคโนโลยี',
      academicRank: 'ชำนาญการพิเศษ',
      departmentId: sciDept.id,
      dateOfBirth: birthUpcoming10, // Birthday in 10 days!
      phone: '083-456-7890',
      email: 'somchai@datdaruni.ac.th',
      isExecutive: false,
      bio: 'ครูที่ปรึกษาชมรมหุ่นยนต์และ AI นวัตกรรมระดับชาติ',
    },
  });

  const staff4 = await prisma.staff.create({
    data: {
      employeeId: 'DDN004',
      prefix: 'นาง',
      firstName: 'วิไลวรรณ',
      lastName: 'สุขสถิตย์',
      nickname: 'วรรณ',
      gender: 'หญิง',
      position: 'หัวหน้ากลุ่มสาระการเรียนรู้คณิตศาสตร์',
      academicRank: 'ชำนาญการพิเศษ',
      departmentId: mathDept.id,
      dateOfBirth: birthPast,
      phone: '084-567-8901',
      email: 'wilaiwan@datdaruni.ac.th',
      isExecutive: false,
      bio: 'มุ่งเน้นการสอนคณิตศาสตร์เชิงประยุกต์และ Data Thinking',
    },
  });

  // Assign head of department
  await prisma.department.update({
    where: { id: dirDept.id },
    data: { headStaffId: staff1.id },
  });
  await prisma.department.update({
    where: { id: acadDept.id },
    data: { headStaffId: staff2.id },
  });
  await prisma.department.update({
    where: { id: sciDept.id },
    data: { headStaffId: staff3.id },
  });
  await prisma.department.update({
    where: { id: mathDept.id },
    data: { headStaffId: staff4.id },
  });

  // 7. Department Delegation for Academic Admin
  await prisma.departmentAssignment.create({
    data: {
      departmentId: sciDept.id,
      userId: academicAdminUser.id,
      role: 'DEPT_ADMIN',
      permissions: JSON.stringify(['NEWS_CREATE', 'NEWS_APPROVE', 'NEWS_PUBLISH', 'STAFF_VIEW', 'DOCUMENT_MANAGE']),
      validUntil: new Date(2027, 11, 31),
    },
  });

  // 8. News Templates
  const standardTemplate = await prisma.newsTemplate.upsert({
    where: { slug: 'standard' },
    update: {},
    create: {
      name: 'มาตรฐาน (Standard Layout)',
      slug: 'standard',
      description: 'เลย์เอาต์ข่าวแบบทางการ ภาพปกด้านบน เนื้อหาพร้อมแกลเลอรีรูปและไฟล์แนบ',
      layoutType: 'STANDARD',
      isDefault: true,
      config: JSON.stringify({ showSidebar: true, showSocialShare: true }),
    },
  });

  await prisma.newsTemplate.upsert({
    where: { slug: 'hero-split' },
    update: {},
    create: {
      name: 'Hero Split (โมเดิร์นกราฟิก)',
      slug: 'hero-split',
      description: 'เลย์เอาต์ข่าวประชาสัมพันธ์ภาพกว้าง ไฮไลต์หัวข้อและสรุปย่อแบบทันสมัย',
      layoutType: 'HERO_SPLIT',
      isDefault: false,
      config: JSON.stringify({ heroHeight: 'large', badgePosition: 'top-left' }),
    },
  });

  await prisma.newsTemplate.upsert({
    where: { slug: 'formal-announcement' },
    update: {},
    create: {
      name: 'ประกาศทางการ (Formal Announcement)',
      slug: 'formal-announcement',
      description: 'เน้นความน่าเชื่อถือ ตราสัญลักษณ์โรงเรียน เลขที่หนังสือ และกล่องดาวน์โหลดเอกสารแนบ',
      layoutType: 'FORMAL_DOCUMENT',
      isDefault: false,
      config: JSON.stringify({ showSeal: true, documentBoxProminent: true }),
    },
  });

  // 9. Sample News & Announcements
  await prisma.news.upsert({
    where: { slug: 'robotics-team-national-championship-2026' },
    update: {},
    create: {
      title: 'ทีมนักเรียนโรงเรียนดัดดรุณีคว้ารางวัลชนะเลิศการแข่งขันหุ่นยนต์และปัญญาประดิษฐ์ระดับชาติ ประจำปี 2569',
      slug: 'robotics-team-national-championship-2026',
      summary: 'ขอแสดงความยินดีกับนักเรียนและคณะครูที่ปรึกษาชมรมหุ่นยนต์ โรงเรียนดัดดรุณี ที่สามารถคว้ารางวัลชนะเลิศอันดับ 1 ในการแข่งขันนวัตกรรมเยาวชนระดับประเทศ',
      content: `โรงเรียนดัดดรุณี ขอแสดงความยินดีอย่างยิ่งกับทีมนักเรียนตัวแทนโรงเรียน ที่สามารถสร้างชื่อเสียงและคว้ารางวัลชนะเลิศอันดับที่ 1 จากการแข่งขันหุ่นยนต์อัตโนมัติและนวัตกรรมปัญญาประดิษฐ์ระดับประเทศ (Thailand Youth Robotics Championship 2026)\n\nการแข่งขันในครั้งนี้มุ่งเน้นการแก้ปัญหาโลจิสติกส์อัจฉริยะและการประยุกต์ใช้ Computer Vision ซึ่งทีมนักเรียนดัดดรุณีได้แสดงศักยภาพทางวิชาการและทักษะการเขียนโปรแกรมขั้นสูง จนได้รับคะแนนสูงสุดจากคณะกรรมการผู้ทรงคุณวุฒิ`,
      contentType: 'NEWS',
      category: 'ผลงานและรางวัล',
      coverImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      isFeatured: true,
      isPinned: true,
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
      viewsCount: 1420,
      publishedAt: new Date(),
      departmentId: sciDept.id,
      authorId: teacherUser.id,
      templateId: standardTemplate.id,
    },
  });

  await prisma.news.upsert({
    where: { slug: 'admission-announcement-m1-m4-2026' },
    update: {},
    create: {
      title: 'ประกาศการรับสมัครนักเรียนเข้าศึกษาต่อระดับชั้นมัธยมศึกษาปีที่ 1 และ 4 ปีการศึกษา 2569',
      slug: 'admission-announcement-m1-m4-2026',
      summary: 'เปิดรับสมัครนักเรียนห้องเรียนพิเศษวิทยาศาสตร์-คณิตศาสตร์-เทคโนโลยี และห้องเรียนปกติ ผ่านระบบออนไลน์',
      content: `โรงเรียนดัดดรุณี ประกาศกำหนดการรับสมัครนักเรียนเข้าศึกษาต่อในระดับชั้นมัธยมศึกษาปีที่ 1 และมัธยมศึกษาปีที่ 4 ประจำปีการศึกษา 2569\n\nผู้ปกครองและนักเรียนสามารถศึกษาคุณสมบัติ กำหนดการสอบคัดเลือก และดาวน์โหลดใบสมัครผ่านศูนย์เอกสารของเว็บไซต์โรงเรียนได้ตั้งแต่วันนี้เป็นต้นไป`,
      contentType: 'ANNOUNCEMENT',
      category: 'วิชาการ/รับสมัคร',
      coverImageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      isFeatured: true,
      isPinned: true,
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
      viewsCount: 2890,
      publishedAt: new Date(Date.now() - 86400000 * 2),
      departmentId: acadDept.id,
      authorId: academicAdminUser.id,
      templateId: standardTemplate.id,
    },
  });

  await prisma.news.upsert({
    where: { slug: 'sports-day-datdaruni-games-2026' },
    update: {},
    create: {
      title: 'ภาพบรรยากาศการแข่งขันกีฬาภายใน "ดัดดรุณีเกมส์ 2569" เปี่ยมด้วยความสามัคคีและพลังสร้างสรรค์',
      slug: 'sports-day-datdaruni-games-2026',
      summary: 'ขบวนพาเหรดตระการตา การประกวดกองเชียร์ และการแข่งขันกีฬาประเภทต่างๆ สานสัมพันธ์ลูกดัดดรุณี',
      content: `บรรยากาศการแข่งขันกีฬาภายในโรงเรียนดัดดรุณี ประจำปีการศึกษา 2569 เป็นไปด้วยความสนุกสนานและสร้างสรรค์ โดยนักเรียนทุกคณะสีได้ร่วมแรงร่วมใจจัดแสดงขบวนพาเหรดที่สะท้อนแนวคิดการอนุรักษ์สิ่งแวดล้อมและเทคโนโลยียุคใหม่`,
      contentType: 'ACTIVITY',
      category: 'กิจกรรมนักเรียน',
      coverImageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
      isFeatured: false,
      isPinned: false,
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
      viewsCount: 950,
      publishedAt: new Date(Date.now() - 86400000 * 5),
      departmentId: generalDept.id,
      authorId: adminUser.id,
      templateId: standardTemplate.id,
    },
  });

  // 10. Birthday Wish Templates
  await prisma.birthdaySetting.upsert({
    where: { id: 'birthday-config' },
    update: {},
    create: {
      id: 'birthday-config',
      isEnabled: true,
      defaultWishMessage: 'ขออาราธนาคุณพระศรีรัตนตรัยและสิ่งศักดิ์สิทธิ์ โปรดดลบันดาลประทานพรให้ท่านและครอบครัวมีความสุข สุขภาพพลานามัยสมบูรณ์แข็งแรง เจริญก้าวหน้าในหน้าที่การงานตลอดไป',
      autoSendTime: '08:00',
      allowStaffOptOut: true,
      showAgePublicly: false,
    },
  });

  await prisma.birthdayWishTemplate.upsert({
    where: { id: 'template-festive-bluepink' },
    update: {},
    create: {
      id: 'template-festive-bluepink',
      name: 'Festive Blue-Pink Celebration',
      category: 'FESTIVE',
      greetingText: 'สุขสันต์วันคล้ายวันเกิด',
      signatureText: 'คณะผู้บริหาร ครู และบุคลากร โรงเรียนดัดดรุณี',
      cardTheme: JSON.stringify({
        backgroundGradient: 'linear-gradient(135deg, #1E3A8A 0%, #DB2777 100%)',
        textColor: '#FFFFFF',
        accentColor: '#F472B6',
        hasConfetti: true,
      }),
      isDefault: true,
      isActive: true,
    },
  });

  await prisma.birthdayWishTemplate.upsert({
    where: { id: 'template-academic-gold' },
    update: {},
    create: {
      id: 'template-academic-gold',
      name: 'Academic Gold & Navy',
      category: 'ACADEMIC',
      greetingText: 'กราบอวยพรเนื่องในวันคล้ายวันเกิด',
      signatureText: 'ครอบครัวดัดดรุณี',
      cardTheme: JSON.stringify({
        backgroundGradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        textColor: '#FDE047',
        accentColor: '#EAB308',
        hasConfetti: false,
      }),
      isDefault: false,
      isActive: true,
    },
  });

  // 11. Document Categories & Sample Documents
  const cat1 = await prisma.documentCategory.upsert({
    where: { name: 'แบบฟอร์มคำร้อง' },
    update: {},
    create: {
      name: 'แบบฟอร์มคำร้อง',
      description: 'แบบฟอร์มคำร้องทั่วไป ลาหยุด ขอเอกสารรับรอง',
      icon: 'FileText',
      sortOrder: 1,
    },
  });

  const cat2 = await prisma.documentCategory.upsert({
    where: { name: 'ระเบียบและแนวปฏิบัติ' },
    update: {},
    create: {
      name: 'ระเบียบและแนวปฏิบัติ',
      description: 'คู่มือนักเรียน ระเบียบว่าด้วยวินัยและความประพฤติ',
      icon: 'Shield',
      sortOrder: 2,
    },
  });

  await prisma.document.create({
    data: {
      categoryId: cat1.id,
      departmentId: acadDept.id,
      title: 'แบบคำร้องขอใบรับรองผลการเรียน (ปพ.1 / ปพ.7)',
      fileNumber: 'DDN-ACAD-2569/001',
      fileUrl: '/documents/transcript-request-form.pdf',
      fileSize: 245000,
      fileType: 'PDF',
      downloadCount: 350,
      isPublic: true,
    },
  });

  await prisma.document.create({
    data: {
      categoryId: cat2.id,
      departmentId: dirDept.id,
      title: 'คู่มือนักเรียนและระเบียบสถานศึกษา โรงเรียนดัดดรุณี ปีการศึกษา 2569',
      fileNumber: 'DDN-MANUAL-2569',
      fileUrl: '/documents/student-handbook-2569.pdf',
      fileSize: 4800000,
      fileType: 'PDF',
      downloadCount: 1280,
      isPublic: true,
    },
  });

  // 12. Calendar Events
  await prisma.event.create({
    data: {
      title: 'พิธีไหว้ครู ประจำปีการศึกษา 2569',
      description: 'พิธีแสดงความเคารพและกตัญญูกตเวทิตาต่อครูอาจารย์ ณ หอประชุมใหญ่',
      location: 'หอประชุมราชพฤกษ์ โรงเรียนดัดดรุณี',
      startDate: new Date(Date.now() + 86400000 * 4),
      category: 'พิธีการและประเพณี',
      isPublic: true,
    },
  });

  await prisma.event.create({
    data: {
      title: 'วันสอบประเมินผลกลางภาคเรียนที่ 1/2569',
      description: 'การสอบวัดผลสัมฤทธิ์ทางการเรียนระดับมัธยมศึกษาตอนต้นและตอนปลาย',
      location: 'อาคารเรียน 1-4',
      startDate: new Date(Date.now() + 86400000 * 14),
      endDate: new Date(Date.now() + 86400000 * 16),
      category: 'การสอบและวิชาการ',
      isPublic: true,
    },
  });

  // 13. Social Connection and Posts
  const fbConn = await prisma.socialConnection.create({
    data: {
      platform: 'FACEBOOK',
      accountName: 'โรงเรียนดัดดรุณี Datdaruni School Official',
      pageId: 'datdarunischool',
      isConnected: true,
      lastSyncAt: new Date(),
      syncStatus: 'SUCCESS',
    },
  });

  await prisma.socialPost.create({
    data: {
      connectionId: fbConn.id,
      externalId: 'fb_post_1001',
      message: 'ยินดีต้อนรับนักเรียนทุกคนสู่รั้วดัดดรุณี พร้อมก้าวสู่การเรียนรู้ยุคดิจิทัลอย่างมั่นใจ 💙💖 #ดัดดรุณี #โรงเรียนดิจิทัล',
      postUrl: 'https://facebook.com/datdarunischool/posts/1001',
      mediaUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      mediaType: 'IMAGE',
      postedAt: new Date(Date.now() - 3600000 * 5),
      likesCount: 245,
      sharesCount: 38,
      isVisible: true,
    },
  });

  await prisma.socialPost.create({
    data: {
      connectionId: fbConn.id,
      externalId: 'fb_post_1002',
      message: 'ชมรมดนตรีสากลซ้อมใหญ่เตรียมพร้อมสำหรับงานต้อนรับและเปิดบ้านวิชาการ Open House ประจำปีนี้ 🎷🥁🎸',
      postUrl: 'https://facebook.com/datdarunischool/posts/1002',
      mediaUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      mediaType: 'IMAGE',
      postedAt: new Date(Date.now() - 86400000),
      likesCount: 189,
      sharesCount: 22,
      isVisible: true,
    },
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
