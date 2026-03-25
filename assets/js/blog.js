/* ================================================================
   Sole_f1t Blog — blog.js
   Blog filtering functionality
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-tag');
  const blogCards = document.querySelectorAll('.blog-card');
  const emptyState = document.querySelector('.empty-state');
  const blogGrid = document.querySelector('.blog-grid');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter blog cards
      let visibleCount = 0;
      
      blogCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          visibleCount++;
          // Animate in
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
      
      // Show/hide empty state
      if (visibleCount === 0) {
        blogGrid.style.display = 'none';
        emptyState.style.display = 'block';
      } else {
        blogGrid.style.display = 'grid';
        emptyState.style.display = 'none';
      }
    });
  });
  
  // Initialize card animations
  blogCards.forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
});
