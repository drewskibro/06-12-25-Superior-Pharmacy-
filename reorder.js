document.addEventListener('DOMContentLoaded', function() {
  // Product card hover effects
  const productCards = document.querySelectorAll('.reorder-product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.borderColor = 'rgba(0, 150, 137, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.borderColor = '';
    });
  });
  
  // Smooth scroll for support link
  const supportLink = document.querySelector('.reorder-support-link');
  if (supportLink && supportLink.getAttribute('href').startsWith('#')) {
    supportLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
  
  // Track reorder button clicks
  const reorderButtons = document.querySelectorAll('.reorder-product-btn');
  reorderButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.reorder-product-card');
      const productType = productCard.dataset.product;
      console.log(`Reorder initiated for: ${productType}`);
      // In production, this would track analytics
    });
  });
});
