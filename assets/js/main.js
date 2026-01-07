// ------------------------
// Page fade in/out
// ------------------------
function markReady() {
  document.body.classList.add('is-ready');
}

window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(markReady);

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;

    const href = a.getAttribute('href') || '';
    const isExternal =
      a.target === '_blank' ||
      a.hasAttribute('download') ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#');

    if (isExternal) return;

    if (!href.endsWith('.html')) return;

    e.preventDefault();
    document.body.classList.add('is-leaving');

    setTimeout(() => {
      window.location.href = href;
    }, 220);
  }, true);
});

window.addEventListener('pageshow', () => {
  document.body.classList.remove('is-leaving');
  document.body.classList.add('is-ready');
});

// ------------------------
// Mobile menu
// ------------------------
const burger = document.querySelector('[data-burger]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

// Footer year
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ------------------------
// Active menu highlight (current page)
// Requires <body data-page="home|about|services|portfolio|blog|contact">
// ------------------------
const currentPage = document.body.getAttribute('data-page');
if (currentPage) {
  document.querySelectorAll('a[data-nav]').forEach(link => {
    if (link.getAttribute('data-nav') === currentPage) {
      link.style.background = 'rgba(255,255,255,.08)';
      link.style.color = 'rgba(233,238,247,1)';
      link.style.border = '1px solid rgba(255,255,255,.14)';
    }
  });
}

// ------------------------
// Scroll reveal
// ------------------------
const revealTargets = document.querySelectorAll('[data-animate], [data-stagger]');
if ('IntersectionObserver' in window && revealTargets.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  revealTargets.forEach(el => io.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('in'));
}

// ------------------------
// Parallax (hero background)
// ------------------------
const parallaxSections = document.querySelectorAll('[data-parallax]');
let lastY = 0;
let ticking = false;

function applyParallax(scrollY){
  const amount = Math.min(scrollY, 900) * 0.12;
  parallaxSections.forEach(sec => {
    sec.style.setProperty('--parallaxY', `${amount}px`);
  });
}

window.addEventListener('scroll', () => {
  lastY = window.scrollY || 0;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      applyParallax(lastY);
      ticking = false;
    });
    ticking = true;
  }
});

// Inject transform that uses CSS variable
const styleTag = document.createElement('style');
styleTag.textContent = `
  [data-parallax].hero::before{
    transform: translate3d(0, calc(var(--parallaxY, 0px) * -1), 0) scale(1.06);
  }
`;
document.head.appendChild(styleTag);

applyParallax(window.scrollY || 0);

// ------------------------
// Particles (lightweight canvas)
// ------------------------
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d', { alpha: true });
  let w, h, dpr;
  let particles = [];
  const MAX = 90;
  const SPEED = 0.35;
  const WIND = 0.18;

  function resize(){
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rand(min, max){ return Math.random() * (max - min) + min; }

  function makeParticle(){
    return {
      x: rand(0, w),
      y: rand(-h, h),
      r: rand(0.6, 2.2),
      vy: rand(SPEED * 0.6, SPEED * 1.6),
      vx: rand(-WIND, WIND),
      a: rand(0.12, 0.45)
    };
  }

  function init(){
    particles = Array.from({ length: MAX }, makeParticle);
  }

  function step(){
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    for (const p of particles) {
      p.y += p.vy;
      p.x += p.vx;

      if (p.y > h + 10) { p.y = -10; p.x = rand(0, w); }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(step);
  }

  resize();
  init();
  step();
  window.addEventListener('resize', () => { resize(); init(); });
}

// ------------------------
// Image lazy-loading for speed
// Adds loading="lazy" + decoding="async"
// ------------------------
const imgs = Array.from(document.querySelectorAll('img'));
imgs.forEach((img, i) => {
  // keep first image eager (logo usually)
  if (i === 0) return;
  if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
});
