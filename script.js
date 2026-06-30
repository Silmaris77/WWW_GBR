const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const rotatingHero = document.querySelector("[data-hero-rotation]");
const heroSection = document.querySelector(".hero");
const heroLayerA = document.querySelector(".hero-bg-a");
const heroLayerB = document.querySelector(".hero-bg-b");

if (rotatingHero && heroSection && heroLayerA && heroLayerB) {
  const heroTexts = [
    "Zwiększamy efektywność działów sprzedaży i rozwijamy liderów, którzy osiągają wyniki.",
    "Przekładamy strategię biznesową na mierzalne rezultaty organizacji.",
    "Budujemy zespoły, które dowożą cele i rosną szybciej niż rynek."
  ];

  const heroImages = [
    "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80"
  ];

  heroLayerA.style.backgroundImage = `url("${heroImages[0]}")`;
  heroLayerB.style.backgroundImage = `url("${heroImages[1]}")`;

  let idx = 0;
  let activeLayer = heroLayerA;
  let inactiveLayer = heroLayerB;

  setInterval(() => {
    idx = (idx + 1) % heroTexts.length;

    inactiveLayer.style.backgroundImage = `url("${heroImages[idx]}")`;
    inactiveLayer.classList.add("is-visible");
    activeLayer.classList.remove("is-visible");

    rotatingHero.classList.add("is-fading");
    setTimeout(() => {
      rotatingHero.textContent = heroTexts[idx];
      rotatingHero.classList.remove("is-fading");
    }, 230);

    [activeLayer, inactiveLayer] = [inactiveLayer, activeLayer];
  }, 7000);
}

const calendarTriggers = document.querySelectorAll("[data-calendar-url]");

calendarTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    const calendarUrl = trigger.getAttribute("data-calendar-url");

    if (!calendarUrl) {
      return;
    }

    event.preventDefault();

    if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
      window.Calendly.initPopupWidget({ url: calendarUrl });
      return;
    }

    window.open(calendarUrl, "_blank", "noopener,noreferrer");
  });
});

const revealItems = document.querySelectorAll(".reveal");
const floatingCta = document.querySelector(".floating-cta");

if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const counters = document.querySelectorAll(".counter[data-count-to]");

if (counters.length > 0) {
  const runCounter = (el) => {
    const target = Number(el.getAttribute("data-count-to") || "0");

    if (!Number.isFinite(target) || target <= 0) {
      el.textContent = String(target);
      return;
    }

    const duration = 1200;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = String(value);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        runCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.55 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

if (floatingCta) {
  const toggleFloatingCta = () => {
    if (window.scrollY > 520) {
      floatingCta.classList.add("is-visible");
      return;
    }

    floatingCta.classList.remove("is-visible");
  };

  window.addEventListener("scroll", toggleFloatingCta, { passive: true });
  toggleFloatingCta();
}

