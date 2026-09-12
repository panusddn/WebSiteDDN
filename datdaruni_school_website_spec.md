# Datdaruni School Website & Management System
## โรงเรียนดัดดรุณี (Datdaruni School)

## 1. แนวคิดโครงการ

ออกแบบเว็บไซต์และระบบบริหารจัดการโรงเรียนแบบครบวงจรในแพลตฟอร์มเดียว แบ่งเป็น 2 ส่วนหลัก ได้แก่

1. **Public Website** — เว็บไซต์ประชาสัมพันธ์สำหรับนักเรียน ผู้ปกครอง บุคลากร และบุคคลทั่วไป
2. **Management Portal** — ระบบหลังบ้านสำหรับผู้บริหาร ครู บุคลากร และผู้ใช้งานที่ได้รับสิทธิ์

ภาพลักษณ์หลักเป็น **Modern Technology / Digital School** ใช้โทน **สีน้ำเงิน + สีชมพู** ให้ดูทันสมัย เป็นมิตร น่าเชื่อถือ และเหมาะกับสถานศึกษา

---

## 2. Design Direction

### Mood & Tone
- Modern
- Technology-forward
- Clean
- Friendly
- Professional
- Energetic
- Accessible

### สีหลัก
- Primary Blue — ใช้กับ Navigation, ปุ่มหลัก, Dashboard และองค์ประกอบสำคัญ
- Accent Pink — ใช้กับ Highlight, CTA, Badge และกราฟบางประเภท
- White / Light Neutral — ใช้เป็นพื้นหลังหลัก
- Dark Navy — ใช้กับข้อความ หัวข้อ และองค์ประกอบที่ต้องการความชัดเจน

### รูปแบบ UI
- Card-based layout
- Rounded corners
- Soft shadows
- Subtle blue-pink gradients
- Iconography แนว Modern / Technology
- Responsive Design รองรับ Desktop, Tablet และ Mobile
- ใช้พื้นที่ว่างอย่างสมดุล อ่านง่าย
- รองรับ Accessibility เช่น Contrast, Keyboard Navigation และข้อความประกอบไอคอน

---

## 3. โครงสร้าง Public Website

### Home
- Hero Section แนะนำโรงเรียน
- ข่าวเด่น / ประกาศล่าสุด
- กิจกรรมที่กำลังจะมาถึง
- Social Media Feed
- ลิงก์เอกสารสำคัญ
- แนะนำบุคลากร / หน่วยงาน
- Quick Links ไปยังบริการสำคัญ
- ปุ่มเข้าสู่ระบบ Management Portal
- Footer พร้อมช่องทางติดต่อและ Social Media

### About
- ข้อมูลเกี่ยวกับโรงเรียน
- วิสัยทัศน์ / พันธกิจ
- โครงสร้างองค์กร
- ข้อมูลฝ่ายบริหาร
- ข้อมูลที่โรงเรียนต้องการเผยแพร่ต่อสาธารณะ

### Staff Directory
- รายชื่อครูและบุคลากร
- รูปภาพ
- ชื่อ-นามสกุล
- ตำแหน่ง
- กลุ่มสาระ / ฝ่ายงาน
- ช่องค้นหาและตัวกรอง

### News & Announcements
- ข่าวประชาสัมพันธ์
- ประกาศโรงเรียน
- แบ่งหมวดหมู่
- ค้นหาข่าว
- หน้าอ่านรายละเอียด
- รองรับรูปภาพ เอกสารแนบ และลิงก์

### Activity Calendar
- ปฏิทินรายเดือน
- รายการกิจกรรม
- รายละเอียดวัน เวลา และสถานที่
- ตัวกรองประเภทกิจกรรม
- Event Detail Page

### Documents
- เอกสารเผยแพร่
- แบบฟอร์ม
- ระเบียบ / ประกาศ
- ดาวน์โหลดไฟล์
- ค้นหาและแบ่งหมวดหมู่

### Contact
- ข้อมูลการติดต่อ
- แผนที่
- ช่องทาง Social Media
- แบบฟอร์มติดต่อ
- ช่องทางติดต่อที่โรงเรียนกำหนด

---

## 4. Social Media Integration

ระบบต้องรองรับการเชื่อมบัญชีหรือ Page ของโรงเรียนผ่าน API หรือ Feed ที่แพลตฟอร์มนั้นรองรับ

### ความสามารถ
- ดึงโพสต์ล่าสุดอัตโนมัติ
- แสดงรูปภาพ เนื้อหา วันที่ และลิงก์กลับไปยังโพสต์ต้นฉบับ
- ตั้งจำนวนโพสต์ที่ต้องการแสดง
- เลือกเปิด/ปิด Social Feed
- เลือกโพสต์ที่ต้องการซ่อน
- Cache ข้อมูลเพื่อให้เว็บไซต์โหลดเร็ว
- ตั้งรอบ Synchronization
- เก็บสถานะการเชื่อมต่อใน Admin
- รองรับการต่อยอด Facebook, Instagram, YouTube และแพลตฟอร์มอื่นที่มี API/Feed

### Admin Social Settings
- Connect / Disconnect Account
- Token / Credential Management
- Sync Status
- Last Sync
- Manual Sync
- Display Settings
- Error Log

> การเชื่อมต่อจริงขึ้นอยู่กับ API, Permission, Token และข้อกำหนดของ Social Platform แต่ละราย

---

## 5. Management Portal

### Executive Dashboard
Dashboard สำหรับผู้บริหาร แสดงภาพรวมข้อมูลสำคัญ เช่น
- จำนวนบุคลากร
- ข่าว / ประกาศล่าสุด
- เอกสารล่าสุด
- กิจกรรมที่กำลังจะเกิดขึ้น
- สถานะ Social Sync
- จำนวนผู้ใช้งานระบบ
- Notification Summary
- Quick Actions
- Report Widgets

Dashboard ควรออกแบบแบบ Modular Cards และ Charts เพื่อให้เพิ่ม KPI ในอนาคตได้ง่าย

---

---

## 5A. Website Theme & Template Manager

ระบบหลังบ้านต้องมี **Website Theme & Template Manager** สำหรับปรับภาพลักษณ์ของเว็บไซต์โดยไม่ต้องแก้โค้ด โดยสิทธิ์หลักอยู่ที่ Super Admin หรือผู้ที่ได้รับมอบหมาย

### Website Template Gallery
ผู้ดูแลสามารถเลือก Template ของเว็บไซต์จาก Gallery ได้ เช่น:
- Modern Technology
- Clean School
- Corporate Education
- Minimal
- Blue-Pink Digital
- Event-focused
- News-focused

แต่ละ Template ควรมี:
- Thumbnail
- Full-page Preview
- Desktop Preview
- Tablet Preview
- Mobile Preview
- Template Name
- Description
- Supported Sections
- Activate / Preview / Duplicate

### Theme Customization
ปรับค่าต่าง ๆ ของเว็บไซต์ได้จากหลังบ้าน เช่น:
- Primary Color
- Secondary Color
- Accent Color
- Background Color
- Surface / Card Color
- Heading Color
- Body Text Color
- Link Color
- Button Color
- Button Hover Color
- Border Color
- Success / Warning / Error / Info Colors
- Header Color
- Footer Color
- Navigation Color
- Gradient Colors

ระบบควรใช้ Design Tokens / CSS Variables เพื่อให้การเปลี่ยนสีอัปเดตทั้งเว็บไซต์อย่างสอดคล้อง

### Branding Settings
สามารถปรับ:
- Favicon
- Website Logo
- Alternate Logo
- Dark Mode Logo
- Social Share Image
- School Name
- English School Name
- Short Name
- Website Title
- Tagline
- Footer Branding

### Favicon Management
- Upload `.ico`, `.png`, `.svg` ตามที่ระบบรองรับ
- Preview favicon
- Replace / Remove
- Generate common favicon sizes
- แสดงผลบน browser tab และ bookmark
- Cache-busting เมื่อเปลี่ยน favicon

### Typography
ปรับ:
- Heading Font
- Body Font
- Font Size Scale
- Font Weight
- Line Height
- Letter Spacing

ควรรองรับฟอนต์ภาษาไทยและภาษาอังกฤษอย่างเหมาะสม

### Layout Settings
ปรับ:
- Header Style
- Navigation Style
- Hero Layout
- Container Width
- Section Spacing
- Card Radius
- Shadow Strength
- Button Radius
- Footer Layout
- Sidebar Style
- Grid / List Preference

### Home Page Section Manager
ผู้ดูแลสามารถ:
- เปิด / ปิด Section
- Drag & Drop ลำดับ Section
- เลือก Layout ของ Section
- แก้หัวข้อ / Subtitle
- กำหนด Background
- กำหนดจำนวนรายการที่แสดง

ตัวอย่าง Section:
- Hero
- ข่าวล่าสุด
- ประกาศ
- Upcoming Events
- Social Feed
- บุคลากร
- เอกสาร
- Quick Links
- Birthday Highlights
- Contact

### Live Preview
ทุกการปรับ Theme ควรมี:
- Live Preview
- Desktop / Tablet / Mobile Preview
- Preview ก่อน Publish
- Draft Theme
- Publish Theme
- Revert to Previous Version

### Theme Versioning
ระบบเก็บ:
- Theme Version
- ผู้แก้ไข
- วันเวลา
- ค่าเดิม / ค่าใหม่
- Publish Status

รองรับ:
- Save Draft
- Publish
- Rollback
- Duplicate Theme

### Theme Permissions
เพิ่ม Permission:
- View Theme Settings
- Edit Theme
- Manage Website Templates
- Upload Branding Assets
- Publish Theme
- Rollback Theme
- Manage Homepage Sections

### Suggested Data Model
เพิ่ม Entity:
- `website_themes`
- `website_theme_versions`
- `website_templates`
- `branding_settings`
- `homepage_sections`
- `theme_assets`

### Admin Navigation
เพิ่มเมนู:
`Website Design`
- Templates
- Theme Colors
- Branding
- Favicon
- Typography
- Layout
- Homepage Sections
- Preview
- Version History


## 6. Teacher & Staff Management

### ข้อมูลครู / บุคลากร
- เพิ่ม / แก้ไข / ปิดใช้งานข้อมูล
- รูปโปรไฟล์
- ชื่อ-นามสกุล
- ตำแหน่ง
- ฝ่าย / กลุ่มสาระ
- ข้อมูลติดต่อที่อนุญาตให้จัดเก็บ
- สถานะการทำงาน
- กำหนดสิทธิ์บัญชีผู้ใช้
- Search / Filter / Sort
- Import / Export ตามสิทธิ์
- Import บุคลากรจาก Excel โดยรับเฉพาะชื่อ นามสกุล และแผนก
- บุคลากรแก้ไขโปรไฟล์ของตนเองได้ตามสิทธิ์
- คำนวณอายุอัตโนมัติจากวันเดือนปีเกิด

---

---

## 6A. Staff Excel Import & Self-Service Profile

ระบบข้อมูลบุคลากรต้องรองรับทั้งการนำเข้าข้อมูลเริ่มต้นจาก Excel และการให้บุคลากรแต่ละคนเข้ามาปรับปรุงโปรไฟล์ของตนเองภายหลัง

### Excel Import สำหรับข้อมูลบุคลากร

รองรับการนำเข้าไฟล์ `.xlsx` หรือ `.xls` โดยในขั้นตอน Import ให้รับเฉพาะข้อมูลต่อไปนี้:

- ชื่อ
- นามสกุล
- แผนก / หน่วยงาน

### Excel Import Workflow
1. ผู้ดูแลอัปโหลดไฟล์ Excel
2. ระบบอ่านหัวคอลัมน์และแสดงตัวอย่างข้อมูลก่อนนำเข้า
3. ผู้ดูแล Map คอลัมน์จาก Excel เข้ากับฟิลด์:
   - `first_name`
   - `last_name`
   - `department`
4. ระบบ Validate ข้อมูล
5. แสดงจำนวนรายการ:
   - พร้อมนำเข้า
   - ข้อมูลไม่ครบ
   - แผนกไม่ตรงกับข้อมูลในระบบ
   - ข้อมูลที่อาจซ้ำ
6. ผู้ดูแลยืนยันการนำเข้า
7. ระบบสร้าง Staff Profile เบื้องต้น
8. บันทึก Import Log และผลลัพธ์ย้อนหลัง

### Import Validation
- ชื่อและนามสกุลต้องไม่ว่าง
- ต้องมีแผนก / หน่วยงาน
- Trim ช่องว่างหน้าหลังอัตโนมัติ
- ตรวจสอบชื่อแผนกกับ `departments`
- รองรับการเลือกว่าจะ:
  - จับคู่กับแผนกเดิม
  - สร้างแผนกใหม่โดยผู้ดูแล
  - ข้ามรายการที่ไม่ตรง
- ตรวจสอบข้อมูลซ้ำจากชื่อ + นามสกุล + แผนก
- แสดง Preview ก่อน Commit จริง
- รองรับการยกเลิก Import ก่อนยืนยัน

### Import Template
ควรมีปุ่มดาวน์โหลด Excel Template โดยมีหัวคอลัมน์ตัวอย่าง:
- ชื่อ
- นามสกุล
- แผนก

> การ Import รอบแรกให้นำเข้าเฉพาะ 3 ฟิลด์นี้เท่านั้น ส่วนข้อมูลอื่นให้บุคลากรแต่ละคนเข้ามากรอกหรือแก้ไขในโปรไฟล์ของตนเอง

### Staff Self-Service Profile

บุคลากรแต่ละคนสามารถเข้าสู่ระบบและแก้ไขโปรไฟล์ของตนเองได้ โดยไม่สามารถแก้ไขข้อมูลของผู้อื่น เว้นแต่ได้รับสิทธิ์เพิ่มเติม

### ข้อมูลที่บุคลากรแก้ไขได้
- รูปโปรไฟล์
- ชื่อ
- นามสกุล
- แผนก / หน่วยงาน
- เพศ
- ตำแหน่ง
- วันเดือนปีเกิด

### รูปโปรไฟล์
- Upload รูปใหม่
- Preview ก่อนบันทึก
- Crop / Adjust ตามที่ UI รองรับ
- Replace รูปเดิม
- Remove รูป
- ตรวจสอบชนิดไฟล์และขนาดไฟล์
- ใช้รูป Default หากยังไม่มีรูป

### วันเดือนปีเกิดและการคำนวณอายุ
ระบบต้องคำนวณอายุจาก `birth_date` โดยอัตโนมัติ

หลักการ:
- ผู้ใช้กรอกวันเดือนปีเกิดเพียงครั้งเดียว
- ระบบคำนวณอายุจากวันที่ปัจจุบันทุกครั้งที่แสดงผล
- อายุไม่ควรถูกเก็บเป็นค่าคงที่ในฐานข้อมูล
- เมื่อถึงวันเกิด อายุจะเปลี่ยนอัตโนมัติโดยไม่ต้องแก้ไขข้อมูล
- รองรับการแสดงวันเดือนปีเกิดในรูปแบบไทยตาม UI ของระบบ
- ควรคำนึงถึง Time Zone ของโรงเรียนในการคำนวณ

ตัวอย่างแนวคิด:
`age = current_date - birth_date` โดยตรวจว่าปีปัจจุบันผ่านวันเกิดของบุคลากรแล้วหรือยัง

### Profile Page
หน้าโปรไฟล์ของบุคลากรควรมี:
- Profile Photo
- ชื่อ-นามสกุล
- แผนก
- เพศ
- ตำแหน่ง
- วันเดือนปีเกิด
- อายุที่คำนวณอัตโนมัติ
- ปุ่ม Edit Profile
- ปุ่ม Change Photo
- Last Updated

### Profile Permission
เพิ่ม Permission:
- View Own Profile
- Edit Own Profile
- Upload Own Profile Photo
- View Staff Profiles
- Edit Staff Profiles
- Import Staff from Excel
- View Staff Import History

### Approval Option
ผู้ดูแลสามารถเลือกได้ว่าการแก้ไขฟิลด์สำคัญ เช่น:
- ชื่อ
- นามสกุล
- แผนก
- ตำแหน่ง

จะ:
- บันทึกทันที หรือ
- ส่งให้ผู้ดูแลอนุมัติก่อนมีผล

สำหรับวันเกิดและเพศสามารถกำหนด Privacy และสิทธิ์การมองเห็นได้ตามนโยบายของโรงเรียน

### Audit Trail
บันทึก:
- ผู้แก้ไข
- ฟิลด์ที่แก้ไข
- ค่าเดิม
- ค่าใหม่
- วันเวลา
- สถานะอนุมัติ (ถ้ามี)
- ผู้อนุมัติ

### Suggested Data Model Updates

เพิ่ม/ปรับ `staff`:
- `first_name`
- `last_name`
- `department_id`
- `gender`
- `position`
- `birth_date`
- `profile_image_url`
- `profile_updated_at`

ไม่ต้องมีฟิลด์ `age` แบบถาวร เนื่องจากให้คำนวณจาก `birth_date` แบบ Dynamic

เพิ่ม Entity:
- `staff_imports`
- `staff_import_rows`
- `staff_profile_change_requests`

### Admin Staff Import Screen
เมนู:
`ครู / บุคลากร > นำเข้าจาก Excel`

ประกอบด้วย:
- Download Template
- Upload Excel
- Column Mapping
- Data Preview
- Validation Result
- Confirm Import
- Import Result
- Import History

### UX สำหรับบุคลากร
เมนู:
`โปรไฟล์ของฉัน`

Flow:
`ดูโปรไฟล์ → แก้ไขข้อมูล → Preview → บันทึก → สำเร็จ`

หากเปิด Approval Workflow:
`ดูโปรไฟล์ → แก้ไขข้อมูล → ส่งคำขอ → รออนุมัติ → อัปเดตข้อมูล`

---

## 6B. Department Management & Organization Chart

ระบบต้องรองรับการบริหาร **แผนก / หน่วยงาน** แบบยืดหยุ่น สามารถสร้างโครงสร้างองค์กรและแสดงผลเป็นผังหน่วยงานได้

### Department Management
ผู้ดูแลที่มีสิทธิ์สามารถ:
- เพิ่มแผนก / หน่วยงานใหม่
- แก้ไขชื่อแผนก
- กำหนดรหัสแผนก
- กำหนดคำอธิบาย
- กำหนดแผนกแม่ (Parent Department)
- กำหนดหัวหน้าแผนก
- กำหนดผู้ช่วย / รองหัวหน้า
- เพิ่ม / ย้ายบุคลากรเข้าแผนก
- กำหนดลำดับการแสดงผล
- เปิด / ปิดการใช้งานแผนก
- Archive แผนกที่เลิกใช้งาน
- ป้องกันการลบแผนกที่ยังมีบุคลากรหรือข้อมูลอ้างอิงอยู่

### Department Fields
ข้อมูลของแต่ละแผนกควรรองรับ:
- `department_name`
- `department_code`
- `description`
- `parent_department_id`
- `head_staff_id`
- `assistant_head_staff_id`
- `sort_order`
- `status`
- `created_at`
- `updated_at`

### Organization Chart
เพิ่มหน้าสำหรับจัดและแสดง **ผังโครงสร้างหน่วยงาน**

ความสามารถ:
- แสดงแผนกแบบ Tree / Organization Chart
- รองรับหลายระดับ เช่น:
  - โรงเรียน
    - ฝ่ายบริหาร
      - งานบุคลากร
      - งานการเงิน
    - ฝ่ายวิชาการ
      - กลุ่มสาระ
      - งานทะเบียน
- แสดงหัวหน้าแผนกในแต่ละ Node
- แสดงจำนวนบุคลากรในแผนก
- คลิก Node เพื่อดูรายละเอียดแผนก
- Expand / Collapse
- Zoom In / Zoom Out
- Fit to Screen
- Fullscreen View
- Search Department
- Filter ตามสถานะ
- Printable View
- Export เป็นภาพหรือ PDF ตามความสามารถของระบบ

### Organization Chart Editor
ผู้ดูแลสามารถจัดโครงสร้างได้จากหน้า Editor:
- Drag & Drop แผนก
- ย้ายแผนกไปอยู่ใต้แผนกแม่
- เปลี่ยนลำดับการแสดงผล
- เพิ่มแผนกใหม่จากผังได้ทันที
- แก้ไขชื่อและข้อมูลแผนกจาก Node
- ตั้งหัวหน้าแผนกจากรายชื่อบุคลากร
- แสดงคำเตือนเมื่อเกิดโครงสร้างวนซ้ำ (Circular Reference)
- Preview ผังก่อนบันทึก
- บันทึก Version / Audit History ของการเปลี่ยนโครงสร้าง

### Staff Assignment
จากหน้าแผนก สามารถ:
- ดูรายชื่อบุคลากรทั้งหมดในแผนก
- เพิ่มบุคลากร
- ย้ายบุคลากรไปแผนกอื่น
- กำหนดหัวหน้า / รองหัวหน้า
- ค้นหา / Filter บุคลากร
- แสดงตำแหน่งและรูปโปรไฟล์

เมื่อมีการย้ายแผนก:
- อัปเดต `department_id` ใน Staff Profile
- บันทึก Audit Trail
- รองรับ Notification แจ้งผู้เกี่ยวข้อง
- เก็บประวัติแผนกเดิมและแผนกใหม่

### Public Organization Chart
สามารถตั้งค่าให้มีหน้า **โครงสร้างองค์กร** บน Public Website ได้ โดยเลือกได้ว่า:
- แสดงเฉพาะชื่อแผนก
- แสดงหัวหน้าแผนก
- แสดงบุคลากรบางส่วน
- ซ่อนข้อมูลภายใน
- เปิด / ปิดแต่ละแผนกจากหน้า Public

ตัวอย่าง URL:
`/about/organization`

### Permissions
เพิ่ม Permission:
- View Departments
- Create Department
- Edit Department
- Archive Department
- Manage Department Structure
- Manage Department Members
- Assign Department Head
- Assign Department Manager
- Manage Department Assignments
- Manage Department Scoped Permissions
- View Organization Chart
- Edit Organization Chart
- Publish Organization Chart

### Audit Trail
บันทึก:
- การสร้างแผนก
- การแก้ไขข้อมูล
- การเปลี่ยน Parent Department
- การเปลี่ยนหัวหน้าแผนก
- การย้ายบุคลากร
- การเปลี่ยนลำดับในผัง
- ผู้ดำเนินการ
- วันเวลา
- ค่าเดิม / ค่าใหม่

### Suggested Data Model Updates
ปรับ `departments` ให้รองรับ:
- `id`
- `name`
- `code`
- `description`
- `parent_id`
- `head_staff_id`
- `assistant_head_staff_id`
- `sort_order`
- `status`

เพิ่ม Entity:
- `department_members`
- `department_history`
- `department_structure_versions`

### Admin Navigation
เพิ่มเมนู:
`โครงสร้างองค์กร`
- แผนก / หน่วยงาน
- ผังองค์กร
- จัดโครงสร้าง
- ประวัติการเปลี่ยนแปลง

---

## 6C. Department Administration Delegation

ระบบบริหารจัดการของแต่ละแผนกต้องรองรับการมอบหมายผู้รับผิดชอบแบบยืดหยุ่น โดย **หัวหน้าแผนกเป็นผู้ดูแลแผนกโดยค่าเริ่มต้น** และ **Super Admin เป็นผู้กำหนดหรือมอบหมายผู้รับผิดชอบเพิ่มเติมได้**

### หลักการสิทธิ์
- Head of Department ได้รับสิทธิ์บริหารจัดการแผนกของตนเองตามขอบเขตที่ระบบกำหนด
- Super Admin สามารถเปิด / ปิดสิทธิ์ของหัวหน้าแผนกได้
- Super Admin สามารถแต่งตั้งบุคลากรคนอื่นในแผนกให้เป็น Department Manager / Department Responsible Person ได้
- สามารถมีผู้รับผิดชอบมากกว่า 1 คนต่อแผนก
- ผู้รับผิดชอบแต่ละคนสามารถมีสิทธิ์ไม่เท่ากัน
- ผู้รับผิดชอบสามารถจัดการได้เฉพาะแผนกที่ได้รับมอบหมาย เว้นแต่มีสิทธิ์ระดับระบบ
- Super Admin สามารถยกเลิก เปลี่ยน หรือกำหนดวันหมดอายุของสิทธิ์ได้

### Department Roles
ตัวอย่าง Role:
- Department Head — หัวหน้าแผนก
- Department Manager — ผู้ดูแลแผนก
- Department Content Manager — ดูแลข่าว/ประกาศ
- Department Document Manager — ดูแลเอกสาร
- Department Calendar Manager — ดูแลกิจกรรม
- Department Staff Manager — ดูแลข้อมูลบุคลากรในแผนก
- Department Organization Manager — ดูแลโครงสร้างและสมาชิกแผนก
- Department Viewer — ดูข้อมูลอย่างเดียว

### สิทธิ์ที่ Super Admin สามารถกำหนด
กำหนดเป็นรายบุคคล / รายแผนกได้ เช่น:
- View Department Dashboard
- Edit Department Information
- Manage Department Members
- Manage Department Structure
- Assign Department Roles
- Create Department News
- Edit Department News
- Review Department News
- Approve Department News
- Publish Department News
- Manage Department Documents
- Manage Department Calendar
- Manage Department Notifications
- View Department Reports
- Export Department Reports

### Department Responsibility Assignment
Super Admin สามารถกำหนด:
- Department
- Staff Member
- Assigned Role
- Specific Permissions
- Start Date
- End Date
- Active / Inactive
- Assignment Note

ตัวอย่าง:
`ฝ่ายวิชาการ → นาย ก → Department Manager → News + Documents + Calendar`

### Department Admin Dashboard
หัวหน้าแผนกหรือผู้ที่ได้รับมอบหมายจะเห็น Dashboard เฉพาะแผนกของตน เช่น:
- ข้อมูลสมาชิกในแผนก
- ข่าว / ประกาศของแผนก
- เอกสารของแผนก
- ปฏิทินกิจกรรม
- งานที่รออนุมัติ
- Notification
- รายงานของแผนก
- Quick Actions ตาม Permission

เมนูและปุ่มต่าง ๆ ต้องแสดงตามสิทธิ์ของผู้ใช้จริง

### Permission Scope
Permission ต้องมี Scope อย่างน้อย:
- Own — เฉพาะข้อมูลที่ตนเองสร้าง
- Department — ข้อมูลทั้งหมดของแผนกที่ได้รับมอบหมาย
- Multi-Department — หลายแผนกที่ Super Admin กำหนด
- Global — ทุกแผนก เฉพาะ Role ระดับระบบ

### Multi-Department Assignment
Super Admin สามารถมอบหมายบุคลากรหนึ่งคนให้ดูแลหลายแผนกได้ หากจำเป็น โดยต้องกำหนดสิทธิ์แยกกันในแต่ละแผนก

ตัวอย่าง:
- บุคลากร A
  - ฝ่ายวิชาการ: Department Manager
  - งานประชาสัมพันธ์: Department Content Manager

### Temporary Delegation
รองรับการมอบหมายชั่วคราว เช่น:
- หัวหน้าแผนกลางาน
- มอบหมายรักษาการ
- มอบหมายเฉพาะโครงการ

ระบบควรรองรับ:
- Effective From
- Effective Until
- Auto Expire
- Notification ก่อนสิทธิ์หมดอายุ

### Security Rules
- ผู้ดูแลแผนกไม่สามารถเพิ่มสิทธิ์ให้ตนเองเกินกว่าที่ Super Admin กำหนด
- ผู้ดูแลแผนกไม่สามารถเข้าถึงข้อมูลของแผนกอื่นโดยไม่มี Assignment
- Backend ต้องตรวจ Permission และ Department Scope ทุก Request
- ห้ามใช้เพียงการซ่อนเมนูบน Frontend เป็นกลไกควบคุมสิทธิ์
- การเปลี่ยน Role / Permission ต้องมี Audit Log

### Audit Trail
บันทึก:
- ผู้มอบหมาย
- ผู้ได้รับมอบหมาย
- แผนก
- Role
- Permission
- วันเริ่มต้น
- วันสิ้นสุด
- การแก้ไขสิทธิ์
- การยกเลิกสิทธิ์
- วันเวลา

### Suggested Data Model
เพิ่ม Entity:
- `department_assignments`
- `department_assignment_permissions`
- `department_role_templates`

ตัวอย่างฟิลด์ใน `department_assignments`:
- `id`
- `department_id`
- `staff_id`
- `role_id`
- `assigned_by`
- `starts_at`
- `ends_at`
- `status`
- `note`

### Admin Navigation
เพิ่มเมนู:
`โครงสร้างองค์กร > ผู้รับผิดชอบแผนก`

ภายในมี:
- รายการแผนก
- หัวหน้าแผนก
- ผู้รับผิดชอบ
- Role
- Permission
- วันที่เริ่ม / สิ้นสุด
- ปุ่ม Assign
- ปุ่ม Edit Permission
- ปุ่ม Revoke

## 7. Class Schedule

### ตารางเรียน
- จัดการตารางเรียน
- มุมมองรายวัน / รายสัปดาห์
- กำหนดคาบ
- ห้องเรียน
- รายวิชา
- ครูผู้สอน
- ตรวจสอบข้อมูลซ้ำซ้อน
- ค้นหาและตัวกรอง
- Printable View
- Export ตามรูปแบบที่ระบบรองรับ

---

## 8. Document Management

### เอกสาร
- Upload / Download
- Folder / Category
- Search
- Tag
- Version / Revision
- Publish / Unpublish
- กำหนดผู้ที่สามารถดูเอกสาร
- เอกสารสาธารณะ / เอกสารภายใน
- วันที่เผยแพร่
- ผู้สร้าง / ผู้แก้ไข
- Audit Trail

---

## 9. News & Announcement Management

- สร้างข่าว / ประกาศ
- Rich Text Editor
- Cover Image
- Image Gallery
- Attachment
- Category
- Tags
- Draft / Published
- Schedule Publishing
- Pin Important Announcement
- Publish to Public Website
- Notification เมื่อมีประกาศใหม่ตามเงื่อนไขที่กำหนด

---

---

## 10A. Department News & Announcement Publishing

ระบบข่าวและประกาศต้องรองรับให้ **บุคลากรแต่ละหน่วยงานสามารถสร้างและจัดการข่าวของหน่วยงานตนเองได้** ภายใต้สิทธิ์ที่กำหนด โดยเชื่อมกับระบบ Roles & Permissions และโครงสร้างหน่วยงานของโรงเรียน

### แนวคิดหลัก
- ผู้ใช้งานที่สังกัดหน่วยงานสามารถสร้างข่าว / ประกาศของหน่วยงานตนเอง
- ผู้ใช้งานทั่วไปไม่สามารถแก้ไขข่าวของหน่วยงานอื่น เว้นแต่ได้รับสิทธิ์ระดับผู้ดูแล
- ข่าวทุกชิ้นต้องบันทึก `department_id` เพื่อระบุเจ้าของเนื้อหา
- รองรับทั้งข่าวภายในและข่าวที่เผยแพร่สู่ Public Website
- รองรับ Workflow อนุมัติก่อนเผยแพร่

### Publishing Workflow
สถานะข่าวควรรองรับอย่างน้อย:
- Draft — ร่าง
- Pending Review — ส่งตรวจ
- Approved — อนุมัติแล้ว
- Scheduled — ตั้งเวลาเผยแพร่
- Published — เผยแพร่แล้ว
- Rejected — ไม่อนุมัติ / ส่งกลับแก้ไข
- Archived — เก็บถาวร

ตัวอย่าง Workflow:
`Draft → Pending Review → Approved → Scheduled/Published`

ผู้ตรวจสามารถส่งกลับพร้อมหมายเหตุเพื่อให้ผู้เขียนแก้ไขได้

### สิทธิ์ระดับหน่วยงาน
กำหนด Permission เช่น:
- Create Department News
- Edit Own Department News
- Delete Own Department News
- Submit News for Review
- Review Department News
- Approve Department News
- Publish Department News
- Schedule Department News
- Archive Department News
- View All Department News
- Manage All Department News

### ตัวอย่าง Role
- Department Staff — สร้าง/แก้ไข Draft ของหน่วยงานตนเอง
- Department Editor — จัดการข่าวทั้งหมดในหน่วยงาน
- Department Approver — ตรวจและอนุมัติข่าวของหน่วยงาน
- Content Admin — จัดการข่าวทุกหน่วยงาน
- Super Admin — สิทธิ์ทั้งหมด

### ข้อมูลข่าว / ประกาศ
แต่ละรายการควรรองรับ:
- Title
- Slug
- Summary
- Content
- Cover Image
- Gallery
- Attachments
- Category
- Tags
- Department
- Author
- Reviewer / Approver
- Publish Scope
- Publish Date / Scheduled Date
- Expiry Date
- Pin / Featured
- Status
- Rejection / Revision Note
- Created At
- Updated At
- Published At

### Publish Scope
เลือกรูปแบบการเผยแพร่ได้:
- Internal Only — เฉพาะผู้ใช้งานภายใน
- Department Only — เฉพาะบุคลากรในหน่วยงาน
- School-wide Internal — ผู้ใช้งานภายในทั้งโรงเรียน
- Public Website — แสดงบนเว็บไซต์สาธารณะ
- Public + Social Ready — แสดงบนเว็บไซต์และเตรียมพร้อมสำหรับแชร์ไป Social Media

### Department News Dashboard
เพิ่ม Dashboard สำหรับแต่ละหน่วยงาน:
- Drafts
- Pending Review
- Approved
- Scheduled
- Published
- Rejected
- ข่าวที่ใกล้หมดอายุ
- Recent Activity
- Quick Create News

### Public Website
หน้า News & Announcements ควรเพิ่ม:
- Filter ตามหน่วยงาน
- แสดงชื่อหน่วยงานเจ้าของข่าว
- Department Badge
- หน้ารวมข่าวของแต่ละหน่วยงาน
- URL เช่น `/news/department/[slug]`
- รองรับ Featured News จากหลายหน่วยงาน

### Notifications
แจ้งเตือนอัตโนมัติเมื่อ:
- มีข่าวใหม่ถูกส่งเข้าตรวจ
- ข่าวได้รับการอนุมัติ
- ข่าวถูกส่งกลับแก้ไข
- ข่าวถูกเผยแพร่
- ข่าวใกล้ถึงวันหมดอายุ
- ข่าวที่ตั้งเวลาเผยแพร่ทำงานสำเร็จหรือผิดพลาด

### Audit Trail
บันทึกประวัติ:
- ผู้สร้าง
- ผู้แก้ไข
- ผู้ส่งตรวจ
- ผู้อนุมัติ
- ผู้เผยแพร่
- การเปลี่ยนสถานะ
- วันเวลา
- Revision Note

### Suggested Data Model
เพิ่ม/ปรับ Entity:
- `departments`
- `department_members`
- `news`
- `news_revisions`
- `news_approvals`
- `news_categories`
- `news_tags`

ฟิลด์สำคัญใน `news`:
- `department_id`
- `author_id`
- `reviewer_id`
- `approver_id`
- `publish_scope`
- `status`
- `scheduled_at`
- `published_at`
- `expires_at`

### Admin Settings
- เปิด / ปิด Department Publishing
- เปิด / ปิด Approval Workflow
- กำหนดว่าหน่วยงานใดเผยแพร่ Public ได้
- กำหนดผู้อนุมัติของแต่ละหน่วยงาน
- กำหนด Default Publish Scope
- กำหนด Category ที่แต่ละหน่วยงานใช้ได้
- กำหนดว่าข่าวใดต้องผ่าน Content Admin ก่อนขึ้นหน้า Public
---

## 9A. News & Announcement Template Gallery

ระบบข่าวและประกาศต้องรองรับการเลือก **Template สำหรับข่าวแต่ละรายการ** เพื่อให้รูปแบบการนำเสนอเหมาะกับประเภทเนื้อหา โดยไม่กระทบข้อมูลข่าว

### News Template Gallery
ผู้สร้างข่าวสามารถเลือก Template ก่อนเผยแพร่ เช่น:
- Standard News
- Official Announcement
- Photo Story
- Event Highlight
- Executive Message
- Department News
- Minimal Article
- Magazine Style
- Featured Story

### Template Selection
ในหน้า Create / Edit News เพิ่ม:
- Choose Template
- Preview Template
- Change Template
- Use Default Template

สามารถเปลี่ยน Template ได้โดยเนื้อหาหลักยังคงเดิม

### Template Preview
ก่อนเลือกใช้งานแสดง:
- Thumbnail
- Full Preview
- Desktop Preview
- Mobile Preview
- ตัวอย่างตำแหน่ง Cover
- Gallery Layout
- Attachment Layout
- Metadata Layout

### News Template Configuration
แต่ละ Template กำหนดได้:
- Hero / Cover Style
- Title Layout
- Meta Position
- Author / Department Display
- Image Gallery Style
- Attachment Section Style
- Related News Layout
- Social Share Position
- CTA Style
- Background / Accent Style

### Template by Content Type
Super Admin สามารถกำหนด Default Template ตามประเภท เช่น:
- News → Standard News
- Announcement → Official Announcement
- Activity → Event Highlight
- Department News → Department News
- Executive Message → Executive Message

### Template by Department
Super Admin สามารถ:
- กำหนด Template ที่แต่ละแผนกใช้ได้
- กำหนด Default Template ของแต่ละแผนก
- Lock Template บางแบบสำหรับข่าวทางการ
- เปิดให้ Department Manager เลือก Template ภายในขอบเขตที่กำหนด

### News Template Customization
ตามสิทธิ์ สามารถปรับ:
- Accent Color
- Cover Position
- Layout Variant
- Show / Hide Author
- Show / Hide Department
- Show / Hide Publish Date
- Show / Hide Attachments
- Show / Hide Related News

ควรจำกัดให้อยู่ภายใต้ Design System ของโรงเรียนเพื่อไม่ให้แต่ละข่าวมีรูปแบบแตกต่างเกินไป

### News Template Permissions
เพิ่ม Permission:
- View News Templates
- Select News Template
- Manage News Templates
- Set Department Default Template
- Set Global Default Template
- Lock News Template
- Preview News Template

### Suggested Data Model
เพิ่ม Entity:
- `news_templates`
- `news_template_versions`
- `department_news_template_settings`

เพิ่มฟิลด์ใน `news`:
- `template_id`
- `template_variant`
- `template_settings`

### Publishing Workflow Integration
ก่อน Publish:
- ตรวจสอบว่า Template ยัง Active
- Preview ข่าวด้วย Template จริง
- ตรวจ Responsive Layout
- ตรวจ Cover / Attachment
- หาก Template ถูกปิดใช้งาน ให้ fallback ไป Default Template

### Definition of Done for News Templates
- เลือก Template ได้ในหน้า Create / Edit News
- Preview ก่อน Publish
- รองรับ Default Template
- รองรับ Template แยกตามประเภทข่าว
- รองรับ Template แยกตามแผนก
- Responsive ทุก Template

## 10. Activity Calendar Management

- เพิ่มกิจกรรม
- วัน / เวลา
- สถานที่
- รายละเอียด
- หมวดหมู่
- ผู้รับผิดชอบ
- ไฟล์แนบ
- Public / Internal
- Upcoming Events
- Calendar View
- List View

---

---

## 10B. Google Drive Integration for News & Announcements

ระบบข่าวและประกาศต้องรองรับการเชื่อมต่อ **Google Drive ของผู้ใช้งานแต่ละคน** เพื่อให้ผู้สร้างข่าวสามารถเลือกนำรูปภาพและเอกสารจาก Drive ของตนมาใช้ในข่าว/ประกาศได้โดยตรง

### แนวคิดหลัก
- ผู้ใช้งานเชื่อม Google Account ของตนเองกับระบบผ่าน OAuth
- ระบบใช้สิทธิ์ของผู้ใช้งานคนนั้นในการเข้าถึงไฟล์ที่ได้รับอนุญาต
- ผู้สร้างข่าวสามารถเลือกไฟล์จาก Google Drive ผ่าน File Picker
- รองรับทั้งรูปภาพและเอกสาร
- ระบบไม่ควรใช้ Google Drive ของ Super Admin เป็นแหล่งไฟล์รวมโดยอัตโนมัติ
- ผู้ใช้แต่ละคนเห็นเฉพาะไฟล์ที่ Google Account ของตนมีสิทธิ์เข้าถึง

### Supported Content
รองรับอย่างน้อย:
- JPG / JPEG
- PNG
- WEBP
- GIF ตามนโยบายระบบ
- PDF
- DOC / DOCX
- XLS / XLSX
- PPT / PPTX
- Google Docs
- Google Sheets
- Google Slides
- ไฟล์ประเภทอื่นที่ระบบอนุญาต

### News Editor Integration
ในหน้า Create / Edit News เพิ่มปุ่ม:
- `เลือกจาก Google Drive`
- `อัปโหลดจากเครื่อง`

เมื่อเลือก Google Drive:
1. ระบบตรวจสอบว่าผู้ใช้เชื่อม Google Account แล้วหรือไม่
2. หากยังไม่เชื่อม ให้เริ่ม OAuth Flow
3. เปิด Google Drive Picker
4. ผู้ใช้เลือกไฟล์
5. ระบบตรวจสอบชนิดไฟล์และ Permission
6. แสดง Preview
7. ผู้ใช้ยืนยันการแนบไฟล์กับข่าว

### Image Usage
รูปภาพจาก Google Drive สามารถใช้เป็น:
- Cover Image
- Featured Image
- Content Image
- Gallery Image
- Social Preview Image

ควรมี:
- Thumbnail Preview
- Alt Text
- Caption
- Crop / Aspect Ratio ตามที่ UI รองรับ
- Image Ordering
- Remove / Replace

### Document Usage
เอกสารจาก Google Drive สามารถใช้เป็น:
- Attachment
- Downloadable File
- Supporting Document
- Form / Official Document

ข้อมูลที่ควรแสดง:
- File Name
- File Type
- File Size
- Source
- Owner / Connected Account ตามสิทธิ์ที่เหมาะสม
- Last Modified
- Open / Download Action

### Storage Strategy
ระบบควรรองรับ 2 รูปแบบ และ Super Admin สามารถกำหนด Policy ได้

#### Option A — Reference / Link
เก็บ:
- Google Drive File ID
- File Name
- MIME Type
- Preview / Download URL ที่สร้างตามสิทธิ์
- Connected Account ID

ข้อดี:
- ไม่ต้องเก็บไฟล์ซ้ำ
- ใช้พื้นที่ระบบน้อย

ข้อควรระวัง:
- หากเจ้าของลบไฟล์หรือถอนสิทธิ์ ไฟล์อาจไม่สามารถแสดงได้
- ต้องตรวจ Permission ก่อนเปิดไฟล์

#### Option B — Import / Copy into School Storage
เมื่อเลือกไฟล์:
- ระบบดาวน์โหลดไฟล์ผ่านสิทธิ์ที่ได้รับ
- คัดลอกเข้าสู่ Storage ของระบบโรงเรียน
- เก็บ Source File ID สำหรับ Audit
- ข่าวยังเปิดได้แม้เจ้าของย้ายหรือลบไฟล์ต้นทางภายหลัง

เหมาะกับข่าวสาธารณะหรือเอกสารที่ต้องเก็บระยะยาว

### Recommended Publishing Policy
สำหรับ `Public Website` แนะนำให้ใช้ **Import / Copy into School Storage** เพื่อป้องกัน Broken Link และปัญหาสิทธิ์ภายหลัง

สำหรับ `Internal Only` สามารถใช้ Link Reference ได้ หากนโยบายโรงเรียนอนุญาต

### Google Account Connection
หน้า `My Profile > Connected Accounts` เพิ่ม:
- Connect Google Drive
- Connected Email
- Connection Status
- Last Authorized
- Reconnect
- Disconnect

ผู้ใช้งานต้องสามารถยกเลิกการเชื่อมต่อของตนเองได้

### OAuth & Security
- ใช้ Google OAuth 2.0
- ขอ Scope เท่าที่จำเป็น
- ใช้ Google Picker API หรือวิธีที่ Google รองรับ
- Access Token / Refresh Token ต้องเข้ารหัสเมื่อจัดเก็บ
- ห้ามเปิดเผย Token ให้ Client โดยไม่จำเป็น
- Backend ต้องตรวจสิทธิ์ทุกครั้งที่เข้าถึงไฟล์
- ต้องรองรับ Token Refresh
- รองรับ Revoked Token / Expired Session
- บันทึก Connection Error โดยไม่บันทึก Credential แบบ Plain Text

### Google Workspace Compatibility
ระบบควรรองรับบัญชี:
- Google Account ทั่วไป
- Google Workspace ของโรงเรียน

หากโรงเรียนใช้ Google Workspace สามารถต่อยอด:
- จำกัด Domain ที่อนุญาต
- จำกัดให้ใช้เฉพาะบัญชีโรงเรียน
- ใช้นโยบาย Admin Consent ตามที่องค์กรกำหนด

### File Permission Handling
ก่อนเผยแพร่ข่าว:
- ตรวจสอบว่าไฟล์ยังเข้าถึงได้
- ตรวจสอบ Permission
- ตรวจสอบว่าไฟล์เหมาะกับ Publish Scope
- หากเป็น Public News และใช้ Link Reference ต้องเตือนหากไฟล์ยังไม่สามารถเข้าถึงแบบสาธารณะได้
- แนะนำการ Import Copy แทนการเปลี่ยน Drive Permission โดยอัตโนมัติ

### Preview
ก่อนบันทึกข่าว:
- Preview รูปภาพ
- Preview PDF หากรองรับ
- แสดง Icon + Metadata สำหรับเอกสารอื่น
- แสดง Source Badge ว่า `Google Drive`
- แสดงสถานะ `Linked` หรือ `Imported`

### Failure Handling
ระบบต้องรองรับ:
- File Deleted
- Permission Revoked
- Token Expired
- Drive Account Disconnected
- File Moved
- Unsupported File Type
- Import Failed
- Network / API Error

เมื่อเกิดปัญหา:
- แจ้งผู้สร้างข่าว
- แจ้ง Department Manager ตาม Workflow
- แสดงรายการไฟล์ที่ต้องแก้ไข
- ไม่ควรทำให้หน้า Public Website ล่ม

### Department Scope
การใช้ Google Drive ต้องทำงานร่วมกับ Department Publishing:
- บุคลากรใช้ Drive ของตนเอง
- ไฟล์ที่แนบจะผูกกับข่าวของแผนกนั้น
- Department Manager เห็นไฟล์ที่ถูกแนบกับข่าวของแผนกตามสิทธิ์
- ผู้ดูแลไม่ควรได้สิทธิ์เข้าถึง Drive ทั้งบัญชีของผู้เขียน เพียงเพราะมีสิทธิ์จัดการข่าว

### Permissions
เพิ่ม Permission:
- Connect Own Google Drive
- Use Google Drive in News
- Import Drive Files
- View Drive Attachment Metadata
- Remove Drive Attachment
- Manage Drive Integration Policy
- View Drive Integration Logs

### Audit Trail
บันทึก:
- ผู้เชื่อมบัญชี
- ผู้เลือกไฟล์
- Google File ID
- File Name
- Source Account Reference
- ข่าว / ประกาศที่นำไปใช้
- Linked / Imported
- Import Result
- วันเวลา
- ผู้ลบ / เปลี่ยนไฟล์

### Suggested Data Model
เพิ่ม Entity:
- `connected_accounts`
- `google_drive_connections`
- `news_attachments`
- `drive_import_jobs`
- `drive_integration_logs`

ตัวอย่าง `news_attachments`:
- `id`
- `news_id`
- `source_type`
- `source_file_id`
- `source_account_id`
- `file_name`
- `mime_type`
- `file_size`
- `storage_mode`
- `local_storage_url`
- `sort_order`
- `created_by`
- `created_at`

### Admin Settings
เพิ่ม:
`System Settings > Integrations > Google Drive`

ตั้งค่า:
- Enable / Disable Google Drive
- Allowed Account Type
- Allowed Workspace Domain
- Allowed File Types
- Maximum File Size
- Default Storage Mode
- Force Import for Public News
- Token / OAuth Configuration
- Integration Health
- Connection Logs

### UX Example
Flow สำหรับผู้ลงข่าว:

`สร้างข่าว → เพิ่มรูป/เอกสาร → เลือกจาก Google Drive → เลือกไฟล์ → Preview → แนบไฟล์ → ส่งตรวจ/เผยแพร่`

หากยังไม่เชื่อมบัญชี:

`เลือกจาก Google Drive → Connect Google Account → อนุญาตสิทธิ์ → กลับเข้า File Picker → เลือกไฟล์`

## 11. Reports

ระบบรายงานควรออกแบบให้สามารถต่อยอดได้

### Report Center
- รายงานข้อมูลบุคลากร
- รายงานข่าว / ประกาศ
- รายงานเอกสาร
- รายงานกิจกรรม
- รายงานผู้ใช้งาน
- รายงานการเข้าใช้งานระบบ
- รายงาน Notification
- รายงาน Social Sync
- Filter ตามช่วงเวลา
- Export ตามรูปแบบที่ระบบรองรับ
- Print-friendly Layout

---

## 12. User Roles & Permissions

ใช้ **Role-Based Access Control (RBAC)**

### ตัวอย่าง Role
- Super Admin
- School Administrator
- Executive
- Teacher / Staff
- Content Editor
- Authorized User

### Permission
กำหนดสิทธิ์ในระดับ Module และ Action เช่น
- View
- Create
- Edit
- Delete
- Publish
- Approve
- Create Department News
- Edit Own Department News
- Review Department News
- Approve Department News
- Publish Department News
- Export
- Manage Users
- Manage Roles
- Manage System Settings

สิทธิ์ควรตรวจสอบทั้งฝั่ง UI และ Server

---

## 13. Notification System

### ช่องทางภายในระบบ
- Notification Center
- Unread Badge
- Mark as Read
- Notification History

### Trigger ตัวอย่าง
- มีประกาศใหม่
- มีกิจกรรมใหม่
- มีเอกสารเผยแพร่
- Social Feed Sync ผิดพลาด
- มีการเปลี่ยนแปลงข้อมูลสำคัญ
- System Alert

ออกแบบโครงสร้างให้รองรับการต่อยอด Email / Push / Messaging Integration ในอนาคต

---

---

## 13A. Birthday Wishes System

ระบบอวยพรวันเกิดสำหรับครูและบุคลากร เชื่อมกับข้อมูลวันเกิดใน Staff Profile และทำงานร่วมกับ Dashboard / Notification System

### ความสามารถหลัก
- ตรวจสอบวันเกิดของครูและบุคลากรอัตโนมัติจากฐานข้อมูล
- แสดงรายชื่อ **วันเกิดวันนี้** บน Dashboard
- แสดงรายการ **วันเกิดที่กำลังจะมาถึง** เช่น ภายใน 7 วัน หรือ 30 วัน
- สร้างข้อความอวยพรวันเกิดอัตโนมัติจาก Template ที่ผู้ดูแลกำหนด
- รองรับข้อความอวยพรหลายรูปแบบ เช่น ทางการ เป็นกันเอง หรือข้อความจากโรงเรียน
- ผู้ดูแลสามารถแก้ไขข้อความก่อนเผยแพร่ได้
- ตั้งเวลาเผยแพร่ข้อความอวยพรอัตโนมัติในวันที่กำหนด
- ส่ง Notification ภายในระบบให้เจ้าของวันเกิดและ/หรือผู้ใช้งานกลุ่มที่กำหนด
- แสดง Birthday Card หรือ Birthday Banner บนหน้า Dashboard
- สามารถกำหนดให้แสดงบน Public Website ได้เฉพาะกรณีที่บุคลากรอนุญาต
- รองรับการแนบรูปโปรไฟล์และกราฟิกอวยพร
- ปุ่ม Copy / Share สำหรับนำข้อความไปใช้กับ Social Media ของโรงเรียน
- เก็บประวัติการอวยพรย้อนหลัง
- ป้องกันการส่งข้อความซ้ำในวันเดียวกัน

### Birthday Settings
- เปิด / ปิดระบบอวยพรวันเกิด
- กำหนดช่วงเวลาที่จะแจ้งเตือนล่วงหน้า
- กำหนดกลุ่มผู้รับ Notification
- เลือก Template เริ่มต้นจาก Template Gallery
- จัดการ Birthday Card Templates
- เปิด / ปิด Auto Publish
- เปิด / ปิดการแสดงบน Public Website
- เปิด / ปิดการแสดงอายุ
- ตั้งค่า Privacy สำหรับข้อมูลวันเกิด
- ตั้งค่า Time Zone ของโรงเรียนเพื่อให้การแจ้งเตือนตรงวัน

### Birthday Card Template Gallery

ระบบการ์ดอวยพรต้องมี **Template Gallery** ให้ผู้ดูแลเลือกดีไซน์ก่อนส่งหรือเผยแพร่

#### ความสามารถของ Template Gallery
- แสดง Template แบบ Thumbnail / Card Grid
- พรีวิวการ์ดแบบเต็มก่อนเลือกใช้งาน
- เลือก Template ที่ต้องการด้วยปุ่ม Use Template
- กำหนด Template เริ่มต้นของโรงเรียนได้
- แบ่งหมวดหมู่ Template เช่น Modern, Elegant, Cute, Technology, Blue-Pink และ Minimal
- ค้นหาและกรอง Template ตามหมวดหมู่
- รองรับ Template แนวตั้ง แนวนอน และ Square สำหรับ Social Media
- Duplicate Template เพื่อสร้างเวอร์ชันใหม่
- เปิด / ปิด Template ที่ไม่ต้องการใช้งาน
- กำหนดสิทธิ์ว่าใครสามารถสร้าง แก้ไข หรือลบ Template ได้
- เก็บประวัติว่า Birthday Wish แต่ละรายการใช้ Template ใด

#### Customization หลังเลือก Template
ผู้ดูแลสามารถปรับแต่งได้ก่อนส่ง เช่น
- ข้อความอวยพร
- ชื่อผู้รับ
- รูปโปรไฟล์ครู / บุคลากร
- สีพื้นหลัง
- รูปพื้นหลัง
- Font Style
- Logo โรงเรียน
- ลายกราฟิก / Decoration
- ตำแหน่งข้อความ
- วันที่
- ลายเซ็นหรือชื่อหน่วยงานผู้ส่ง

ควรมี **Live Preview** ให้เห็นผลทันทีระหว่างปรับแต่ง

#### Template Variables
Template สามารถรองรับตัวแปร เช่น
- `{staff_name}`
- `{position}`
- `{department}`
- `{birthday_date}`
- `{school_name}`

ตัวอย่างข้อความ:
> สุขสันต์วันเกิด {staff_name} ขอให้มีความสุข สุขภาพแข็งแรง และประสบความสำเร็จในทุกด้าน ด้วยความปรารถนาดีจาก {school_name}

#### การส่งออก / การใช้งาน
- ส่งเป็น Birthday Card ภายในระบบ
- แสดงบน Dashboard
- เผยแพร่บน Public Website ตามสิทธิ์และ Privacy
- Export เป็นภาพสำหรับนำไปใช้บน Social Media
- Copy ข้อความอวยพร
- รองรับการต่อยอด Share / Publish ไปยัง Social Platform ที่เชื่อมต่อ

### Birthday Template Management
Admin สามารถจัดการ Template ได้จากเมนู Birthday Wishes > Templates

ข้อมูลของ Template ควรประกอบด้วย:
- Template Name
- Category
- Orientation
- Preview Image
- Background / Graphic Assets
- Default Message
- Font / Typography Settings
- Layout Configuration
- Active / Inactive
- Default Template
- Created By
- Updated At

### Executive Dashboard Widget
เพิ่ม Widget:
- Birthdays Today
- Upcoming Birthdays
- จำนวนวันเกิดในเดือนนี้
- ปุ่มส่งคำอวยพร
- สถานะว่าอวยพรแล้ว / ยังไม่ได้อวยพร

### Permission
เพิ่มสิทธิ์ที่เกี่ยวข้อง:
- View Birthdays
- Manage Birthday Settings
- Manage Birthday Templates
- Create Birthday Templates
- Edit Birthday Templates
- Delete Birthday Templates
- Send Birthday Wishes
- Publish Birthday Wishes
- View Birthday History

### Suggested Data Model
เพิ่ม Entity:
- `birthday_wish_templates`
- `birthday_template_assets`
- `birthday_wishes`
- `birthday_wish_recipients`
- `birthday_settings`

ฟิลด์สำคัญใน `staff`:
- `birth_date`
- `birthday_visibility`
- `birthday_wish_opt_in`

> ข้อมูลวันเกิดถือเป็นข้อมูลส่วนบุคคล ควรกำหนดสิทธิ์เข้าถึงอย่างเหมาะสม และไม่ควรเผยแพร่วันเดือนปีเกิดเต็มรูปแบบบน Public Website โดยไม่มีความยินยอม

## 14. Authentication & Security

- Secure Login
- Password Hashing
- Session Management
- Role / Permission Validation
- Password Reset
- Account Status
- Login Audit
- Rate Limiting สำหรับ Endpoint ที่สำคัญ
- Input Validation
- File Upload Validation
- CSRF / XSS / Injection Protection ตาม Stack ที่ใช้
- Audit Log สำหรับการแก้ไขข้อมูลสำคัญ

---

## 15. Suggested Data Model

### Core Entities
- users
- website_themes
- website_theme_versions
- website_templates
- branding_settings
- homepage_sections
- theme_assets
- roles
- permissions
- user_roles
- role_permissions
- staff
- staff_imports
- staff_import_rows
- staff_profile_change_requests
- departments
- schedules
- schedule_items
- documents
- document_categories
- news
- news_templates
- news_template_versions
- department_news_template_settings
- news_revisions
- news_approvals
- connected_accounts
- google_drive_connections
- news_attachments
- drive_import_jobs
- drive_integration_logs
- announcements
- departments
- department_members
- department_history
- department_structure_versions
- department_assignments
- department_assignment_permissions
- department_role_templates
- events
- notifications
- notification_recipients
- birthday_wish_templates
- birthday_wishes
- birthday_wish_recipients
- birthday_settings
- social_connections
- social_posts
- social_sync_logs
- audit_logs

---

## 16. Admin Navigation

### Main Menu
- Dashboard
- Website Design
  - Templates
  - Theme Colors
  - Branding / Favicon
  - Typography
  - Layout
  - Homepage Sections
  - Preview / Version History
- ครู / บุคลากร
  - รายชื่อบุคลากร
  - นำเข้าจาก Excel
  - ประวัติการนำเข้า
- โปรไฟล์ของฉัน
- โครงสร้างองค์กร
  - แผนก / หน่วยงาน
  - ผังองค์กร
  - จัดโครงสร้าง
  - ผู้รับผิดชอบแผนก
- ตารางเรียน
- เอกสาร
- ข่าว / ประกาศ
  - News Templates
- ข่าว / ประกาศตามหน่วยงาน
- Google Drive Integration
- ปฏิทินกิจกรรม
- รายงาน
- Social Media
- Notifications
- Birthday Wishes
- Users
- Roles & Permissions
- System Settings
- Audit Logs

---

## 17. Responsive Requirements

รองรับอย่างน้อย
- Desktop
- Laptop
- Tablet
- Mobile

### Mobile UX
- Collapsible Menu
- Touch-friendly Buttons
- Responsive Tables
- Card View สำหรับข้อมูลที่อ่านยากบนหน้าจอเล็ก
- Sticky Important Actions ตามความเหมาะสม

---

## 18. Public Website SEO

- Semantic HTML
- Page Title / Meta Description
- Open Graph Metadata
- Sitemap
- Robots Configuration
- Friendly URLs
- Structured content hierarchy
- Image Alt Text
- Performance Optimization
- Social Sharing Metadata

---

## 19. Performance

- Lazy-load รูปภาพและข้อมูลที่เหมาะสม
- Optimized Images
- Cache Public Content
- Cache Social Feed
- Pagination
- Server-side Filtering สำหรับข้อมูลจำนวนมาก
- Database Indexing
- ลด JavaScript ที่ไม่จำเป็นใน Public Pages

---

## 20. Suggested Page Map

```text
/
├── about
├── staff
├── news
│   └── [slug]
├── announcements
│   └── [slug]
├── calendar
│   └── [event]
├── documents
├── contact
├── login
└── admin
    ├── dashboard
    ├── staff
    ├── schedules
    ├── documents
    ├── news
    ├── announcements
    ├── calendar
    ├── reports
    ├── social
    ├── notifications
    ├── users
    ├── roles
    ├── settings
    └── audit-logs
```

---

## 21. Core Build Prompt

Create a modern full-stack website for Datdaruni School (โรงเรียนดัดดรุณี) with a polished technology-forward visual identity using blue and pink, clean contemporary typography, subtle gradients, spacious layouts, and responsive design. Add an admin-controlled website theme and template manager that can change the active site template, favicon, logos, typography, layout settings, homepage section order, and all major website colors through design tokens, with responsive live preview, draft/publish workflow, version history, and rollback. Build two connected parts in one system: a public school website with Home, About, News and Announcements, Activity Calendar, Documents, Staff directory, Contact, and login access; and a secure management portal with role-based permissions for administrators, teachers/staff, and other authorized users. The management portal should include teacher and staff information, class schedules, document management, news and announcements, activity calendar, reports, an executive dashboard with useful summary metrics, user roles and permissions, a notification system, and an automated birthday wishes module for teachers and staff with upcoming-birthday widgets, editable message templates, privacy controls, and notification integration, backed by a database and authentication. Add Excel staff import that accepts only first name, last name, and department, with column mapping, validation, preview, duplicate detection, import history, and a downloadable template. Give each staff member a self-service profile where they can edit their own profile photo, first name, last name, department, gender, position, and date of birth, with age calculated automatically from the date of birth rather than stored as a fixed value. Add full department management with the ability to create, edit, archive, and hierarchically organize departments, assign department heads and members, and manage an interactive organization chart with parent-child relationships, drag-and-drop structure editing, ordering, public visibility controls, and audit history. Make the head of each department the default department administrator, while allowing the Super Admin to appoint one or more additional responsible staff members per department, assign department-scoped roles and granular permissions, support multi-department and temporary assignments, and enforce all permissions server-side with complete audit logs. Add department-based publishing so authorized staff in each department can create and manage their own news and announcements, with department ownership, scoped permissions, draft/review/approval/publish workflows, scheduled publishing, internal or public visibility, notifications, and audit history. Add a news and announcement template gallery so authors can choose a responsive presentation template per post, with preview, default templates by content type or department, Super Admin controls, and safe fallback to a default template. Integrate Google Drive per user so a news author can connect their own Google account via OAuth and select images or documents from their Drive using a supported picker; allow Drive files to be used as cover images, content images, galleries, or attachments, with preview, permission validation, and either linked-reference or import-copy storage modes. For public news, support a policy that imports a copy into school-controlled storage to prevent broken links or later permission changes. Add a social media integration layer that can connect the school's supported social accounts/pages and automatically pull approved posts into the public website through available APIs or feeds, with admin controls for connection settings and display. Include strong information architecture, accessible responsive UI, search/filtering where useful, audit-friendly administration patterns, and basic SEO for the public pages.

---

## 22. Definition of Done

ระบบเวอร์ชันใช้งานได้ควรมีอย่างน้อย
- Public Website ที่ Responsive
- Website Theme & Template Manager
- ปรับ Favicon / Logo / สี / Typography / Layout จากหลังบ้าน
- Live Preview / Draft / Publish / Rollback Theme
- Login / Authentication
- Role & Permission
- Executive Dashboard
- Teacher / Staff Management
- Excel Staff Import เฉพาะชื่อ นามสกุล และแผนก
- Self-Service Staff Profile พร้อมแก้ไขรูปและข้อมูลส่วนตัว
- คำนวณอายุอัตโนมัติจากวันเดือนปีเกิด
- Department Management สำหรับเพิ่ม/แก้ไข/ปิดใช้งานแผนก
- Organization Chart แบบหลายระดับ พร้อม Drag & Drop
- กำหนดหัวหน้าแผนก สมาชิก และโครงสร้าง Parent/Child
- Department Admin โดยหัวหน้าแผนกเป็นผู้ดูแลเริ่มต้น
- Super Admin สามารถแต่งตั้งผู้รับผิดชอบเพิ่มเติมและกำหนดสิทธิ์รายแผนก
- รองรับ Multi-Department / Temporary Delegation พร้อม Audit Log
- Class Schedule
- Document Management
- News / Announcement CMS
- News & Announcement Template Gallery พร้อม Preview และ Default Template
- Department News Publishing พร้อม Workflow อนุมัติ
- Google Drive Integration สำหรับผู้ลงข่าวแต่ละคน
- เลือกรูปภาพ/เอกสารจาก Google Drive ผ่าน OAuth และ File Picker
- รองรับ Linked Reference และ Import Copy พร้อม Permission Validation
- สิทธิ์สร้าง/แก้ไข/อนุมัติข่าวแยกตามหน่วยงาน
- Filter ข่าวตามหน่วยงานบน Public Website
- Activity Calendar
- Reports
- Notification Center
- Birthday Wishes System สำหรับครูและบุคลากร
- Birthday Dashboard Widget และ Upcoming Birthdays
- Birthday Card Template Gallery พร้อม Preview และเลือก Template ก่อนส่ง
- Birthday Card Editor พร้อม Live Preview
- Birthday Message Templates และการตั้งค่า Privacy
- Social Media Integration Settings
- Automatic Social Feed Sync
- Audit Log
- SEO พื้นฐาน
- Mobile-friendly Admin
