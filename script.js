// بيانات Supabase
const SUPABASE_URL = "https://afmhiphzsbzpdfpsouxu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmbWhpcGh6c2J6cGRmcHNvdXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNzM4MTAsImV4cCI6MjA3MjY0OTgxMH0.5gUYGdG7NKxlgquy0FGwCGvDbfgjVrYSgrOKIQx6pbg";

// تحميل التعليقات
async function loadTestimonials() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/testimonials?select=*`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  });
  const data = await res.json();
  const container = document.getElementById("testimonials-list");
  container.innerHTML = data.map(t => `
    <div class="testimonial">
      <h4>${t.name}</h4>
      <p>${t.content}</p>
      <small>⭐ ${t.rating || 5}</small>
    </div>
  `).join("");
}

// إرسال رسالة تواصل


// Scroll Animations
const animatedElements = document.querySelectorAll(".animate");

function checkScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkScroll);
window.addEventListener("load", checkScroll);

// ✅ هنا تقدر تضيف كود Supabase للـ Testimonials و Contact زي ما عملنا قبل

// تفعيل القائمة في الموبايل
document.getElementById("menu-toggle")?.addEventListener("click", () => {
  document.querySelector(".navbar ul").classList.toggle("show");
});

// تغيير ستايل النافبار عند التمرير
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


document.addEventListener("scroll", () => {
  const aboutSection = document.getElementById("about");
  const rect = aboutSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    aboutSection.classList.add("show");
  }
});


document.addEventListener("scroll", () => {
  const servicesSection = document.getElementById("services");
  const rect = servicesSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    servicesSection.classList.add("show");
  }
});


const SUPABASE_VIDEO_BASE = "https://afmhiphzsbzpdfpsouxu.supabase.co/storage/v1/object/public/videos/videos/";

document.querySelectorAll(".portfolio-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const videoName = btn.getAttribute("data-video"); // فقط اسم الفيديو مثل mohaspi.mp4
    const videoUrl = SUPABASE_VIDEO_BASE + encodeURIComponent(videoName);

    const modal = document.getElementById("portfolioVideoModal");
    const video = document.getElementById("portfolioVideoPlayer");

    video.src = videoUrl;
    modal.style.display = "flex";
    video.play();
  });
});

document.querySelector(".portfolio-close").addEventListener("click", () => {
  const modal = document.getElementById("portfolioVideoModal");
  const video = document.getElementById("portfolioVideoPlayer");

  video.pause();
  video.currentTime = 0;
  modal.style.display = "none";
});






// تحميل التعليقات عند فتح الصفحة
loadTestimonials();
