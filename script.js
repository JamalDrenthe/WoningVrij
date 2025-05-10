document.addEventListener('DOMContentLoaded', function() {
  // Parallax effect for hero background
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero && window.innerWidth > 768) {
      hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
  });
  
  // Parallax effect for sections with .parallax-section class
  const parallaxSections = document.querySelectorAll('.parallax-section');
  parallaxSections.forEach(section => {
    const bg = section.querySelector('.parallax-bg');
    if (bg) {
      window.addEventListener('scroll', () => {
        const rect = section.getBoundingClientRect();
        const scrollPosition = window.pageYOffset;
        const offset = (scrollPosition - (rect.top + scrollPosition - window.innerHeight)) * 0.4;
        
        if (window.innerWidth > 768) {
          bg.style.transform = `translateY(${offset}px)`;
        }
      });
    }
  });
  
  // Fade-in animations on scroll
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => observer.observe(el));

  // FAQ Accordion functionality
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

  // Mobile Navigation Toggle
  const navCheckbox = document.getElementById('nav__checkbox');
  const navMenuLinks = document.querySelectorAll('.nav__menu a');
  
  // Close mobile navigation when a link is clicked
  navMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      navCheckbox.checked = false;
    });
  });

  // Smooth scroll to anchor links
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

  // Add sticky class to header on scroll
  const header = document.querySelector('header');
  const addStickyClass = () => {
    if (window.scrollY > 0) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  };

  // Initialize header state
  addStickyClass();
  
  // Add event listener for scroll
  window.addEventListener('scroll', addStickyClass);
  
  // Enhance horizontal scroll section
  const horizontalScrollSection = document.querySelector('.horizontal-scroll-section');
  if (horizontalScrollSection) {
    // Add touch swiping functionality
    let isDown = false;
    let startX;
    let scrollLeft;
    
    horizontalScrollSection.addEventListener('mousedown', (e) => {
      isDown = true;
      horizontalScrollSection.style.cursor = 'grabbing';
      startX = e.pageX - horizontalScrollSection.offsetLeft;
      scrollLeft = horizontalScrollSection.scrollLeft;
    });
    
    horizontalScrollSection.addEventListener('mouseleave', () => {
      isDown = false;
      horizontalScrollSection.style.cursor = 'grab';
    });
    
    horizontalScrollSection.addEventListener('mouseup', () => {
      isDown = false;
      horizontalScrollSection.style.cursor = 'grab';
    });
    
    horizontalScrollSection.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - horizontalScrollSection.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      horizontalScrollSection.scrollLeft = scrollLeft - walk;
    });
    
    // Set initial cursor style
    horizontalScrollSection.style.cursor = 'grab';
    
    // Add scroll indicator click functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        // Scroll to the next card that's not fully visible
        const cards = horizontalScrollSection.querySelectorAll('.scroll-card');
        const containerRect = horizontalScrollSection.getBoundingClientRect();
        
        for (let card of cards) {
          const cardRect = card.getBoundingClientRect();
          if (cardRect.right > containerRect.right) {
            horizontalScrollSection.scrollTo({
              left: horizontalScrollSection.scrollLeft + (cardRect.right - containerRect.right) + 20,
              behavior: 'smooth'
            });
            break;
          }
        }
      });
    }
  }
});