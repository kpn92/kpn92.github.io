// Year in footer
document.getElementById('y').textContent = new Date().getFullYear();

// Simple scroll reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(el=>{ if(el.isIntersecting){ el.target.classList.add('visible'); } });
},{threshold:.15});
document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));

// Mailto form
function sendEmail(e){
  e.preventDefault();
  const f=new FormData(e.target);
  const subject=encodeURIComponent('New inquiry from portfolio');
  const body=encodeURIComponent(`Name: ${f.get('name')}
Email: ${f.get('email')}

${f.get('message')}`);
  window.location.href=`mailto:konstantinos.panousis92@gmail.com?subject=${subject}&body=${body}`;
}
window.sendEmail = sendEmail;


// Theme toggle with localStorage + prefers-color-scheme
const root = document.documentElement;
const btn = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme');
function applyTheme(mode){
  if(mode==='dark' || mode==='light'){
    root.setAttribute('data-theme', mode);
  }else{
    root.setAttribute('data-theme', 'auto');
  }
}
if(saved){
  applyTheme(saved);
}else{
  applyTheme('auto');
}

btn.addEventListener('click', ()=>{
  const current = root.getAttribute('data-theme');
  let next;
  if(current==='dark'){ next='light'; }
  else if(current==='light'){ next='auto'; }
  else{ next='dark'; }
  localStorage.setItem('theme', next);
  applyTheme(next);
  btn.title = `Theme: ${next}`;
});

// Animate skill bars when they enter the viewport
const skillsObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el = e.target;                // .fill
    const val = Number(el.dataset.skill)||0;
    el.style.width = val + '%';         // animate to target width
    el.setAttribute('aria-valuenow', val);
    skillsObserver.unobserve(el);       // run once
  });
},{ threshold: 0.4 });

document.querySelectorAll('.skill .fill[data-skill]').forEach(el=>{
  el.style.width = '0%';                // start collapsed
  skillsObserver.observe(el);
});



document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".metric b");
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    const speed = 999; // μικρότερο = πιο γρήγορο
    const update = () => {
      const val = +counter.innerText;
      const inc = Math.max(1, Math.ceil(target / speed));
      if (val < target) {
        counter.innerText = val + inc;
        setTimeout(update, 30);
      } else {
        counter.innerText = target + "+";
      }
    };
    update();
  });
});

