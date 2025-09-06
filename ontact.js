const SUPABASE_URL = "https://afmhiphzsbzpdfpsouxu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmbWhpcGh6c2J6cGRmcHNvdXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNzM4MTAsImV4cCI6MjA3MjY0OTgxMH0.5gUYGdG7NKxlgquy0FGwCGvDbfgjVrYSgrOKIQx6pbg";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const alertMsg = document.getElementById("alert-msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const full_name = document.getElementById("full_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!full_name || !email || !phone || !message) {
      alertMsg.style.display = "block";
      alertMsg.style.color = "red";
      alertMsg.innerText = "يرجى ملء كل الحقول ✅";
      return;
    }

    const payload = { full_name, email, phone, message };
    console.log("Payload:", payload);

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error:", error);
        alertMsg.style.display = "block";
        alertMsg.style.color = "red";
        alertMsg.innerText = "فشل الإرسال ❌ تحقق من الكونسول.";
      } else {
        const data = await response.json();
        console.log("Saved:", data);
        alertMsg.style.display = "block";
        alertMsg.style.color = "green";
        alertMsg.innerText = "تم إرسال رسالتك بنجاح ✅";
        form.reset();
      }
    } catch (err) {
      console.error("Connection Error:", err);
      alertMsg.style.display = "block";
      alertMsg.style.color = "red";
      alertMsg.innerText = "حدث خطأ أثناء الإرسال ❌";
    }
  });
});
