export default {
  async fetch(request, env) {
    // ตั้งค่า CORS เพื่อให้หน้าเว็บของคุณเรียกใช้งาน Worker นี้ได้
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // ตอบกลับหน้าเว็บเวลาเช็คการเชื่อมต่อ (Preflight request)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === "POST") {
      try {
        const { id, amount } = await request.json();

        // ยิงไปหา Google Script โดยใช้ค่าจาก Variables ที่เราตั้งไว้ใน Settings
        const response = await fetch(env.SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify({ id, amount })
        });
        const result = await response.json();

        // ส่งเบอร์โทรที่ซ่อนไว้ใน Variables กลับไปให้หน้าเว็บเพื่อสร้าง QR
        return new Response(JSON.stringify({
          ...result,
          promptpayId: env.PROMPTPAY_ID 
        }), { 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });

      } catch (err) {
        return new Response(JSON.stringify({ status: "error", message: err.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }

    return new Response("กรุณาส่ง POST request", { status: 400 });
  }
}
