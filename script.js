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
  const heroTextsDesktop = [
    "Zwiększamy efektywność działów sprzedaży i rozwijamy liderów,<br>którzy osiągają wyniki.",
    "Przekładamy strategię biznesową<br>na mierzalne rezultaty organizacji<br>i sprzedaży.",
    "Budujemy zespoły,<br>które dowożą cele i rosną szybciej niż rynek."
  ];

  const heroTextsMobile = [
    '<span class="hero-line">Podnosimy skuteczność</span><span class="hero-line">sprzedaży i rozwój</span><span class="hero-line">liderów zespołów.</span>',
    '<span class="hero-line">Przekładamy strategię</span><span class="hero-line">na mierzalne wyniki</span><span class="hero-line">sprzedaży i firmy.</span>',
    '<span class="hero-line">Budujemy zespoły,</span><span class="hero-line">które realizują cele</span><span class="hero-line">i rosną szybciej.</span>'
  ];

  const getActiveHeroTexts = () => {
    if (window.matchMedia("(max-width: 760px)").matches) {
      return heroTextsMobile;
    }

    return heroTextsDesktop;
  };

  let activeHeroTexts = getActiveHeroTexts();

  const updateHeroTitleMinHeight = () => {
    const probe = rotatingHero.cloneNode(false);
    probe.classList.remove("is-fading");
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.pointerEvents = "none";
    probe.style.height = "auto";
    probe.style.minHeight = "0";
    probe.style.width = `${rotatingHero.clientWidth}px`;

    heroSection.appendChild(probe);

    let maxHeight = 0;
    activeHeroTexts.forEach((text) => {
      probe.innerHTML = text;
      maxHeight = Math.max(maxHeight, probe.offsetHeight);
    });

    probe.remove();
    rotatingHero.style.minHeight = `${Math.ceil(maxHeight)}px`;
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&h=1100&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&h=1100&q=80",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&h=1100&q=80"
  ];

  rotatingHero.innerHTML = activeHeroTexts[0];
  updateHeroTitleMinHeight();

  let heroResizeRaf = 0;
  window.addEventListener("resize", () => {
    if (heroResizeRaf) {
      cancelAnimationFrame(heroResizeRaf);
    }

    heroResizeRaf = requestAnimationFrame(() => {
      const nextHeroTexts = getActiveHeroTexts();
      if (nextHeroTexts !== activeHeroTexts) {
        activeHeroTexts = nextHeroTexts;
        idx %= activeHeroTexts.length;
        rotatingHero.innerHTML = activeHeroTexts[idx];
      }

      updateHeroTitleMinHeight();
    });
  });

  heroLayerA.src = heroImages[0];
  heroLayerB.src = heroImages[1];
  heroLayerA.alt = "";
  heroLayerB.alt = "";

  let idx = 0;
  let activeLayer = heroLayerA;
  let inactiveLayer = heroLayerB;

  setInterval(() => {
    idx = (idx + 1) % activeHeroTexts.length;

    inactiveLayer.src = heroImages[idx];
    inactiveLayer.classList.add("is-visible");
    activeLayer.classList.remove("is-visible");

    rotatingHero.classList.add("is-fading");
    setTimeout(() => {
      rotatingHero.innerHTML = activeHeroTexts[idx];
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

