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

window.sendEmail = sendEmail;

// Enhanced theme toggle
const root = document.documentElement;
const btn = document.getElementById('theme-toggle');
let currentTheme = 'auto';

function applyTheme(mode) {
  if (mode === 'dark' || mode === 'light') {
    root.setAttribute('data-theme', mode);
  } else {
    root.setAttribute('data-theme', 'auto');
  }
  currentTheme = mode;
  btn.title = `Theme: ${mode}`;
}

// Initialize theme
applyTheme('auto');

btn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  let next;
  if (current === 'dark') { 
    next = 'light'; 
  } else if (current === 'light') { 
    next = 'auto'; 
  } else { 
    next = 'dark'; 
  }
  applyTheme(next);
});

// Enhanced skill bars animation
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const val = Number(el.dataset.skill) || 0;
    
    // Animate with easing
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentWidth = start + (val - start) * easeOut;
      
      el.style.width = currentWidth + '%';
      el.setAttribute('aria-valuenow', Math.round(currentWidth));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
    skillsObserver.unobserve(el);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.skill .fill[data-skill]').forEach(el => {
  el.style.width = '0%';
  skillsObserver.observe(el);
});

// Enhanced counter animation
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".metric b");
  
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const counter = entry.target;
      const target = +counter.getAttribute("data-target");
      let current = 0;
      const increment = target / 30; // 30 steps
      const duration = 2000; // 2 seconds
      const stepTime = duration / 30;
      
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