// ---------- Loading screen ----------
const loadingScreen = document.getElementById("loadingScreen");
const loadingProgress = document.getElementById("loadingProgress");
const loadingPercentage = document.getElementById("loadingPercentage");

document.body.style.overflow = "hidden";

let progress = 0;
const loadingInterval = setInterval(() => {
  progress = Math.min(progress + Math.random() * 15, 100);
  loadingProgress.style.width = progress + "%";
  loadingPercentage.textContent = Math.floor(progress) + "%";

  if (progress >= 100) {
    clearInterval(loadingInterval);
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      document.body.style.overflow = "";
    }, 400);
  }
}, 150);

// ---------- Nav: solid background after scrolling past the top ----------
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Mobile menu ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => nav.classList.toggle("open"));
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") nav.classList.remove("open");
});

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Active nav link while scrolling ----------
const sections = [...document.querySelectorAll("section[id]")];
const linkFor = (id) => navLinks.querySelector(`a[href="#${id}"]`);
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = linkFor(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => sectionObserver.observe(s));

// ---------- Footer year ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Autoplay fallback: some browsers block autoplay until interaction ----------
const heroVideo = document.querySelector(".hero-video");
if (heroVideo) {
  heroVideo.play().catch(() => {
    const resume = () => {
      heroVideo.play().catch(() => {});
      window.removeEventListener("click", resume);
      window.removeEventListener("touchstart", resume);
    };
    window.addEventListener("click", resume);
    window.addEventListener("touchstart", resume);
  });
}
