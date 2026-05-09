/* ── NAV SCROLL ───────────────────────────────────────────── */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
  document
    .getElementById("backToTop")
    .classList.toggle("visible", window.scrollY > 400);
});

/* ── BURGER MENU ──────────────────────────────────────────── */
document.getElementById("burger").addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.toggle("open");
});
document.querySelectorAll(".nav__mobile a").forEach((a) => {
  a.addEventListener("click", () =>
    document.getElementById("mobileMenu").classList.remove("open"),
  );
});

/* ── TYPEWRITER ───────────────────────────────────────────── */
const words = [
  "UI Engineer",
  "Web Craftsman",
  "Accessibility Advocate",
  "CSS Wizard",
];
let wi = 0,
  ci = 0,
  deleting = false;
const tw = document.getElementById("typewriter");
function typeLoop() {
  const word = words[wi];
  if (!deleting) {
    tw.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    tw.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
  }
  setTimeout(typeLoop, deleting ? 60 : 100);
}
typeLoop();

/* ── COUNTER ANIMATION ────────────────────────────────────── */
function animateCounters() {
  document.querySelectorAll(".stat__num").forEach((el) => {
    const target = +el.dataset.target;
    let cur = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = cur;
      if (cur >= target) clearInterval(timer);
    }, 40);
  });
}
let countersTriggered = false;
const heroObserver = new IntersectionObserver(
  ([e]) => {
    if (e.isIntersecting && !countersTriggered) {
      countersTriggered = true;
      animateCounters();
    }
  },
  { threshold: 0.3 },
);
heroObserver.observe(document.querySelector(".hero__stats"));

/* ── REVEAL ON SCROLL ─────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

/* ── SKILL BAR ANIMATION ──────────────────────────────────── */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target
          .querySelectorAll(".skill-fill")
          .forEach((bar) => bar.classList.add("animated"));
        skillObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.2 },
);
const skillPanel = document.querySelector('.skills__panel[data-panel="core"]');
if (skillPanel) skillObserver.observe(skillPanel);

/* ── TABS ─────────────────────────────────────────────────── */
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".skills__panel")
      .forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    const panel = document.querySelector(
      `.skills__panel[data-panel="${btn.dataset.tab}"]`,
    );
    panel.classList.add("active");
    if (btn.dataset.tab === "core") {
      panel
        .querySelectorAll(".skill-fill")
        .forEach((bar) => bar.classList.add("animated"));
    }
  });
});

/* ── PROJECT FILTER ───────────────────────────────────────── */
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
    });
  });
});

/* ── CONTACT FORM ─────────────────────────────────────────── */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = "Sending…";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = "Message Sent! ✓";
    btn.style.background = "linear-gradient(135deg, #34d399, #059669)";
    e.target.reset();
    setTimeout(() => {
      btn.textContent = "Send Message →";
      btn.disabled = false;
      btn.style.background = "";
    }, 3000);
  }, 1200);
});

/* ── BACK TO TOP ──────────────────────────────────────────── */
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ── SMOOTH NAV LINKS ─────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
