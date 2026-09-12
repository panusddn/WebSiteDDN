# Landing Page Structure — เว็บไซต์โรงเรียนสมัยใหม่

> แนวคิดการออกแบบ: **Modern Education × Future Technology**  
> Mood & Tone: **น้ำเงิน • ชมพู • ม่วง • เทคโนโลยี • การศึกษา • ทันสมัย • สดใส • น่าเชื่อถือ**

---

## 1. ภาพรวมของ Landing Page

Landing Page นี้ออกแบบสำหรับเว็บไซต์โรงเรียนสมัยใหม่ โดยเน้นภาพลักษณ์ของโรงเรียนที่พร้อมสำหรับอนาคต มีความโดดเด่นด้าน:

- เทคโนโลยี
- Robotics
- Coding
- AI
- STEM
- Innovation
- Digital Learning
- การพัฒนาทักษะแห่งศตวรรษที่ 21

เป้าหมายหลักของหน้า Landing Page:

1. สร้างความประทับใจแรกให้กับผู้เข้าชม
2. สื่อภาพลักษณ์ของโรงเรียนที่ทันสมัย
3. ช่วยให้นักเรียน ผู้ปกครอง ครู และบุคลากรเข้าถึงเมนูสำคัญได้ง่าย
4. แสดงข่าวสาร กิจกรรม ผลงาน และความสำเร็จของโรงเรียน
5. เชื่อมต่อไปยังระบบออนไลน์ต่าง ๆ ของโรงเรียน
6. รองรับการใช้งานบน Desktop, Tablet และ Mobile

---

# 2. Design System

## 2.1 Color Palette

### Primary Colors

- Deep Navy: `#07182F`
- Primary Blue: `#1265F3`
- Electric Blue: `#2979FF`
- Vivid Pink: `#FF4F9A`
- Purple: `#8B5CF6`

### Supporting Colors

- Light Blue Background: `#EEF6FF`
- Soft Gray: `#F5F7FB`
- White: `#FFFFFF`
- Dark Text: `#07182F`
- Secondary Text: `#53627A`

### Main Gradient

```css
background: linear-gradient(
  135deg,
  #1265F3 0%,
  #8B5CF6 55%,
  #FF4F9A 100%
);
```

---

## 2.2 Typography

### Heading

แนะนำใช้:

- `Kanit`
- `Noto Sans Thai`

```css
font-family: "Kanit", sans-serif;
```

### Body

แนะนำใช้:

- `Sarabun`
- `Noto Sans Thai`

```css
font-family: "Sarabun", sans-serif;
```

---

## 2.3 UI Style

- Border Radius: `18px - 28px`
- Button Radius: `999px`
- Card Shadow: Soft Blue / Purple Shadow
- Glassmorphism
- Gradient Border
- Subtle Glow
- Smooth Hover Animation
- Fade Up Animation
- Floating Elements
- Count-Up Animation
- Micro Interaction

---

# 3. Page Structure

โครงสร้างหลักของหน้า:

```text
Navbar
↓
Hero Section
↓
Quick Access Menu
↓
About School
↓
School Statistics
↓
Future Learning
↓
News & Updates
↓
Upcoming Events
↓
Student Achievements
↓
Call To Action
↓
Footer
```

---

# 4. Header / Navbar

## จุดประสงค์

เป็นเมนูนำทางหลักของเว็บไซต์ และช่วยให้ผู้ใช้เข้าถึงส่วนต่าง ๆ ได้อย่างรวดเร็ว

## Layout

### ด้านซ้าย

- Logo โรงเรียน
- ชื่อโรงเรียนภาษาไทย
- ชื่อโรงเรียนภาษาอังกฤษ

ตัวอย่าง:

```text
[LOGO]

โรงเรียนอนาคตวิทยา
ANAKOTWITTAYA SCHOOL
```

### ด้านกลาง / ด้านขวา

เมนู:

- หน้าแรก
- เกี่ยวกับเรา
- หลักสูตร
- ข่าวสาร
- บุคลากร
- ผลงานนักเรียน
- ติดต่อเรา

### Action

- Search Icon
- ปุ่ม `เข้าสู่ระบบ`

## Interaction

- Sticky Navbar
- Navbar เปลี่ยน Shadow เมื่อ Scroll
- Active Menu ใช้สี Primary Blue
- Login Button ใช้ Blue → Pink Gradient

---

# 5. Hero Section

## Concept

Hero ต้องสร้างความประทับใจทันที และสื่อว่าโรงเรียนมีความทันสมัยด้านเทคโนโลยีและการศึกษา

## Layout

Desktop:

```text
------------------------------------------------
|              |                               |
|  Main Text   | Student / School / Robot      |
|              | Technology Visual             |
|  CTA Buttons |                               |
------------------------------------------------
```

Mobile:

```text
Main Text
CTA Buttons
Student / Technology Image
```

---

## Badge

```text
✦ FUTURE READY SCHOOL
```

---

## Main Heading

```text
สร้างอนาคต
ด้วยการเรียนรู้
ที่ไร้ขีดจำกัด
```

คำว่า

```text
ที่ไร้ขีดจำกัด
```

ใช้ Gradient Blue → Pink

---

## Supporting Text

```text
พัฒนาผู้เรียนด้วยเทคโนโลยี นวัตกรรม และทักษะแห่งอนาคต
เรียนรู้ผ่านการลงมือทำ เพื่อก้าวสู่โลกยุคดิจิทัลอย่างมั่นใจ
```

---

## CTA Buttons

Primary:

```text
สำรวจโรงเรียนของเรา →
```

Secondary:

```text
ดูหลักสูตร
```

---

## Visual Elements

แนะนำใช้ภาพ:

- นักเรียนชายและหญิง
- อาคารโรงเรียน
- Robot
- AI Graphic
- Coding
- STEM
- Digital Grid
- Circuit Pattern
- Glass Shapes
- Neon Glow

ด้านขวาสามารถมีรายการแนวตั้ง:

```text
AI
ROBOTICS
CODING
STEM
CREATIVE
A BETTER FUTURE
```

---

# 6. Quick Access Menu

วางเป็น Floating Card ซ้อนใต้ Hero Section

## จำนวนเมนู

6 เมนู

### 1. ข่าวประชาสัมพันธ์

```text
อัปเดตข่าวสารล่าสุด
```

### 2. สำหรับนักเรียน

```text
ระบบและบริการนักเรียน
```

### 3. สำหรับครู

```text
ระบบสำหรับบุคลากร
```

### 4. สำหรับผู้ปกครอง

```text
ข้อมูลและช่องทางติดต่อ
```

### 5. ปฏิทินกิจกรรม

```text
กิจกรรมและตารางเวลา
```

### 6. ดาวน์โหลดเอกสาร

```text
แบบฟอร์มและเอกสารต่าง ๆ
```

## UI

- Background: White
- Border Radius: 24px
- Icon Gradient
- Hover: Card ยกขึ้น `translateY(-6px)`
- Hover Shadow
- รองรับ Horizontal Scroll บน Mobile

---

# 7. About School Section

## Label

```text
ABOUT OUR SCHOOL
```

## Heading

```text
โรงเรียนแห่งการเรียนรู้
สำหรับโลกแห่งอนาคต
```

## Description

```text
เรามุ่งสร้างพื้นที่การเรียนรู้ที่ส่งเสริมความคิดสร้างสรรค์
เทคโนโลยี และนวัตกรรม เพื่อพัฒนาผู้เรียนให้พร้อม
สำหรับโลกที่เปลี่ยนแปลง
```

## CTA

```text
รู้จักโรงเรียนของเรา →
```

---

## Image Area

ใช้:

- ภาพอาคารโรงเรียน
- ภาพ Drone Shot
- ภาพ Campus
- ปุ่ม Play สำหรับเปิดวิดีโอแนะนำโรงเรียน

---

## Quote

```text
“การศึกษา
คือพลังที่ยิ่งใหญ่ที่สุด
ในการเปลี่ยนแปลงโลก”
```

---

# 8. School Statistics

แสดงข้อมูลสถิติแบบ Counter

ตัวอย่าง:

```text
1,500+
นักเรียน
```

```text
80+
ครูและบุคลากร
```

```text
50+
รางวัลและผลงาน
```

```text
25+
หลักสูตรและกิจกรรม
```

## Interaction

ใช้ Count-Up Animation เมื่อ Scroll ถึง Section

---

# 9. Future Learning Section

## Label

```text
FUTURE LEARNING
```

## Heading

```text
เรียนรู้ทักษะแห่งอนาคต
```

## Subtitle

```text
Discover • Learn • Build • Create
```

---

## Learning Cards

### Card 1 — Robotics & AI

```text
Robotics & AI

เรียนรู้หุ่นยนต์ ระบบอัตโนมัติ
และปัญญาประดิษฐ์
```

Icon:

```text
Robot
```

---

### Card 2 — Coding & Digital

```text
Coding & Digital

พัฒนาการคิดเชิงคำนวณ
ผ่านการเขียนโปรแกรม
```

Icon:

```text
</>
```

---

### Card 3 — STEM Education

```text
STEM Education

เชื่อมโยงวิทยาศาสตร์ เทคโนโลยี
วิศวกรรม และคณิตศาสตร์
```

Icon:

```text
Flask
```

---

### Card 4 — Innovation Lab

```text
Innovation Lab

เปลี่ยนความคิดสร้างสรรค์
ให้กลายเป็นผลงานจริง
```

Icon:

```text
Light Bulb
```

---

# 10. News & Updates Section

## Label

```text
NEWS & UPDATES
```

## Heading

```text
ข่าวสารและ
กิจกรรมล่าสุด
```

## Subtitle

```text
อัปเดตทุกเรื่องราวของโรงเรียน
```

---

## Layout

ใช้ Bento Grid

Desktop:

```text
---------------------------------------------
| Main News       | Small News | Event List |
|                 | Small News |            |
|                 | Small News |            |
---------------------------------------------
```

---

## Main News Card

ประกอบด้วย:

- Cover Image
- Category Badge
- Date
- Headline
- Description
- `อ่านต่อ →`

ตัวอย่าง:

```text
กิจกรรม

12 ก.ย. 2569

การแข่งขันหุ่นยนต์ ระดับโรงเรียน

เปิดพื้นที่ให้นักเรียนได้แสดงทักษะ
ด้าน Robotics, Coding และ Innovation

อ่านต่อ →
```

---

## News Categories

ตัวอย่าง Badge:

- กิจกรรม
- วิชาการ
- ประกาศ
- การแข่งขัน
- ข่าวประชาสัมพันธ์

---

## Button

```text
ดูข่าวสารทั้งหมด →
```

---

# 11. Upcoming Events Section

## Label

```text
UPCOMING EVENTS
```

## Heading

```text
กิจกรรมที่กำลังจะมาถึง
```

---

## Event Item

รูปแบบ:

```text
[18 SEP]

การแข่งขันหุ่นยนต์
ระดับโรงเรียน
```

ตัวอย่าง:

```text
18 ก.ย.
การแข่งขันหุ่นยนต์ระดับโรงเรียน
```

```text
25 ก.ย.
Coding & AI Challenge
```

```text
02 ต.ค.
นิทรรศการ STEM & Innovation
```

```text
15 พ.ย.
OPEN HOUSE 2026
```

## CTA

```text
ดูปฏิทินทั้งหมด →
```

---

# 12. Student Achievement Section

## Background

ใช้ Dark Navy / Gradient Navy

ตัวอย่าง:

```css
background: linear-gradient(
  135deg,
  #05172F,
  #082A58
);
```

---

## Label

```text
PROUD OF OUR STUDENTS
```

## Heading

```text
ทุกความสำเร็จ
เริ่มต้นจากการเรียนรู้
```

## CTA

```text
ชมผลงานทั้งหมด →
```

---

## Gallery

แสดงผลงาน:

- Robotics
- Coding
- วิชาการ
- STEM
- กีฬา
- ศิลปะ
- Innovation
- การแข่งขันระดับจังหวัด
- ระดับประเทศ

ใช้ Carousel / Horizontal Slider

---

# 13. Call To Action Section

## Background

Gradient:

```text
Blue → Purple → Pink
```

ใช้ Visual:

- นักเรียน
- VR Headset
- AI Interface
- Technology Grid

---

## Heading

```text
เริ่มต้นการเรียนรู้
เพื่อสร้างอนาคตไปกับเรา
```

## Supporting Text

```text
มาร่วมเป็นส่วนหนึ่งของโรงเรียนแห่งโอกาส
และสร้างอนาคตไปด้วยกัน
```

---

## Buttons

Primary:

```text
สมัครเรียน
```

Secondary:

```text
ติดต่อโรงเรียน →
```

---

# 14. Footer

## Background

```text
#06152E
```

---

## Column 1 — School Branding

```text
[LOGO]

ชื่อโรงเรียน
SCHOOL NAME

เรียนรู้ สร้างสรรค์ ก้าวทันอนาคต
```

---

## Column 2 — ข้อมูลโรงเรียน

แสดง:

- ที่อยู่
- โทรศัพท์
- Email
- เวลาทำการ

ตัวอย่าง:

```text
123 หมู่ 1 ตำบล...
อำเภอ...
จังหวัด...

0-1234-5678

school@example.ac.th
```

---

## Column 3 — เมนูเว็บไซต์

```text
หน้าแรก
เกี่ยวกับเรา
หลักสูตร
ข่าวสาร
บุคลากร
ผลงานนักเรียน
ติดต่อเรา
```

---

## Column 4 — ระบบออนไลน์

```text
ระบบนักเรียน
ระบบครู
ระบบผู้ปกครอง
ดาวน์โหลดเอกสาร
ปฏิทินกิจกรรม
```

---

## Column 5 — Social Media

Icons:

- Facebook
- YouTube
- TikTok
- LINE

สามารถเพิ่ม QR Code สำหรับ LINE Official Account

---

## Copyright

```text
© 2026 SCHOOL NAME. All Rights Reserved.
```

ด้านขวา:

```text
Future Ready Education
Learn • Create • Innovate
```

---

# 15. Responsive Design

## Desktop

```text
≥ 1200px
```

- Hero 2 Columns
- Navigation แสดงครบ
- News ใช้ Bento Grid
- Learning Card 4 Columns

---

## Tablet

```text
768px – 1199px
```

- Hero 2 Columns แบบย่อ
- Quick Access 3 × 2
- Learning 2 × 2
- News 2 Columns

---

## Mobile

```text
< 768px
```

- Hamburger Menu
- Hero เป็น Single Column
- Heading ลดขนาด
- Button เต็มความกว้างบางส่วน
- Quick Access ใช้ Horizontal Slider หรือ 2 Columns
- Learning Card 1 Column
- News 1 Column
- Event 1 Column
- Footer Stack

---

# 16. Recommended Animations

ควรใช้ Animation อย่างพอดี

### Page Load

- Navbar Fade Down
- Hero Text Fade Up
- Hero Image Slide In
- Decorative Elements Float

### Scroll Animation

- Section Fade Up
- Cards Reveal
- Statistics Count Up

### Hover

- Card Lift
- Icon Scale
- Image Zoom
- Button Arrow Move
- Gradient Glow

ตัวอย่าง:

```css
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
}
```

---

# 17. Accessibility

เว็บไซต์ควรรองรับ:

- Contrast ตาม WCAG
- Font Size อย่างน้อย 16px สำหรับ Body
- Alt Text สำหรับรูปภาพ
- Keyboard Navigation
- Focus State
- Screen Reader
- Reduced Motion
- Touch Target อย่างน้อย 44 × 44 px

---

# 18. SEO Structure

แนะนำ HTML Structure:

```html
<header>
<nav></nav>
</header>

<main>

<section id="hero"></section>

<section id="quick-access"></section>

<section id="about"></section>

<section id="future-learning"></section>

<section id="news"></section>

<section id="events"></section>

<section id="achievements"></section>

<section id="cta"></section>

</main>

<footer></footer>
```

---

# 19. SEO Meta Example

```html
<title>
ชื่อโรงเรียน | โรงเรียนแห่งการเรียนรู้และเทคโนโลยี
</title>

<meta
  name="description"
  content="เว็บไซต์อย่างเป็นทางการของชื่อโรงเรียน
  โรงเรียนแห่งการเรียนรู้ เทคโนโลยี นวัตกรรม
  Coding Robotics AI และ STEM"
/>
```

---

# 20. Suggested Component Structure

กรณีพัฒนาด้วย React / Next.js

```text
src/
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── QuickAccess.tsx
│   ├── AboutSchool.tsx
│   ├── SchoolStats.tsx
│   ├── FutureLearning.tsx
│   ├── NewsSection.tsx
│   ├── EventSection.tsx
│   ├── AchievementGallery.tsx
│   ├── CallToAction.tsx
│   └── Footer.tsx
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
└── public/
    ├── images/
    ├── icons/
    ├── logo/
    └── news/
```

---

# 21. Recommended Technology Stack

สำหรับพัฒนาเว็บไซต์จริง:

```text
Next.js
React
TypeScript
Tailwind CSS
Framer Motion
Lucide Icons
Supabase
Vercel
```

ทางเลือก:

```text
Next.js + Supabase + Vercel
```

เหมาะสำหรับระบบโรงเรียนที่ต้องการต่อยอด:

- ระบบสมาชิก
- ระบบบุคลากร
- ระบบข่าว
- ระบบกิจกรรม
- ระบบเอกสาร
- Admin Dashboard
- Google Drive Integration
- ระบบประกาศ
- ระบบ Template
- ระบบนักเรียน
- ระบบผู้ปกครอง

---

# 22. Final Landing Page Flow

```text
┌─────────────────────────────────┐
│ NAVBAR                          │
├─────────────────────────────────┤
│ HERO                            │
│ Future Ready School             │
├─────────────────────────────────┤
│ QUICK ACCESS                    │
├─────────────────────────────────┤
│ ABOUT SCHOOL                    │
├─────────────────────────────────┤
│ SCHOOL STATISTICS               │
├─────────────────────────────────┤
│ FUTURE LEARNING                 │
│ Robotics / AI / Coding / STEM   │
├─────────────────────────────────┤
│ NEWS & UPDATES                  │
├─────────────────────────────────┤
│ UPCOMING EVENTS                 │
├─────────────────────────────────┤
│ STUDENT ACHIEVEMENTS            │
├─────────────────────────────────┤
│ CALL TO ACTION                  │
│ สมัครเรียน / ติดต่อโรงเรียน     │
├─────────────────────────────────┤
│ FOOTER                          │
└─────────────────────────────────┘
```

---

# 23. Design Direction Summary

เว็บไซต์ควรให้ความรู้สึก:

```text
Modern
Future
Technology
Innovation
Education
Friendly
Professional
Youthful
Trustworthy
```

ไม่ควรออกแบบให้ดู:

```text
มืดเกินไป
เป็นเว็บไซต์ราชการแบบเก่า
มีข้อความแน่นเกินไป
ใช้ Animation มากเกินไป
ใช้สี Neon จนอ่านยาก
มีเมนูซับซ้อน
```

หลักสำคัญคือ:

> **“ให้ความทันสมัยของ Technology อยู่ร่วมกับความเป็นมิตรของ Education”**

---

## Design Concept

### FUTURE READY EDUCATION

```text
Learn
Create
Innovate
Grow Together
```

เว็บไซต์ควรเป็นมากกว่าหน้าแสดงข้อมูล แต่ควรเป็น **Digital Gateway ของโรงเรียน** ที่เชื่อมโยงนักเรียน ครู ผู้ปกครอง บุคลากร ข่าวสาร กิจกรรม และระบบบริการออนไลน์ทั้งหมดเข้าด้วยกัน
