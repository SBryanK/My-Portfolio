/* Portfolio behaviour — one rAF-batched scroll listener, no fake anything. */

// Set to a Formspree / Web3Forms endpoint to receive messages in your inbox.
// Left empty, the form opens the visitor's mail app with the message ready.
const FORM_ENDPOINT = '';
const EMAIL = 'santasila.bryan@gmail.com';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ── mobile nav ── */
const burger = $('#burger');
const menu   = $('#navmenu');

burger?.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!open));
  burger.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  menu.classList.toggle('is-open', !open);
});

const closeNav = () => {
  burger?.setAttribute('aria-expanded', 'false');
  burger?.setAttribute('aria-label', 'Open menu');
  menu?.classList.remove('is-open');
};

$$('#navmenu a').forEach(a => a.addEventListener('click', closeNav));
document.addEventListener('keydown', e => e.key === 'Escape' && closeNav());

/* ── scroll: progress bar, sticky nav, section spy, timeline spine ── */
const nav      = $('#nav');
const bar      = $('#progress i');
const spine    = $('#spine');
const tl       = $('#tl');
const links    = $$('#navmenu a');
const sections = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
let ticking = false;

const onScroll = () => {
  const y = window.scrollY;
  const vh = window.innerHeight;

  nav?.classList.toggle('is-stuck', y > 10);

  if (bar) {
    const max = document.documentElement.scrollHeight - vh;
    bar.style.width = `${max > 0 ? clamp((y / max) * 100, 0, 100) : 0}%`;
  }

  // the timeline spine fills as you read down the section
  if (spine && tl) {
    const r = tl.getBoundingClientRect();
    const p = (vh * 0.72 - r.top) / r.height;
    spine.style.height = `${clamp(p, 0, 1) * 100}%`;
  }

  const line = y + vh * 0.3;
  let active = '';
  for (const s of sections) if (s.offsetTop <= line) active = s.id;
  links.forEach(a => a.classList.toggle('is-on', a.hash === `#${active}`));

  ticking = false;
};

const queueScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(onScroll);
};

window.addEventListener('scroll', queueScroll, { passive: true });
window.addEventListener('resize', queueScroll, { passive: true });
onScroll();

/* ── reveal on enter ── */
const io = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    io.unobserve(e.target);
  }),
  { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
);

$$('.head, .tl__item, .car, .edu li, .ccard, .chips, .awards, .toolbox, .contact__info, .form, .medal')
  .forEach(el => {
    const own = ['car', 'tl__item', 'medal'].some(c => el.classList.contains(c));
    if (!own) el.classList.add('reveal');
    io.observe(el);
  });

/* ── carousels: pages of 2×2 (projects) and 3×2 (certifications) ── */
$$('[data-car-track]').forEach(track => {
  const pages = $$('.car__page', track);
  const dots  = $(`#${track.id}-dots`);
  const btns  = $$(`.carnav__b[data-car="${track.id}"]`);
  if (pages.length < 2) return;

  const base   = pages[0].offsetLeft;
  const paged  = () => track.scrollWidth > track.clientWidth + 4;   // false once stacked on mobile
  const nearest = () => {
    let best = 0, min = Infinity;
    pages.forEach((p, i) => {
      const d = Math.abs(p.offsetLeft - base - track.scrollLeft);
      if (d < min) { min = d; best = i; }
    });
    return best;
  };

  const marks = pages.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Go to page ${i + 1} of ${pages.length}`);
    b.addEventListener('click', () => go(i));
    dots?.append(b);
    return b;
  });

  const go = i => {
    const t = clamp(i, 0, pages.length - 1);
    track.scrollTo({ left: pages[t].offsetLeft - base, behavior: 'smooth' });
  };

  const sync = () => {
    const i = nearest();
    marks.forEach((m, k) => {
      m.classList.toggle('is-on', k === i);
      m.setAttribute('aria-current', k === i ? 'true' : 'false');
    });
    btns.forEach(b => {
      const dir = Number(b.dataset.dir);
      b.disabled = !paged() || (dir < 0 ? i === 0 : i === pages.length - 1);
    });
  };

  btns.forEach(b =>
    b.addEventListener('click', () => go(nearest() + Number(b.dataset.dir)))
  );

  let raf = false;
  track.addEventListener('scroll', () => {
    if (raf) return;
    raf = true;
    requestAnimationFrame(() => { sync(); raf = false; });
  }, { passive: true });

  window.addEventListener('resize', sync, { passive: true });
  sync();
});

/* ── pointer flourishes: spotlight, magnetic buttons, medallion tilt ──
   All of it is opt-in: fine pointers only, and disabled outright when the
   visitor asks for reduced motion. Touch devices never pay for any of it. */
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
const CALM = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (FINE && !CALM) {

  // gold light that follows the cursor across a card
  $$('.pcard, .cert, .tl__card, .edu li, .ccard, .toolbox, .awards').forEach(card => {
    card.classList.add('spot');
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
  });

  // buttons lean very slightly toward the cursor
  $$('.btn, .carnav__b').forEach(el => {
    const pull = 6;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 2;
      const y = ((e.clientY - r.top) / r.height - .5) * 2;
      el.style.translate = `${x * pull}px ${y * pull * .5}px`;
    }, { passive: true });
    el.addEventListener('pointerleave', () => { el.style.translate = '0 0'; });
  });

  // medallion tilts in 3D toward the cursor
  const medal = $('.medal');
  if (medal) {
    const MAX = 7;
    let idle;
    window.addEventListener('pointermove', e => {
      const r = medal.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const x = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -1, 1);
      const y = clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2), -1, 1);
      medal.style.transform =
        `perspective(1100px) rotateY(${x * MAX}deg) rotateX(${-y * MAX}deg)`;
      clearTimeout(idle);
      idle = setTimeout(() => { medal.style.transform = ''; }, 2200);
    }, { passive: true });
  }
}

/* ── contact form ── */
const form = $('#form');
const err  = $('#f-err');
const send = $('#f-send');
const FIELDS = ['#f-name', '#f-email', '#f-msg'];

const fail = (msg, sel) => {
  err.textContent = msg;
  err.hidden = false;
  FIELDS.forEach(s => $(s).removeAttribute('aria-invalid'));
  if (sel) { $(sel).setAttribute('aria-invalid', 'true'); $(sel).focus(); }
};

form?.addEventListener('submit', async e => {
  e.preventDefault();
  err.hidden = true;

  const data = Object.fromEntries(new FormData(form));
  const { name, email, subject, message } = data;

  const missing = ['name', 'email', 'message'].find(k => !data[k]?.trim());
  if (missing) {
    const label = missing[0].toUpperCase() + missing.slice(1);
    return fail(`${label} is required.`, `#f-${missing === 'message' ? 'msg' : missing}`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return fail('That email address looks incomplete.', '#f-email');
  }
  FIELDS.forEach(s => $(s).removeAttribute('aria-invalid'));

  // No endpoint set — hand the message to the visitor's mail client.
  if (!FORM_ENDPOINT) {
    const subj = subject?.trim() || `Portfolio enquiry from ${name}`;
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href =
      `mailto:${EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
    return;
  }

  const label = send.textContent;
  send.textContent = 'Sending…';
  send.disabled = true;

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    send.textContent = 'Sent — thank you';
  } catch {
    send.textContent = label;
    send.disabled = false;
    fail(`That didn't send. Please email ${EMAIL} directly.`);
  }
});

/* ── footer year ── */
const yr = $('#yr');
if (yr) yr.textContent = new Date().getFullYear();
