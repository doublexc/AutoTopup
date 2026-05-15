# TopupListener

แอปพลิเคชัน Android สำหรับดักจับการแจ้งเตือน (Notification Listener) จาก **SCB Connect** บนแอป LINE เพื่อส่งข้อมูลไปประมวลผลและทำการเติมเงิน/ทำรายการอัตโนมัติ

---

## ฟีเจอร์หลัก (Features)
*   **Notification Detection:** ดักจับและตรวจจับข้อความแจ้งเตือนเงินเข้าจาก SCB Connect
*   **Automation Integration:** ส่งข้อมูลต่อไปยัง Page Worker และ Google Apps Script เพื่อจัดการระบบเติมเงินโดยอัตโนมัติ

---

## การตั้งค่าโปรเจกต์ (Setup Guide)

### 1. การตั้งค่าฝั่ง Android App
สร้างไฟล์ชื่อ `local.properties` ไว้ที่โฟลเดอร์ Root ของโปรเจกต์ (โฟลเดอร์เดียวกับไฟล์ `build.gradle` ระดับโปรเจกต์) จากนั้นเพิ่มตระกูลคอนฟิกดังนี้:

```properties
SHEET_URL=ใส่_URL_Google_Apps_Script_ของคุณ

### 2. การตั้งค่า Page Worker / Environment Variables
กำหนดตัวแปรสภาพแวดล้อม (Environment Variables) ในระบบ Page Worker ของคุณให้เรียบร้อยก่อนเริ่มต้นใช้งาน:

PROMPTPAY_ID	หมายเลขโทรศัพท์ หรือ เลขประจำตัวประชาชน ที่ผูกกับระบบพร้อมเพย์
SCRIPT_URL	Web App URL ของ Google Apps Script ที่ใช้จัดการรับ-ส่งข้อมูล
