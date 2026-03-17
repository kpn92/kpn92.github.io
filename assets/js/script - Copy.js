// Theme toggle: default to dark, toggle to light
document.addEventListener('DOMContentLoaded', function() {
  const themeSwitch = document.getElementById('themeSwitch');
  // Restore theme from localStorage or default to dark
  let theme = localStorage.getItem('theme');
  if (!theme) theme = 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  if (themeSwitch) {
    themeSwitch.checked = (theme === 'dark');
    themeSwitch.addEventListener('change', function() {
      const isDark = themeSwitch.checked;
      const newTheme = isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
});
// Year in footer
document.getElementById('y').textContent = new Date().getFullYear();

// Enhanced scroll reveal with stagger
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100); // stagger animation
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// Enhanced form handling with success feedback
function sendEmail(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const successMsg = document.getElementById('success-message');
  
  // Show loading state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  submitBtn.classList.add('loading');
  
  const f = new FormData(form);
  const subject = encodeURIComponent('New inquiry from portfolio');
  const body = encodeURIComponent(`Name: ${f.get('name')}
Email: ${f.get('email')}

${f.get('message')}`);
  
  // Simulate processing delay
  setTimeout(() => {
    window.location.href = `mailto:konstantinos.panousis92@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset form and show success
    form.reset();
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    
    successMsg.classList.add('show');
    setTimeout(() => {
      successMsg.classList.remove('show');
    }, 5000);
  }, 1000);
}

// Rotating professions
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

let currentIndex = 0;
const professionElement = document.getElementById('profession');

setInterval(() => {
  professionElement.style.transform = 'translateY(-20px)';
  professionElement.style.opacity = '0';
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % professions.length;
    professionElement.textContent = professions[currentIndex];
    professionElement.style.transform = 'translateY(0)';
    professionElement.style.opacity = '1';
  }, 400); // Slide up and fade out for 0.4s, then change and slide back
}, 3000);

window.sendEmail = sendEmail;


// Enhanced theme toggle
const root = document.documentElement;
const themeSwitch = document.getElementById("themeSwitch");

if (themeSwitch) {

  themeSwitch.addEventListener("change", () => {

    if (themeSwitch.checked) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
    }

    updateFooterBanner();
  });

}
// Enhanced counter animation
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".metric b");
  
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const counter = entry.target;
      const target = +counter.getAttribute("data-target");
      let current = 0;
      const increment = target / 20;
      const duration = 700;
      const stepTime = duration / 20;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + "+";
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
      
      counterObserver.unobserve(counter);
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    counter.textContent = "0";
    counterObserver.observe(counter);
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add loading states and micro-interactions
document.addEventListener('DOMContentLoaded', () => {
  // Add hover effects to cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.3s ease';
    });
  });
  
  // Add focus states for accessibility
  document.querySelectorAll('input, textarea, button').forEach(element => {
    element.addEventListener('focus', () => {
      element.style.transform = 'scale(1.02)';
    });
    
    element.addEventListener('blur', () => {
      element.style.transform = 'scale(1)';
    });
  });
});

// === Footer banner toggle ===
const blueBanner = document.querySelector('.banner-blue');
const whiteBanner = document.querySelector('.banner-white');

function updateFooterBanner() {
  const theme = root.getAttribute('data-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme === 'dark' || (theme === 'auto' && prefersDark);

  if (blueBanner && whiteBanner) {
    blueBanner.style.display = isDark ? 'inline' : 'none';
    whiteBanner.style.display = isDark ? 'none' : 'inline';
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFooterBanner);
document.addEventListener('DOMContentLoaded', updateFooterBanner);


const cards = document.querySelectorAll(".expertise-area");

let index = 0;
const visible = 2;

function showCards(){

  cards.forEach(card => card.style.display = "none");

  for(let i=index; i < index + visible; i++){
      if(cards[i]) cards[i].style.display = "block";
  }
}

function nextExpertise(){

  index += visible;

  if(index >= cards.length){
      index = 0;
  }

  showCards();
}

function prevExpertise(){

  index -= visible;

  if(index < 0){
      index = cards.length - visible;
  }

  showCards();
}

showCards();

/*
const toggleBtn = document.getElementById("accessibility-toggle");
const panel = document.getElementById("accessibility-panel");

toggleBtn.addEventListener("click",()=>{
panel.style.display = panel.style.display === "flex" ? "none" : "flex";
});

function increaseFont(){
document.body.style.fontSize =
(parseFloat(getComputedStyle(document.body).fontSize) + 1) + "px";
}

function decreaseFont(){
document.body.style.fontSize =
(parseFloat(getComputedStyle(document.body).fontSize) - 1) + "px";
}

function toggleContrast(){
document.body.classList.toggle("high-contrast");
}

function toggleGray(){
document.body.classList.toggle("grayscale");
}

function toggleLinks(){
document.body.classList.toggle("underline-links");
}

function toggleAnimations(){
document.body.classList.toggle("pause-animations");
}
*/


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
      onhover: { enable: true, mode: "grab" }
    }
  },
  retina_detect: true
});


window.addEventListener("scroll", function(){

  const nav = document.querySelector(".blur-nav");

  if(window.scrollY > 80){
    nav.classList.add("scrolled");
  } else{
    nav.classList.remove("scrolled");
  }

});

document.addEventListener("DOMContentLoaded", function () {

  const nav = document.querySelector(".blur-nav");

  function updateNavbar(){
    if (window.scrollY > 80){
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateNavbar);

  /* check also when page loads */
  updateNavbar();

});