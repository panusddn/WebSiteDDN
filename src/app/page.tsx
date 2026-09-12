'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/public/Navbar';
import PublicFooter from '@/components/public/Footer';
import {
  Sparkles,
  ArrowRight,
  Play,
  Bot,
  Code,
  FlaskConical,
  Lightbulb,
  Megaphone,
  GraduationCap,
  User,
  Users,
  Calendar,
  Download,
  CalendarDays,
  Quote,
  Award,
  BookOpen,
  Trophy,
  MapPin,
} from 'lucide-react';
import { DEFAULT_NEWS_ITEMS, NewsItemType } from '@/lib/newsConstants';
import { DEFAULT_SCHOOL_EVENTS, SchoolEventType } from '@/lib/calendarConstants';
import { formatThaiDate } from '@/lib/age';

/* ============================================================
   Count-Up Hook (for School Statistics)
   ============================================================ */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

/* ============================================================
   Fade-Up Observer Hook
   ============================================================ */
function useFadeUp() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ============================================================
   Stat Counter Component
   ============================================================ */
function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  iconBg,
  iconColor,
}: {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  iconBg: string;
  iconColor: string;
}) {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs card-lift">
      <div className={`w-14 h-14 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center`}>
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <span className="text-3xl sm:text-4xl font-black text-[#07182F] block leading-none">
          {count.toLocaleString()}{suffix}
        </span>
        <span className="text-xs sm:text-sm text-[#53627A] font-medium mt-1 block">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   STUDENT ACHIEVEMENTS DATA
   ============================================================ */
const studentAchievements = [
  {
    id: 1,
    title: 'รางวัลชนะเลิศการแข่งขันหุ่นยนต์อัตโนมัติระดับชาติ 2569',
    category: 'ROBOTICS & AI',
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'ตัวแทนเยาวชนไทยนำเสนอนวัตกรรมพลังงานสะอาด ณ ประเทศญี่ปุ่น',
    category: 'GLOBAL INNOVATION',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'ทีมพัฒนานวัตกรรมแอปพลิเคชันเพื่อการศึกษา Smart School',
    category: 'CODING & SOFTWARE',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'เหรียญทองกรีฑาเยาวชนระดับภาคตะวันออก',
    category: 'SPORTS EXCELLENCE',
    img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    title: 'วงดุริยางค์สากลและดนตรีสร้างสรรค์รางวัลเกียรติยศ',
    category: 'ARTS & MUSIC',
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
  },
];

/* ============================================================
   MAIN PAGE COMPONENT
   ============================================================ */
export default function HomePage() {
  // Fade-up refs for each section
  const heroRef = useFadeUp();
  const quickRef = useFadeUp();
  const aboutRef = useFadeUp();
  const statsRef = useFadeUp();
  const learningRef = useFadeUp();
  const newsRef = useFadeUp();
  const eventsRef = useFadeUp();
  const achieveRef = useFadeUp();
  const ctaRef = useFadeUp();

  const [newsList, setNewsList] = useState<NewsItemType[]>(DEFAULT_NEWS_ITEMS);
  const [calendarEvents, setCalendarEvents] = useState<SchoolEventType[]>(DEFAULT_SCHOOL_EVENTS);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setNewsList(data.data);
        }
      })
      .catch(() => {});

    fetch('/api/calendar?limit=4')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCalendarEvents(data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB] text-[#07182F] antialiased overflow-x-hidden">
      {/* ================================================================
          1. NAVBAR
      ================================================================ */}
      <PublicNavbar />

      <main className="flex-1">
        {/* ================================================================
            2. HERO SECTION
        ================================================================ */}
        <section
          ref={heroRef as React.RefObject<HTMLElement>}
          className="fade-up visible relative overflow-hidden bg-gradient-to-br from-[#07182F] via-[#0B1E48] to-[#1a0f30] text-white pt-12 pb-28 sm:pt-16 sm:pb-36"
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1265F3]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-[#FF4F9A]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Headlines & CTAs */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Future Ready Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 text-xs font-bold tracking-wider uppercase shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>FUTURE READY SCHOOL</span>
                </div>

                {/* Main Heading — Kanit font via CSS var */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                  สร้างอนาคต <br />
                  <span className="text-white">ด้วยการเรียนรู้</span> <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2979FF] via-[#8B5CF6] to-[#FF4F9A]">
                    ที่ไร้ขีดจำกัด
                  </span>
                </h1>

                {/* Supporting Text */}
                <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                  พัฒนาผู้เรียนด้วยเทคโนโลยี นวัตกรรม และทักษะแห่งอนาคต
                  เรียนรู้ผ่านการลงมือทำ เพื่อก้าวสู่โลกยุคดิจิทัลอย่างมั่นใจ
                </p>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#1265F3] via-[#8B5CF6] to-[#FF4F9A] hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all active:scale-98"
                  >
                    <span>สำรวจโรงเรียนของเรา</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/#curriculum"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm backdrop-blur-md border border-white/25 transition-all active:scale-98"
                  >
                    <span>ดูหลักสูตร</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Student Visual & Robot */}
              <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
                {/* Floating quote callout */}
                <div className="absolute top-2 left-0 sm:-left-6 z-20 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-2 text-xs font-semibold text-white shadow-xl animate-float">
                  <span className="text-[#FF4F9A] font-bold block">ที่นี่...</span>
                  <span>มากกว่าการเรียน คือการสร้างอนาคต</span>
                </div>

                {/* Main Visual Image */}
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-gradient-to-tr from-blue-900/60 to-pink-900/40 p-2">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                    alt="นักเรียนโรงเรียนดัดดรุณี"
                    className="w-full h-full object-cover rounded-2xl"
                  />

                  {/* DDN AI Robot Badge */}
                  <div className="absolute bottom-4 right-4 bg-[#07182F]/90 backdrop-blur-md border border-white/25 p-3 rounded-2xl shadow-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-[#1265F3] flex items-center justify-center text-white shadow-md">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <span className="text-[11px] font-bold text-white block">DDN AI Robot</span>
                      <span className="text-[9px] text-cyan-300 font-medium">Smart Assistant</span>
                    </div>
                  </div>
                </div>

                {/* Vertical keyword pills */}
                <div className="hidden xl:flex flex-col gap-2 absolute -right-16 top-1/2 -translate-y-1/2 z-20 text-[10px] font-black tracking-widest">
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">AI</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">ROBOTICS</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">CODING</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">STEM</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">CREATIVE</span>
                  <span className="text-[#FF4F9A] text-center">=</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#FF4F9A] text-white text-center">FUTURE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            3. QUICK ACCESS MENU (6 Floating Cards)
        ================================================================ */}
        <section
          ref={quickRef as React.RefObject<HTMLElement>}
          id="quick-access"
          className="fade-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-30"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-4 sm:p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { href: '/news', icon: Megaphone, label: 'ข่าวประชาสัมพันธ์', desc: 'อัปเดตข่าวสารล่าสุด', bg: 'bg-pink-50', color: 'text-[#FF4F9A]' },
              { href: '/admin/dashboard', icon: GraduationCap, label: 'สำหรับนักเรียน', desc: 'ระบบและบริการนักเรียน', bg: 'bg-blue-50', color: 'text-[#1265F3]' },
              { href: '/admin/dashboard', icon: User, label: 'สำหรับครู', desc: 'ระบบสำหรับบุคลากร', bg: 'bg-purple-50', color: 'text-[#8B5CF6]' },
              { href: '/contact', icon: Users, label: 'สำหรับผู้ปกครอง', desc: 'ข้อมูลและช่องทางติดต่อ', bg: 'bg-indigo-50', color: 'text-indigo-600' },
              { href: '/calendar', icon: CalendarDays, label: 'ปฏิทินกิจกรรม', desc: 'กิจกรรมและตารางเวลา', bg: 'bg-amber-50', color: 'text-amber-500' },
              { href: '/documents', icon: Download, label: 'ดาวน์โหลดเอกสาร', desc: 'แบบฟอร์มและเอกสารต่างๆ', bg: 'bg-rose-50', color: 'text-rose-500' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-slate-50 transition-all group card-lift"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#07182F] group-hover:text-[#1265F3] transition-colors">
                  {item.label}
                </span>
                <span className="text-[10px] text-[#53627A] mt-0.5">
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ================================================================
            4. ABOUT OUR SCHOOL (Video + Quote + Description)
        ================================================================ */}
        <section
          ref={aboutRef as React.RefObject<HTMLElement>}
          id="about"
          className="fade-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Video Card */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80"
                alt="อาคารเรียนโรงเรียนดัดดรุณี"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07182F]/80 via-[#07182F]/30 to-transparent flex flex-col justify-between p-6">
                <div className="text-white font-serif italic text-sm">
                  "โรงเรียนของเรา โรงเรียนแห่งโอกาส สำหรับทุกคน"
                </div>
                {/* Play Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1265F3] shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-[#1265F3] ml-1" />
                </div>
                <div className="text-white font-bold text-xs">
                  โรงเรียนดัดดรุณี • DATDARUNI SCHOOL
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[#FF4F9A] font-bold text-xs uppercase tracking-wider block mb-1">
                    ― ABOUT OUR SCHOOL
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07182F] tracking-tight leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                    โรงเรียนแห่งการเรียนรู้ <br />
                    สำหรับโลกแห่งอนาคต
                  </h2>
                </div>

                {/* Quote */}
                <div className="hidden sm:block p-4 rounded-2xl bg-pink-50/80 border border-pink-100 max-w-xs text-right text-xs">
                  <Quote className="w-5 h-5 text-[#FF4F9A] ml-auto mb-1 opacity-70" />
                  <p className="font-semibold text-[#07182F] italic">
                    "การศึกษา คือพลังที่ยิ่งใหญ่ที่สุด ในการเปลี่ยนแปลงโลก"
                  </p>
                  <span className="text-[10px] text-[#FF4F9A] font-bold mt-1 block">
                    Education Changes Everything
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#53627A] leading-relaxed">
                เรามุ่งสร้างพื้นที่การเรียนรู้ที่ส่งเสริมความคิดสร้างสรรค์ เทคโนโลยี และนวัตกรรม
                เพื่อพัฒนาผู้เรียนให้พร้อมสำหรับโลกที่เปลี่ยนแปลงอย่างรวดเร็ว ด้วยหลักสูตรที่ทันสมัยและคณาจารย์ผู้เชี่ยวชาญ
              </p>

              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full gradient-main text-white text-xs font-bold shadow-md hover:opacity-95 transition-all"
                >
                  <span>รู้จักโรงเรียนของเรา</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            5. SCHOOL STATISTICS (Separate Section — Count-Up)
        ================================================================ */}
        <section
          ref={statsRef as React.RefObject<HTMLElement>}
          className="fade-up bg-gradient-to-r from-[#EEF6FF] to-[#F5F0FF] py-14 sm:py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#1265F3] font-bold text-xs uppercase tracking-wider block mb-1">
                ✦ SCHOOL STATISTICS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07182F] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                ตัวเลขความภาคภูมิใจ
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <StatCard icon={GraduationCap} value={1500} suffix="+" label="นักเรียน" iconBg="bg-[#8B5CF6]/10" iconColor="text-[#8B5CF6]" />
              <StatCard icon={Users} value={80} suffix="+" label="ครูและบุคลากร" iconBg="bg-[#1265F3]/10" iconColor="text-[#1265F3]" />
              <StatCard icon={Trophy} value={50} suffix="+" label="รางวัลและผลงาน" iconBg="bg-[#FF4F9A]/10" iconColor="text-[#FF4F9A]" />
              <StatCard icon={BookOpen} value={25} suffix="+" label="หลักสูตรและกิจกรรม" iconBg="bg-cyan-500/10" iconColor="text-cyan-600" />
            </div>
          </div>
        </section>

        {/* ================================================================
            6. FUTURE LEARNING (4 Skills Cards)
        ================================================================ */}
        <section
          ref={learningRef as React.RefObject<HTMLElement>}
          id="curriculum"
          className="fade-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-8"
        >
          <div>
            <span className="text-[#FF4F9A] font-bold text-xs uppercase tracking-wider block mb-1">
              ⚡ FUTURE LEARNING
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07182F] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              เรียนรู้ทักษะแห่งอนาคต
            </h2>
            <p className="text-xs text-[#53627A] mt-0.5">
              Discover • Learn • Build • Create
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Bot, title: 'Robotics & AI', desc: 'เรียนรู้หุ่นยนต์ ระบบอัตโนมัติ และปัญญาประดิษฐ์', bg: 'bg-cyan-50', color: 'text-cyan-600' },
              { icon: Code, title: 'Coding & Digital', desc: 'พัฒนาการคิดเชิงคำนวณ ผ่านการเขียนโปรแกรม', bg: 'bg-blue-50', color: 'text-[#1265F3]' },
              { icon: FlaskConical, title: 'STEM Education', desc: 'เชื่อมโยงวิทยาศาสตร์ เทคโนโลยี วิศวกรรม และคณิตศาสตร์', bg: 'bg-teal-50', color: 'text-teal-600' },
              { icon: Lightbulb, title: 'Innovation Lab', desc: 'เปลี่ยนความคิดสร้างสรรค์ ให้กลายเป็นผลงานจริง', bg: 'bg-pink-50', color: 'text-[#FF4F9A]' },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs text-center space-y-3 group card-hover">
                <div className={`w-14 h-14 rounded-2xl ${card.bg} ${card.color} mx-auto flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#07182F]">{card.title}</h3>
                <p className="text-xs text-[#53627A] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
            7. NEWS & UPDATES (Separate Section — Bento Grid)
        ================================================================ */}
        <section
          ref={newsRef as React.RefObject<HTMLElement>}
          id="news"
          className="fade-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[#FF4F9A] font-bold text-xs uppercase tracking-wider block mb-1">
                ― NEWS & UPDATES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07182F] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                ข่าวสารและกิจกรรมล่าสุด
              </h2>
              <p className="text-xs text-[#53627A] mt-0.5">
                อัปเดตทุกเรื่องราวของโรงเรียน
              </p>
            </div>

            <Link
              href="/news"
              className="px-5 py-2 rounded-full gradient-main text-white text-xs font-bold shadow-sm hover:opacity-95 transition-all self-start sm:self-auto"
            >
              ดูข่าวสารทั้งหมด →
            </Link>
          </div>

          {/* Bento Grid: 1 Main + 3 Side */}
          {newsList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              {/* Main Featured Card (7 cols) */}
              {newsList[0] && (
                <div className="sm:col-span-7 bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs group card-hover flex flex-col">
                  <Link href={`/news/${newsList[0].slug}`} className="block relative aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={newsList[0].coverImageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'}
                      alt={newsList[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#FF4F9A] text-white shadow-xs">
                        {newsList[0].category || 'ข่าวสาร'}
                      </span>
                      {newsList[0].department?.nameTh && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#07182F]/80 text-white backdrop-blur-xs">
                          {newsList[0].department.nameTh}
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <span className="text-[11px] text-[#53627A] font-medium block">
                        {formatThaiDate(newsList[0].publishedAt || newsList[0].createdAt)}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#07182F] group-hover:text-[#1265F3] transition-colors leading-snug">
                        <Link href={`/news/${newsList[0].slug}`}>{newsList[0].title}</Link>
                      </h3>
                      <p className="text-xs text-[#53627A] line-clamp-2 leading-relaxed font-normal">
                        {newsList[0].summary}
                      </p>
                    </div>
                    <Link
                      href={`/news/${newsList[0].slug}`}
                      className="text-xs font-bold text-[#FF4F9A] hover:text-[#1265F3] flex items-center gap-1 self-start transition-colors pt-2"
                    >
                      <span>อ่านต่อ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* 3 Stacked Side Cards (5 cols) */}
              <div className="sm:col-span-5 flex flex-col justify-between gap-3">
                {newsList.slice(1, 4).map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="p-3 sm:p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3.5 group card-lift active:scale-[0.98] transition-all"
                  >
                    <img
                      src={item.coverImageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=300&q=80'}
                      alt={item.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#1265F3]">
                          {item.category || 'ทั่วไป'}
                        </span>
                        <span className="text-[10px] text-[#53627A]">
                          {formatThaiDate(item.publishedAt || item.createdAt)}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#07182F] group-hover:text-[#1265F3] transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ================================================================
            8. UPCOMING EVENTS (Separate Section)
        ================================================================ */}
        <section
          ref={eventsRef as React.RefObject<HTMLElement>}
          id="events"
          className="fade-up bg-white py-14 sm:py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[#1265F3] font-bold text-xs uppercase tracking-wider block mb-1">
                  ― UPCOMING EVENTS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07182F] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  กิจกรรมที่กำลังจะมาถึง
                </h2>
              </div>

              <Link
                href="/calendar"
                className="px-5 py-2 rounded-full border-2 border-[#1265F3] text-[#1265F3] hover:bg-[#1265F3] hover:text-white text-xs font-bold transition-all self-start sm:self-auto"
              >
                ดูปฏิทินทั้งหมด →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {calendarEvents.slice(0, 4).map((ev) => {
                const evDate = new Date(ev.startDate);
                const day = evDate.getDate().toString().padStart(2, '0');
                const month = evDate.toLocaleString('th-TH', { month: 'short' });

                return (
                  <Link
                    key={ev.id}
                    href="/calendar"
                    className="flex items-center gap-4 p-4 bg-[#F5F7FB] rounded-2xl border border-slate-200/80 group card-lift active:scale-[0.98] transition-all"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#1265F3] via-[#8B5CF6] to-[#FF4F9A] text-white flex flex-col items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <span className="text-lg sm:text-xl font-black leading-none">{day}</span>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase mt-0.5">{month}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-[#1265F3]">
                          {ev.category || 'กิจกรรม'}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#07182F] group-hover:text-[#1265F3] transition-colors line-clamp-1 leading-snug">
                        {ev.title}
                      </h4>
                      <span className="text-[10px] sm:text-xs text-[#53627A] flex items-center gap-1 mt-1 line-clamp-1">
                        <MapPin className="w-3 h-3 text-[#FF4F9A] shrink-0" />
                        <span>{ev.location}</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================
            9. STUDENT ACHIEVEMENTS (Dark Navy Carousel)
        ================================================================ */}
        <section
          ref={achieveRef as React.RefObject<HTMLElement>}
          id="achievements"
          className="fade-up bg-gradient-to-br from-[#05172F] to-[#082A58] text-white py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[#FF4F9A] font-bold text-xs uppercase tracking-wider block mb-1">
                  ✦ PROUD OF OUR STUDENTS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  ทุกความสำเร็จ เริ่มต้นจากการเรียนรู้
                </h2>
              </div>

              <Link
                href="/about"
                className="px-6 py-2 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs font-bold transition-all self-start sm:self-auto"
              >
                ชมผลงานทั้งหมด →
              </Link>
            </div>

            {/* Achievement Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {studentAchievements.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md shadow-lg group hover:border-[#FF4F9A]/60 transition-all flex flex-col"
                >
                  <div className="aspect-4/3 overflow-hidden bg-slate-900">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <span className="text-[9px] font-bold text-[#FF4F9A] tracking-wider">{item.category}</span>
                    <h4 className="text-xs font-bold text-white mt-1 line-clamp-2 leading-snug">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots indicator */}
            <div className="flex items-center justify-center gap-1.5 pt-2">
              <span className="w-6 h-1.5 rounded-full bg-[#FF4F9A]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>
          </div>
        </section>

        {/* ================================================================
            10. CALL TO ACTION BANNER
        ================================================================ */}
        <section
          ref={ctaRef as React.RefObject<HTMLElement>}
          className="fade-up relative overflow-hidden bg-gradient-to-r from-[#1265F3] via-[#8B5CF6] to-[#FF4F9A] text-white py-14 sm:py-16"
        >
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#FF4F9A]/20 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: VR Student */}
              <div className="lg:col-span-4 flex items-center justify-center lg:justify-start">
                <div className="w-56 sm:w-64 aspect-square rounded-3xl overflow-hidden border-2 border-white/30 shadow-2xl bg-white/10 p-2">
                  <img
                    src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=500&q=80"
                    alt="VR Future Learning"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>

              {/* Center: Text & Buttons */}
              <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  เริ่มต้นการเรียนรู้ <br />
                  เพื่อสร้างอนาคตไปกับเรา
                </h2>
                <p className="text-xs sm:text-sm text-pink-100">
                  มาร่วมเป็นส่วนหนึ่งของโรงเรียนแห่งโอกาส และสร้างอนาคตไปด้วยกัน
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <Link
                    href="/news"
                    className="px-6 py-2.5 rounded-full bg-[#FF4F9A] hover:bg-pink-400 text-white text-xs font-bold shadow-md transition-all active:scale-98"
                  >
                    สมัครเรียน
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-2.5 rounded-full bg-white text-[#07182F] hover:bg-slate-100 text-xs font-bold shadow-md transition-all active:scale-98"
                  >
                    ติดต่อโรงเรียน →
                  </Link>
                </div>
              </div>

              {/* Right: Dream Learn Create */}
              <div className="hidden lg:flex lg:col-span-3 flex-col items-center justify-center text-center space-y-1 font-serif italic text-white/90">
                <span className="text-sm font-light">Dream</span>
                <span className="text-sm font-light">Learn</span>
                <span className="text-sm font-light">Create</span>
                <span className="text-lg font-bold text-pink-200">Grow Together</span>
                <span className="text-xs text-cyan-200 not-italic">Learn • Create • Innovate</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================================================================
          11. FOOTER
      ================================================================ */}
      <PublicFooter />
    </div>
  );
}
