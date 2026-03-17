// ===============================
// THEME TOGGLE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const root = document.documentElement;
  const themeSwitch = document.getElementById("themeSwitch");

  let theme = localStorage.getItem("theme") || "dark";
  root.setAttribute("data-theme", theme);

  if (themeSwitch) {
    themeSwitch.checked = (theme === "dark");

    themeSwitch.addEventListener("change", () => {

      const newTheme = themeSwitch.checked ? "dark" : "light";

      root.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      updateFooterBanner();
    });
  }

  updateFooterBanner();

});


// ===============================
// FOOTER YEAR
// ===============================

const year = document.getElementById("y");
if (year) {
  year.textContent = new Date().getFullYear();
}


// ===============================
// SCROLL REVEAL
// ===============================

const io = new IntersectionObserver((entries) => {

  entries.forEach((entry, index) => {

    if (entry.isIntersecting) {

      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 100);

    }

  });

}, { threshold: 0.15 });

document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));


// ===============================
// CONTACT FORM
// ===============================

function sendEmail(e) {

  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const successMsg = document.getElementById("success-message");

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  const f = new FormData(form);

  const subject = encodeURIComponent("New inquiry from portfolio");

  const body = encodeURIComponent(
`Name: ${f.get("name")}
Email: ${f.get("email")}

${f.get("message")}`
  );

  setTimeout(() => {

    window.location.href =
`mailto:konstantinos.panousis92@gmail.com?subject=${subject}&body=${body}`;

    form.reset();

    submitBtn.textContent = "Send Message";
    submitBtn.disabled = false;

    if (successMsg) {

      successMsg.classList.add("show");

      setTimeout(() => {
        successMsg.classList.remove("show");
      }, 5000);

    }

  }, 1000);

}

window.sendEmail = sendEmail;


// ===============================
// ROTATING PROFESSION
// ===============================

const professions = [
  "Data Solutions Engineer",
  "Database Engineer",
  "Data Migration Engineer",
  "Data Integration Engineer",
  "SQL Developer",
  "Data Analyst",
  "GIS & Spatial Data Specialist",
  "Supply Chain Systems Analyst",
  "Enterprise Systems Consultant"
];

const professionElement = document.getElementById("profession");

if (professionElement) {

  let currentIndex = 0;

  setInterval(() => {

    professionElement.style.transform = "translateY(-20px)";
    professionElement.style.opacity = "0";

    setTimeout(() => {

      currentIndex = (currentIndex + 1) % professions.length;

      professionElement.textContent = professions[currentIndex];

      professionElement.style.transform = "translateY(0)";
      professionElement.style.opacity = "1";

    }, 400);

  }, 3000);

}


// ===============================
// COUNTER ANIMATION
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const counters = document.querySelectorAll(".metric b");

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const counter = entry.target;

      const target = +counter.dataset.target;

      let current = 0;

      const increment = target / 20;

      const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

          counter.textContent = target + "+";
          clearInterval(timer);

        } else {

          counter.textContent = Math.floor(current);

        }

      }, 35);

      observer.unobserve(counter);

    });

  }, { threshold: 0.5 });

  counters.forEach(counter => {

    counter.textContent = "0";
    observer.observe(counter);

  });

});


// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(e) {

    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});


// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const nav = document.querySelector(".blur-nav");

  function updateNavbar() {

    if (window.scrollY > 80) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", updateNavbar);

  updateNavbar();

});


// ===============================
// FOOTER BANNER SWITCH
// ===============================

const root = document.documentElement;
const blueBanner = document.querySelector(".banner-blue");
const whiteBanner = document.querySelector(".banner-white");

function updateFooterBanner() {

  const theme = root.getAttribute("data-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const isDark = theme === "dark" || (theme === "auto" && prefersDark);

  if (blueBanner && whiteBanner) {

    blueBanner.style.display = isDark ? "inline" : "none";
    whiteBanner.style.display = isDark ? "none" : "inline";

  }

}

window.matchMedia("(prefers-color-scheme: dark)")
.addEventListener("change", updateFooterBanner);


// ===============================
// PARTICLES BACKGROUND
// ===============================

particlesJS("particles-js", {

  particles: {

    number: { value: 70 },

    color: { value: "#3b82f6" },

    shape: { type: "circle" },

    opacity: { value: 0.4 },

    size: { value: 3 },

    line_linked: {

      enable: true,
      distance: 150,
      color: "#3b82f6",
      opacity: 0.3,
      width: 1

    },

    move: {

      enable: true,
      speed: 1.5

    }

  },

  interactivity: {

    events: {

      onhover: {
        enable: true,
        mode: "grab"
      }

    }

  },

  retina_detect: true

});