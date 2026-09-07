// Scroll-based reveal for sections
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.feature-card, .download-card, .privacy-text, .opensource-text, .opensource-graphic').forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Inject reveal CSS dynamically so it degrades gracefully without JS
const style = document.createElement('style');
style.textContent = `
  .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .feature-card.reveal { transition-delay: calc(var(--card-index, 0) * 0.06s); }
`;
document.head.appendChild(style);

// Stagger feature cards
document.querySelectorAll('.feature-card').forEach((card, i) => {
  card.style.setProperty('--card-index', i);
});
