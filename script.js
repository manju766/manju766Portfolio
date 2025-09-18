// Theme toggle
document.querySelector('.theme-toggle').onclick = function() {
  document.body.classList.toggle('dark');
  this.innerHTML = document.body.classList.contains('dark')
    ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
};

// Scroll to top button
const scrollBtn = document.getElementById('scrollTopBtn');
window.onscroll = function() {
  if (window.scrollY > 300) scrollBtn.classList.add('show');
  else scrollBtn.classList.remove('show');
};
scrollBtn.onclick = () => window.scrollTo({top:0, behavior:'smooth'});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = window.scrollY;
    if (top >= sec.offsetTop - 80) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// Contact form
document.getElementById('contact-form').onsubmit = function(e) {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  msg.textContent = "Sending...";
  setTimeout(() => {
    msg.textContent = "Thank you! I'll get back to you soon.";
    this.reset();
    setTimeout(()=>msg.textContent='', 3000);
  }, 1200);
};

// Set year
document.getElementById('year').textContent = new Date().getFullYear();