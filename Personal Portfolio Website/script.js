// ===============================
// SMOOTH SCROLLING FOR NAV LINKS
// ===============================

document.querySelectorAll(".nav-links li").forEach((link) => {
  link.addEventListener("click", function () {
    let section = this.textContent.toLowerCase();

    let target = document.querySelector("." + section);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// ===============================
// HERO BUTTON - VIEW PROJECTS
// ===============================

let projectButton = document.querySelector(".hero-buttons button");

if (projectButton) {
  projectButton.addEventListener("click", function () {
    let projects = document.querySelector(".projects");

    projects.scrollIntoView({
      behavior: "smooth",
    });
  });
}

// ===============================
// CONTACT FORM MESSAGE
// ===============================

let form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    alert("Message sent successfully!");

    form.reset();
  });
}

// ===============================
// SIMPLE SCROLL ANIMATION
// ===============================

window.addEventListener("scroll", function () {
  let cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    let position = card.getBoundingClientRect().top;
    let screenHeight = window.innerHeight;

    if (position < screenHeight - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

// CONTACT ME BUTTON SCROLL

let contactBtn = document.querySelector(".hero-buttons button:last-child");

if (contactBtn) {
  contactBtn.addEventListener("click", function () {
    let contactSection = document.querySelector(".contact");

    contactSection.scrollIntoView({
      behavior: "smooth",
    });
  });
}

const words = [
  "Software Developer",
  "AI Enthusiast",
  "Machine Learning Learner",
  "Web Developer",
];

let wordIndex = 0;
let charIndex = 0;

const typingElement = document.getElementById("typing");

function typeEffect() {
  if (charIndex < words[wordIndex].length) {
    typingElement.textContent += words[wordIndex].charAt(charIndex);

    charIndex++;

    setTimeout(typeEffect, 100);
  } else {
    setTimeout(deleteEffect, 1500);
  }
}

function deleteEffect() {
  if (charIndex > 0) {
    typingElement.textContent = words[wordIndex].substring(0, charIndex - 1);

    charIndex--;

    setTimeout(deleteEffect, 50);
  } else {
    wordIndex++;

    if (wordIndex >= words.length) {
      wordIndex = 0;
    }

    setTimeout(typeEffect, 300);
  }
}

typeEffect();
