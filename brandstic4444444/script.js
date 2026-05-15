/* ══════════════════════════════════════
   BRANDSTIC PORTFOLIO — script.js
   Link in HTML: <script src="script.js"></script>
══════════════════════════════════════ */

/* ─────────────────────────────────────
   1. YOUTUBE LAZY LOADER
   Clicking a video thumbnail injects
   the YouTube iframe only on demand,
   so the page loads fast.
───────────────────────────────────── */
function loadYT(wrapId, videoId) {

  // Safety check — remind user to add real ID
  if (!videoId || videoId.startsWith('YOUR_VIDEO_ID')) {
    alert(
      'Please replace YOUR_VIDEO_ID with your real YouTube video ID in index.html first!\n\n' +
      'How to find it:\n' +
      '1. Go to your YouTube video\n' +
      '2. Copy the link — e.g. youtube.com/watch?v=dQw4w9WgXcQ\n' +
      '3. The ID is the part after ?v=  (11 characters)\n' +
      '4. Paste it in the code replacing YOUR_VIDEO_ID'
    );
    return;
  }

  // Get wrapper and iframe elements
  var wrap   = document.getElementById(wrapId);
  var iframe = document.getElementById(wrapId + '-frame');

  // Set YouTube embed URL with autoplay
  iframe.src =
    'https://www.youtube.com/embed/' + videoId +
    '?autoplay=1&rel=0&modestbranding=1';

  // Show the iframe, hide the thumbnail
  wrap.classList.add('playing');
}


/* ─────────────────────────────────────
   2. SCROLL REVEAL ANIMATION
   Every element with class "reveal"
   fades in from below when it enters
   the viewport while scrolling.
───────────────────────────────────── */
function initScrollReveal() {
  var revealElements = document.querySelectorAll('.reveal');

  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach(function(el) {
    observer.observe(el);
  });
}


/* ─────────────────────────────────────
   3. SMOOTH NAVBAR — shrink on scroll
   Adds a "scrolled" class to nav
   when user scrolls down the page.
───────────────────────────────────── */
function initNavbar() {
  var nav = document.querySelector('nav');

  window.addEventListener('scroll', function() {
    // Only apply desktop padding changes — let CSS handle mobile
    if (window.innerWidth > 768) {
      if (window.scrollY > 60) {
        nav.style.padding = '0.7rem 6%';
      } else {
        nav.style.padding = '1.1rem 6%';
      }
    }
  });
}


/* ─────────────────────────────────────
   4. ACTIVE NAV LINK ON SCROLL
   Highlights the correct nav link
   based on which section is visible.
───────────────────────────────────── */
function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function(section) {
      var top    = section.offsetTop;
      var height = section.offsetHeight;
      var id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function(link) {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--cyan)';
          }
        });
      }
    });
  });
}


/* ─────────────────────────────────────
   5. HERO STATS COUNTER ANIMATION
   Numbers count up from 0 when the
   hero section loads.
───────────────────────────────────── */
function animateCounter(el, target, suffix, duration) {
  var start     = 0;
  var startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = Math.min((timestamp - startTime) / duration, 1);
    var current  = Math.floor(progress * target);
    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(step);
}

function initCounters() {
  var statNums = document.querySelectorAll('.stat-num');

  // Map of text content → { target, suffix }
  var counterData = [
    { contains: '100', target: 100, suffix: '+' },
    { contains: '10', target: 10,  suffix: '+' },
    { contains: '3',  target: 3,   suffix: '+'  },
    { contains: '100',target: 100, suffix: '%' }
  ];

  var triggered = false;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        statNums.forEach(function(el, i) {
          if (counterData[i]) {
            animateCounter(el, counterData[i].target, counterData[i].suffix, 1600);
          }
        });
      }
    });
  }, { threshold: 0.5 });

  var heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}


/* ─────────────────────────────────────
   6. MOBILE NAV TOGGLE (hamburger)
   Shows/hides nav links on mobile
   when user taps the menu icon.
───────────────────────────────────── */
function initMobileNav() {
  var toggle = document.getElementById('nav-toggle');
  var links  = document.querySelector('.nav-links');

  if (!toggle || !links) return;

  // Toggle open/close using CSS class
  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    var isOpen = links.classList.toggle('open');
    toggle.textContent = isOpen ? '✕' : '☰';
    toggle.style.borderColor = isOpen ? 'rgba(0,212,255,0.7)' : 'rgba(0,212,255,0.4)';
  });

  // Close menu when a nav link is clicked
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      links.classList.remove('open');
      toggle.textContent = '☰';
      toggle.style.borderColor = 'rgba(0,212,255,0.4)';
    });
  });

  // Close menu when clicking anywhere outside
  document.addEventListener('click', function(e) {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.textContent = '☰';
      toggle.style.borderColor = 'rgba(0,212,255,0.4)';
    }
  });
}


/* ─────────────────────────────────────
   7. WHATSAPP BUTTON — PULSE EFFECT
   Adds a gentle pulse to the
   WhatsApp CTA button.
───────────────────────────────────── */
function initWhatsappPulse() {
  var waBtn = document.querySelector('a[href*="wa.me"]');
  if (!waBtn) return;

  setInterval(function() {
    waBtn.style.boxShadow = '0 0 0 0 rgba(0,212,255,0.5)';
    waBtn.animate([
      { boxShadow: '0 0 0 0 rgba(0,212,255,0.5)' },
      { boxShadow: '0 0 0 14px rgba(0,212,255,0)' }
    ], { duration: 1200, easing: 'ease-out' });
  }, 3000);
}


/* ─────────────────────────────────────
   8. CURRENT YEAR IN FOOTER
   Auto-updates the copyright year.
───────────────────────────────────── */
function initFooterYear() {
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}


/* ─────────────────────────────────────
   INIT — Run everything when page loads
───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  initScrollReveal();
  initNavbar();
  initActiveNav();
  initCounters();
  initMobileNav();
  initWhatsappPulse();
  initFooterYear();
});
