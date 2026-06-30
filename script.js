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
