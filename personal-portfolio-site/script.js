// ===== SMOOTH SCROLL FOR BUTTONS =====
function scrollTo(selector) {
  document.querySelector(selector).scrollIntoView({ behavior: "smooth" });
}

// ===== TYPING EFFECT =====
const words = [
  "AI Systems 🧠",
  "ML Models 📊",
  "Web Apps 🌐",
  "Smart Solutions ⚡",
];
let wordIndex = 0,
  charIndex = 0;
const typedEl = document.getElementById("typed");

function type() {
  if (charIndex < words[wordIndex].length) {
    typedEl.textContent += words[wordIndex][charIndex++];
    setTimeout(type, 90);
  } else {
    setTimeout(erase, 1600);
  }
}

function erase() {
  if (charIndex > 0) {
    typedEl.textContent = words[wordIndex].slice(0, --charIndex);
    setTimeout(erase, 45);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 300);
  }
}

type();

// ===== SCROLL REVEAL FOR PROJECT CARDS =====
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.15 },
);
document
  .querySelectorAll(".project-card")
  .forEach((card) => observer.observe(card));

// ===== CONTACT FORM =====
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Message sent! I'll get back to you soon.");
  this.reset();
});
