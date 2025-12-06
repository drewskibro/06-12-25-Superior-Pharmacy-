document.addEventListener('DOMContentLoaded', function() {
  const productCards = document.querySelectorAll('.reorder-product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  const benefitCards = document.querySelectorAll('.reorder-benefit-card');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, observerOptions);
  
  benefitCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });
  
  const testimonialCards = document.querySelectorAll('.reorder-testimonial-card');
  testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });
  
  const productButtons = document.querySelectorAll('.reorder-product-btn');
  productButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const productCard = this.closest('.reorder-product-card');
      const productName = productCard.dataset.product;
      
      console.log('Reordering:', productName);
      
      this.innerHTML = '<span style="display: inline-flex; align-items: center; gap: 0.5rem;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Processing...</span>';
      
      setTimeout(() => {
        this.innerHTML = 'Reorder ' + (productName === 'wegovy' ? 'Wegovy' : 'Mounjaro') + ' <img src="https://c.animaapp.com/mid2gmlt3yvxc2/img/arrowright.svg" alt="" aria-hidden="true" />';
      }, 1500);
    });
  });
});
