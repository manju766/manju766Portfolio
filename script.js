// Theme toggle
document.querySelector('.theme-toggle').onclick = function() {
  document.body.classList.toggle('dark');
  this.innerHTML = document.body.classList.contains('dark')
    ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  
  // Save theme preference
  localStorage.setItem('darkTheme', document.body.classList.contains('dark'));
};

// Load saved theme
if (localStorage.getItem('darkTheme') === 'true') {
  document.body.classList.add('dark');
  document.querySelector('.theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
}

// Animate skill bars on scroll
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const skillValue = bar.getAttribute('data-skill');
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      bar.style.width = skillValue + '%';
    }
  });
}

// Scroll to top button
const scrollBtn = document.getElementById('scrollTopBtn');
window.onscroll = function() {
  if (window.scrollY > 300) scrollBtn.classList.add('show');
  else scrollBtn.classList.remove('show');
  
  // Animate skill bars
  animateSkillBars();
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
  const submitBtn = this.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  // Show loading state
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline-block';
  submitBtn.disabled = true;
  msg.textContent = "";
  msg.className = "";
  
  // Simulate form submission
  setTimeout(() => {
    // Reset button state
    btnText.style.display = 'inline-block';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
    
    // Show success message
    msg.textContent = "Thank you! Your message has been sent successfully. I'll get back to you soon.";
    msg.className = "success";
    this.reset();
    
    // Clear message after 5 seconds
    setTimeout(() => {
      msg.textContent = '';
      msg.className = '';
    }, 5000);
  }, 2000);
};

// Set year
document.getElementById('year').textContent = new Date().getFullYear();