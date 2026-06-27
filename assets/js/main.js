const TELEGRAM_USERNAME = "lvbao3389";

function setupTelegramLinks() {
  const tgUrl = `https://t.me/${TELEGRAM_USERNAME}`;
  document.querySelectorAll(".js-tg-link").forEach((link) => {
    link.href = tgUrl;
    link.innerHTML = link.innerHTML.replace(/@YourTelegram|YourTelegram/g, `@${TELEGRAM_USERNAME}`);
  });
}

function setupMobileMenu() {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => menu.classList.toggle("open"));
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => menu.classList.remove("open"));
  });
}

function setupRevealAnimation() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("show"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function applyLanguage(lang) {
  const isEn = lang === "en";
  document.body.classList.toggle("lang-en", isEn);

  const btn = document.getElementById("langBtn");
  if (btn) btn.textContent = isEn ? "中文" : "EN";

  document.documentElement.lang = isEn ? "en" : "zh-CN";

  document.querySelectorAll("[data-zh][data-en]").forEach((el) => {
    el.textContent = isEn ? el.dataset.en : el.dataset.zh;
  });
}

function setupLanguageSwitch() {
  // 默认中文；用户切换后，全站永久保存。
  const saved = localStorage.getItem("cqpay-lang") || "zh";
  applyLanguage(saved);

  const btn = document.getElementById("langBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const nextLang = document.body.classList.contains("lang-en") ? "zh" : "en";
    localStorage.setItem("cqpay-lang", nextLang);
    applyLanguage(nextLang);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupTelegramLinks();
  setupMobileMenu();
  setupRevealAnimation();
  setupLanguageSwitch();
});


function setupScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function setupCountUp() {
  const items = document.querySelectorAll("[data-count]");
  if (!items.length) return;

  const animateItem = (el) => {
    if (el.dataset.done === "1") return;
    el.dataset.done = "1";

    const target = Number(el.dataset.count || "0");
    const suffix = el.dataset.suffix || "";
    const duration = 950;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(target * eased);
      el.textContent = `${value}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    items.forEach(animateItem);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateItem(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.45 });

  items.forEach((item) => observer.observe(item));
}

function setupLiveTerminal() {
  const rows = Array.from(document.querySelectorAll(".terminal-row"));
  if (!rows.length) return;

  let idx = 0;
  const update = () => {
    rows.forEach((row) => row.classList.remove("is-live"));
    rows[idx % rows.length].classList.add("is-live");
    idx += 1;
  };

  update();
  window.setInterval(update, 1400);
}

function setupCtaGlow() {
  const panels = document.querySelectorAll(".cta-panel");
  panels.forEach((panel) => {
    panel.addEventListener("mousemove", (event) => {
      const rect = panel.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      panel.style.setProperty("--mx", `${x}%`);
      panel.style.setProperty("--my", `${y}%`);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupScrollProgress();
  setupCountUp();
  setupLiveTerminal();
  setupCtaGlow();
});
