document.addEventListener('DOMContentLoaded', function() {
  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.switching-faq-item');
  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    
    summary.addEventListener('click', function(e) {
      // Close other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.open) {
          otherItem.open = false;
        }
      });
    });
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
