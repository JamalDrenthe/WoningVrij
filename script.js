// Parallax header effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".parallax");
  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Fade-in animations on scroll
const fadeEls = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      // Toggle active class on the trigger
      this.classList.toggle('active');
      
      // Get the accordion content panel
      const content = this.nextElementSibling;
      
      // Toggle active class on the content panel
      content.classList.toggle('active');
      
      // Close other accordion items
      accordionTriggers.forEach(otherTrigger => {
        if (otherTrigger !== trigger) {
          otherTrigger.classList.remove('active');
          otherTrigger.nextElementSibling.classList.remove('active');
        }
      });
    });
  });
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navCheckbox = document.getElementById('nav__checkbox');
  const navMenuLinks = document.querySelectorAll('.nav__menu a');
  
  // Close mobile navigation when a link is clicked
  navMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      navCheckbox.checked = false;
    });
  });
});

// Smooth scroll to anchor links
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Add sticky class to header on scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 0) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});
