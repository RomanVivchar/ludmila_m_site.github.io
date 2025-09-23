document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for header nav
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        const el = document.querySelector(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // FAQ accordion
  document.querySelectorAll('[data-accordion] .accordion__item').forEach(item => {
    const trigger = item.querySelector('.accordion__trigger');
    const content = item.querySelector('.accordion__content');
    if (!trigger || !content) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('[data-accordion] .accordion__item.is-open').forEach(openItem => {
        if (openItem !== item) openItem.classList.remove('is-open');
      });
      item.classList.toggle('is-open', !isOpen);
      // Adjust height for transition
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
  });

  // Year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});


