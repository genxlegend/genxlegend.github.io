/* ═══════════════════════════════════════════════════════
   GEN_X_LEGEND  —  Portfolio Script
   ═══════════════════════════════════════════════════════ */

/* ── 1. THEME TOGGLE ─────────────────────────────────── */
const root        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const THEME_KEY   = 'gxl_theme';

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

// Load saved theme
const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
});


/* ── 2. HAMBURGER MENU ───────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close on link click
mobileMenu.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


/* ── 3. FLOATING PARTICLES ───────────────────────────── */
function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const COUNT = 50;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;              // 2–7 px
    const x    = Math.random() * 100;                // % from left
    const dur  = Math.random() * 14 + 8;             // 8–22 s
    const delay = Math.random() * -20;               // stagger start
    const drift = (Math.random() - .5) * 80;        // horizontal drift px

    p.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${x}%;
      bottom:-10px;
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      opacity:${Math.random() * .6 + .1};
      --drift:${drift}px;
    `;
    container.appendChild(p);
  }
}
spawnParticles();


/* ── 4. TYPING EFFECT ────────────────────────────────── */
const ROLES = [
  'Web Developer',
  'Web Designer',
  'Minecraft Dev',
  'Network Enthusiast',
  'Creative Builder',
];
let roleIdx  = 0;
let charIdx  = 0;
let deleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  const current = ROLES[roleIdx];

  if (!deleting && charIdx <= current.length) {
    typedEl.textContent = current.slice(0, charIdx++);
    setTimeout(typeLoop, 90);

  } else if (!deleting && charIdx > current.length) {
    deleting = true;
    setTimeout(typeLoop, 1400);

  } else if (deleting && charIdx > 0) {
    typedEl.textContent = current.slice(0, --charIdx);
    setTimeout(typeLoop, 48);

  } else {
    deleting  = false;
    roleIdx   = (roleIdx + 1) % ROLES.length;
    setTimeout(typeLoop, 350);
  }
}
setTimeout(typeLoop, 1200);


/* ── 5. SCROLL REVEAL ────────────────────────────────── */
function addReveal() {
  const targets = [
    '.about-section .section-label-wrap',
    '.depth-card',
    '.skills-section .section-label-wrap',
    '.ladder-block',
    '.console-window',
  ];
  targets.forEach((sel, ti) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      if (i > 0 || ti > 0) el.classList.add(`reveal-d${Math.min(i + 1, 3)}`);
    });
  });
}
addReveal();

const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ── 6. STATS COUNTER ────────────────────────────────── */
function animateCount(el) {
  const target = +el.dataset.target;
  const dur    = 1400;
  const step   = dur / target;
  let cur = 0;
  const timer = setInterval(() => {
    cur++;
    el.textContent = cur;
    if (cur >= target) clearInterval(timer);
  }, step);
}

const statsObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num').forEach(animateCount);
      statsObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.4 }
);
const statsRow = document.querySelector('.stats-row');
if (statsRow) statsObserver.observe(statsRow);


/* ── 7. 3-D TILT ON ABOUT CARD ───────────────────────── */
const depthCard = document.getElementById('depthCard');
if (depthCard) {
  depthCard.addEventListener('mousemove', e => {
    const rect  = depthCard.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const rx    = ((e.clientY - cy) / rect.height) * -10;
    const ry    = ((e.clientX - cx) / rect.width)  *  12;
    depthCard.style.transform =
      `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });

  depthCard.addEventListener('mouseleave', () => {
    depthCard.style.transform =
      'perspective(900px) rotateX(0) rotateY(0)';
  });
}


/* ── 8. SKILL LADDER ACCORDION ───────────────────────── */
const openPanels = new Set();

function toggleSkill(idx) {
  const block   = document.querySelector(`.ladder-block[data-idx="${idx}"]`);
  const panel   = document.getElementById(`panel-${idx}`);
  const trigger = block.querySelector('.ladder-trigger');

  const isOpen = openPanels.has(idx);

  if (isOpen) {
    // Close
    openPanels.delete(idx);
    block.classList.remove('open');
    panel.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    // Reset bars
    panel.querySelectorAll('.fill').forEach(f => f.style.width = '0');
  } else {
    // Open
    openPanels.add(idx);
    block.classList.add('open');
    panel.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    // Animate bars after layout settles
    setTimeout(() => animateBars(panel), 80);
  }
}

function animateBars(panel) {
  panel.querySelectorAll('.fill').forEach((bar, i) => {
    const pct = bar.dataset.w;
    setTimeout(() => {
      bar.style.width = pct + '%';
    }, i * 90);
  });
}


/* ── 9. CONSOLE ANIMATION ────────────────────────────── */
const CONSOLE_SCRIPT = [
  { type: 'cmd',     text: 'whoami',                        delay: 0   },
  { type: 'resp',    text: 'Gen_X_Legend — Developer & Digital Creator', delay: 600  },
  { type: 'cmd',     text: 'ls ./skills',                   delay: 1400 },
  { type: 'success', text: 'web-dev/  web-design/  minecraft/  networking/',  delay: 2000 },
  { type: 'cmd',     text: 'cat motto.txt',                 delay: 2900 },
  { type: 'resp',    text: '"Build things that matter. Design things that last."', delay: 3500 },
  { type: 'cmd',     text: 'echo $STATUS',                  delay: 4600 },
  { type: 'success', text: 'Available for cool projects 🚀',delay: 5200 },
];

let consoleStarted = false;

function runConsole() {
  if (consoleStarted) return;
  consoleStarted = true;

  const body = document.getElementById('consoleBody');
  if (!body) return;
  body.innerHTML = '';

  // Persistent blinking cursor line
  const cursorLine = document.createElement('div');
  cursorLine.className = 'c-line';
  cursorLine.innerHTML = '<span class="c-prompt">$</span><span class="c-cursor">█</span>';
  body.appendChild(cursorLine);

  CONSOLE_SCRIPT.forEach(({ type, text, delay }) => {
    setTimeout(() => {
      // Insert before cursor
      const line = document.createElement('div');
      line.className = 'c-line';

      if (type === 'cmd') {
        line.innerHTML = `<span class="c-prompt">$</span> <span class="c-cmd"></span>`;
        body.insertBefore(line, cursorLine);
        typeInto(line.querySelector('.c-cmd'), text, 55);
      } else {
        line.classList.add(type === 'success' ? 'c-success' : 'c-resp');
        body.insertBefore(line, cursorLine);
        typeInto(line, text, 28);
      }

      // Auto-scroll
      body.scrollTop = body.scrollHeight;
    }, delay);
  });
}

function typeInto(el, text, speed) {
  let i = 0;
  function tick() {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(tick, speed);
  }
  tick();
}

// Trigger console when visible
const consoleObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      runConsole();
      consoleObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.3 }
);
const consoleEl = document.getElementById('consoleWindow');
if (consoleEl) consoleObserver.observe(consoleEl);


/* ── 10. ACTIVE NAV HIGHLIGHT ────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);
sections.forEach(s => sectionObserver.observe(s));

// Add active style
const style = document.createElement('style');
style.textContent = `
  .nav-link.active { color: var(--primary) !important; }
  .nav-link.active::after { width: 100% !important; }
`;
document.head.appendChild(style);
