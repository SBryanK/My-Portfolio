/*
  script.js
  1) Copy phone number
  2) Fade-in on scroll (IntersectionObserver)
  3) Animate background gradient on scroll
*/

// COPY PHONE NUMBER
function copyToClipboard(number) {
  navigator.clipboard.writeText(number).then(() => {
    alert(`Phone number ${number} copied to clipboard!`);
  });
}

// FADE-IN ON SCROLL
document.addEventListener("DOMContentLoaded", function () {
  const faders = document.querySelectorAll(".fade-section");
  const fadeLefts = document.querySelectorAll(".fade-left");
  const fadeRights = document.querySelectorAll(".fade-right");
  const fadeBottoms = document.querySelectorAll(".fade-bottom");

  const appearOptions = {
    threshold: 0.3,
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.classList.contains("fade-section")) {
        entry.target.classList.add("visible");
      }
      if (
        entry.target.classList.contains("fade-left") ||
        entry.target.classList.contains("fade-right") ||
        entry.target.classList.contains("fade-bottom")
      ) {
        entry.target.classList.add("visible");
      }
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
  fadeLefts.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
  fadeRights.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
  fadeBottoms.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
});

// ANIMATE BACKGROUND ON SCROLL
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // We'll shift the body::before element by negative scroll amount
  document.body.style.setProperty(
    "--bg-scroll",
    `translateY(${-scrollTop * 0.1}px)`
  );
  // If needed, place a <div id="bg-layer"> behind content and manipulate that for full compatibility
});

// Dapatkan referensi elemen
const burgerButton = document.getElementById('burger');
const desktopNav = document.getElementById('desktop-nav'); // Atau elemen menu mobile Anda jika terpisah

// Tambahkan event listener untuk klik
burgerButton.addEventListener('click', function() {

  desktopNav.classList.toggle('active'); // Contoh: toggle kelas 'active' pada #desktop-nav

  // Opsional: Toggle atribut aria-expanded untuk aksesibilitas
  const isExpanded = burgerButton.getAttribute('aria-expanded') === 'true';
  burgerButton.setAttribute('aria-expanded', !isExpanded);

  // Opsional: Jika Anda menggunakan kelas pada body/html untuk mengunci scroll
  document.body.classList.toggle('menu-open');
});

const navLinks = document.querySelectorAll('#desktop-nav .nav-links li a'); // Atau selector yang tepat untuk link di menu mobile Anda
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    desktopNav.classList.remove('active'); // Tutup menu
    burgerButton.setAttribute('aria-expanded', 'false'); // Reset aria-expanded
    document.body.classList.remove('menu-open'); // Jika menggunakan kelas pada body
  });
});

carousel.addEventListener("touchstart",()=>carousel.classList.add("pause"));
carousel.addEventListener("touchend",  ()=>carousel.classList.remove("pause"));
