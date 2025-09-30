// Professional Animated Favicon
function animateFavicon() {
  const professionalIcons = [
    { letter: 'M', bg: '%23667eea' }, // Blue
    { letter: 'M', bg: '%2310b981' }, // Green
    { letter: 'M', bg: '%238b5cf6' }, // Purple
    { letter: 'M', bg: '%23f59e0b' }, // Orange
    { letter: 'M', bg: '%23ef4444' }, // Red
    { letter: 'M', bg: '%23667eea' }, // Back to blue
  ];
  let currentIndex = 0;
  
  function updateFavicon() {
    const favicon = document.getElementById('favicon');
    if (favicon) {
      const icon = professionalIcons[currentIndex];
      favicon.href = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='15' fill='${icon.bg}'/%3E%3Ctext x='50' y='70' font-family='Arial,sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3E${icon.letter}%3C/text%3E%3C/svg%3E`;
      currentIndex = (currentIndex + 1) % professionalIcons.length;
    }
  }
  
  // Update favicon every 3 seconds
  updateFavicon(); // Initial update
  setInterval(updateFavicon, 3000);
}

// Initialize animated favicon when page loads
document.addEventListener('DOMContentLoaded', animateFavicon);

// Theme toggle
document.querySelector('.theme-toggle').onclick = function() {
  document.body.classList.toggle('dark');
  this.innerHTML = document.body.classList.contains('dark')
    ? '<i class="fas fa-sun" style="color: #0369a1 !important; font-size: 1.1rem !important;"></i>' 
    : '<i class="fas fa-moon" style="color: #0369a1 !important; font-size: 1.1rem !important;"></i>';
  
  // Save theme preference
  localStorage.setItem('darkTheme', document.body.classList.contains('dark'));
};

// Set default dark theme
if (localStorage.getItem('darkTheme') === null) {
  // First time visit - set dark as default
  localStorage.setItem('darkTheme', 'true');
  document.body.classList.add('dark');
  document.querySelector('.theme-toggle').innerHTML = '<i class="fas fa-sun" style="color: #0369a1 !important; font-size: 1.1rem !important;"></i>';
} else if (localStorage.getItem('darkTheme') === 'true') {
  // User preference is dark
  document.body.classList.add('dark');
  document.querySelector('.theme-toggle').innerHTML = '<i class="fas fa-sun" style="color: #0369a1 !important; font-size: 1.1rem !important;"></i>';
} else {
  // User preference is light
  document.body.classList.remove('dark');
  document.querySelector('.theme-toggle').innerHTML = '<i class="fas fa-moon" style="color: #0369a1 !important; font-size: 1.1rem !important;"></i>';
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

// Scroll-triggered section animations
function animateSections() {
  const sections = document.querySelectorAll('.section');
  const cards = document.querySelectorAll('.skill-card, .project-card, .education-item');
  
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
    
    if (isVisible && !section.classList.contains('animate')) {
      setTimeout(() => {
        section.classList.add('animate');
      }, index * 100);
    }
  });
  
  // Animate cards with stagger effect
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    
    if (isVisible && !card.classList.contains('animate')) {
      setTimeout(() => {
        card.classList.add('animate');
      }, (index % 3) * 150);
    }
  });
}

// Enhanced scroll handler with navbar control
let lastScrollY = 0;
let scrollDirection = 'up';
const header = document.querySelector('header');

function handleScroll() {
  const scrollY = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = (scrollY / documentHeight) * 100;
  
  // Determine scroll direction
  if (scrollY > lastScrollY && scrollY > 100) {
    // Scrolling down
    scrollDirection = 'down';
    header.classList.add('nav-hidden');
    header.classList.remove('nav-visible');
  } else if (scrollY < lastScrollY || scrollY <= 100) {
    // Scrolling up or at top
    scrollDirection = 'up';
    header.classList.remove('nav-hidden');
    header.classList.add('nav-visible');
  }
  
  // Update header background on scroll
  if (scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScrollY = scrollY;
  
  // Update scroll progress bar
  document.getElementById('scrollProgress').style.width = scrollProgress + '%';
  
  // Scroll button
  if (scrollY > 300) scrollBtn.classList.add('show');
  else scrollBtn.classList.remove('show');
  
  // Animate skill bars
  animateSkillBars();
  
  // Animate sections
  animateSections();
  
  // Parallax effect for hero
  const hero = document.querySelector('.hero');
  if (hero && scrollY < window.innerHeight) {
    hero.style.transform = `translateY(${scrollY * 0.5}px)`;
  }
}

// Scroll to top button
const scrollBtn = document.getElementById('scrollTopBtn');
window.onscroll = handleScroll;
scrollBtn.onclick = () => window.scrollTo({top:0, behavior:'smooth'});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial animations
  setTimeout(animateSections, 500);
  
  // Add smooth scrolling to navigation links
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
});

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

// Initialize EmailJS
(function() {
   
    const emailConfig = {
        publicKey: "PUBLIC_KEY",    
        serviceId: "SERVICE_ID",    
        templateId: "TEMPLATE_ID"   
    };
    
    emailjs.init(emailConfig.publicKey);
    
    // Store config for use in contact form
    window.emailConfig = emailConfig;
})();

// Contact form with EmailJS
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
  
  // Get form data
  const formData = {
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    subject: document.getElementById('subject').value || 'Portfolio Contact Form',
    message: document.getElementById('message').value,
    to_email: 'mallikarjunmalli51946@gmail.com'
  };
  
  // Send email using EmailJS
  emailjs.send(window.emailConfig.serviceId, window.emailConfig.templateId, formData)
    .then(() => {
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
    })
    .catch((error) => {
      // Reset button state
      btnText.style.display = 'inline-block';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
      
      // Show error message
      msg.textContent = "Sorry, there was an error sending your message. Please try again or contact me directly.";
      msg.className = "error";
      
      console.error('EmailJS error:', error);
      
      // Clear message after 7 seconds
      setTimeout(() => {
        msg.textContent = '';
        msg.className = '';
      }, 7000);
    });
};

// Set year
document.getElementById('year').textContent = new Date().getFullYear();