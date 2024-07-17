document.addEventListener('DOMContentLoaded', () => {
  // AOS
  AOS.init({
    duration: 1000,
    once: true
  });

  // Burger menu
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.overlay');

  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');

    if (burgerMenu.classList.contains('active')) {
      burgerMenu.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      burgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });

      if (navLinks.classList.contains('active')) {
        burgerMenu.click();
      }
    });
  });

  // Accordion - FAQ section
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click',
      () => {
        const currentlyActiveItem = document.querySelector('.accordion-item.active');
        if (currentlyActiveItem && currentlyActiveItem !== item) {
          currentlyActiveItem.classList.remove('active');
          currentlyActiveItem.querySelector('.accordion-content').style.maxHeight = null;
        }

        item.classList.toggle('active');
        const content = item.querySelector('.accordion-content');

        if (item.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = null;
        }
      });
  });

  // Form submission
  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    console.log('Form submitted with data:',
      Object.fromEntries(formData));
    alert('Thank you for your message. We will get back to you soon!');
    contactForm.reset();
  });

  // Testimonial slider
  const testimonialSlider = document.querySelector('.testimonial-slider');
  let isDown = false;
  let startX;
  let scrollLeft;

  testimonialSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - testimonialSlider.offsetLeft;
    scrollLeft = testimonialSlider.scrollLeft;
  });

  testimonialSlider.addEventListener('mouseleave', () => {
    isDown = false;
  });

  testimonialSlider.addEventListener('mouseup', () => {
    isDown = false;
  });

  testimonialSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialSlider.offsetLeft;
    const walk = (x - startX) * 3;
    testimonialSlider.scrollLeft = scrollLeft - walk;
  });
});