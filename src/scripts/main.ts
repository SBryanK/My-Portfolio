import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T | null;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll(s)] as T[];
const root = document.documentElement;
const reduce = root.classList.contains('reduce');
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const track = (name: string) => { try { (window as any).gtag?.('event', name); } catch {} };

/* ── theme ── */
$('#theme')?.addEventListener('click', () => {
  const dark = getComputedStyle(root).getPropertyValue('--paper').trim() === '#14100c';
  const next = dark ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch {}
});

/* ── nav ── */
const nav = $('#nav'); const burger = $('#burger'); const menu = $('#navmenu');
const closeNav = () => { burger?.setAttribute('aria-expanded', 'false'); burger?.setAttribute('aria-label', 'Open menu'); menu?.classList.remove('is-open'); };
burger?.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!open));
  burger.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  menu?.classList.toggle('is-open', !open);
});
$$('#navmenu a').forEach(a => a.addEventListener('click', closeNav));
document.addEventListener('keydown', e => e.key === 'Escape' && closeNav());

/* ── smooth scroll ── */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const id = a.getAttribute('href')!;
  const el = id.length > 1 ? $(id) : null;
  if (!el) return;
  e.preventDefault();
  lenis ? lenis.scrollTo(el, { offset: -64 }) : el.scrollIntoView({ behavior: 'smooth' });
  history.replaceState(null, '', id);
}));

/* ── nav state + progress + scrollspy ── */
const bar = $('#progress i');
const links = $$<HTMLAnchorElement>('#navmenu a');
const secs = links.map(a => $(a.getAttribute('href')!.replace('/', ''))).filter(Boolean) as HTMLElement[];
ScrollTrigger.create({
  start: 0, end: 'max',
  onUpdate: self => {
    if (bar) bar.style.transform = `scaleX(${self.progress})`;
    nav?.classList.toggle('is-stuck', window.scrollY > 24);
  },
});
secs.forEach((s, i) => ScrollTrigger.create({
  trigger: s, start: 'top 55%', end: 'bottom 55%',
  onToggle: self => self.isActive && links.forEach((l, j) => l.classList.toggle('is-on', i === j)),
}));

/* ── hero intro ── */
const splitRows = $$('[data-split]');
splitRows.forEach(row => {
  const text = row.textContent || '';
  row.setAttribute('aria-hidden', 'true');
  row.innerHTML = [...text].map(c => c === ' ' ? ' ' : `<span class="ch${row.hasAttribute('data-foil') ? ' foil' : ''}">${c}</span>`).join('');
});
if (!reduce) {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.from('.ch', { yPercent: 115, rotate: 6, opacity: 0, duration: 1.1, stagger: 0.035 })
    .from('[data-intro]', { y: 28, opacity: 0, duration: 0.9, stagger: 0.09 }, '-=0.7')
    .from('.float', { scale: 0.4, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'back.out(2)' }, '-=0.6');
}

/* ── typed roles ── */
const typed = $('#typed');
if (typed && !reduce) {
  const words = ['Cloud Architect', 'Data Analyst', 'Fintech builder', 'ML tinkerer'];
  let w = 0, c = 0, del = false;
  const tick = () => {
    const word = words[w];
    c += del ? -1 : 1;
    typed.textContent = word.slice(0, c);
    let wait = del ? 40 : 85;
    if (!del && c === word.length) { del = true; wait = 1400; }
    else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 300; }
    setTimeout(tick, wait);
  };
  setTimeout(tick, 2600);
}

/* ── network canvas ── */
const cv = $<HTMLCanvasElement>('#net');
if (cv && !reduce) {
  const ctx = cv.getContext('2d')!;
  let W = 0, H = 0, pts: { x: number; y: number; vx: number; vy: number }[] = [];
  const mouse = { x: -999, y: -999 };
  const size = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(70, (W * H) / 16000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }));
  };
  size(); addEventListener('resize', size);
  cv.parentElement!.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }).observe(cv);
  const loop = () => {
    requestAnimationFrame(loop);
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 120) { p.x += dx / d * 1.2; p.y += dy / d * 1.2; }
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 130) { ctx.strokeStyle = `rgba(201,150,44,${(1 - d / 130) * .35})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
      }
      ctx.fillStyle = 'rgba(201,150,44,.7)'; ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, 2, 0, 7); ctx.fill();
    }
  };
  loop();
}

/* ── medallion tilt + parallax ── */
const medal = $('#medal'); const photo = $('#medalPhoto');
if (medal && photo && fine && !reduce) {
  medal.addEventListener('pointermove', e => {
    const r = medal.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    photo.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
  });
  medal.addEventListener('pointerleave', () => { photo.style.transform = ''; });
}

/* ── reveal on scroll ── */
if (!reduce) {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%', once: true,
    onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, overwrite: true }),
  });
}

/* ── counters ── */
$$('[data-count]').forEach(el => {
  const end = Number(el.dataset.count);
  if (reduce) { el.textContent = String(end); return; }
  const o = { v: 0 };
  ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () =>
    gsap.to(o, { v: end, duration: 1.8, ease: 'power2.out', onUpdate: () => { el.textContent = String(Math.round(o.v)); } }) });
});

/* ── timeline spine ── */
const spine = $('#spine'); const tl = $('#tl');
if (spine && tl) {
  if (reduce) spine.style.transform = 'scaleY(1)';
  else gsap.to(spine, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } });
}

/* ── projects scroller ── */
const sc = $('#pscroll');
if (sc) {
  const cards = $$('.pcard', sc); const dots = $('#pdots')!;
  dots.innerHTML = cards.map(() => '<i></i>').join('');
  const di = $$('i', dots);
  const upd = () => {
    const x = sc.scrollLeft; let best = 0, bd = 1e9;
    cards.forEach((c, i) => { const d = Math.abs(c.offsetLeft - sc.offsetLeft - x); if (d < bd) { bd = d; best = i; } });
    di.forEach((d, i) => d.classList.toggle('on', i === best));
  };
  sc.addEventListener('scroll', upd, { passive: true }); upd();
  $$('[data-scroll]').forEach(b => b.addEventListener('click', () => {
    sc.scrollBy({ left: Number(b.dataset.scroll) * (cards[0].offsetWidth + 22), behavior: 'smooth' });
  }));
  if (fine) {
    let down = false, sx = 0, sl = 0, moved = false;
    sc.addEventListener('pointerdown', e => { down = true; moved = false; sx = e.clientX; sl = sc.scrollLeft; });
    addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 5) { moved = true; sc.classList.add('drag'); } sc.scrollLeft = sl - dx; });
    addEventListener('pointerup', () => { down = false; sc.classList.remove('drag'); });
    sc.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  }
  sc.addEventListener('wheel', e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.stopPropagation(); }, { passive: true });
  sc.setAttribute('data-lenis-prevent-wheel', '');
}

/* ── card tilt ── */
if (fine && !reduce) $$('[data-tilt]').forEach(c => {
  c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
  });
  c.addEventListener('pointerleave', () => { c.style.transform = ''; });
});

/* ── hover glow: per-character highlight near the pointer ── */
if (fine && !reduce) {
  $$('[data-fx]').forEach(el => {
    el.classList.add('fx');
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) {
      const n = walker.currentNode as Text;
      if (n.textContent?.trim() && !n.parentElement?.closest('#typed')) nodes.push(n);
    }
    nodes.forEach(n => {
      const frag = document.createDocumentFragment();
      (n.textContent || '').split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.append(' '); return; }
        const w = document.createElement('span'); w.className = 'w';
        [...part].forEach(ch => { const c = document.createElement('span'); c.className = 'c'; c.textContent = ch; w.append(c); });
        frag.append(w);
      });
      n.replaceWith(frag);
    });
    const chars = [...el.querySelectorAll<HTMLElement>('.c')];
    const R = 64; let raf = 0, px = 0, py = 0;
    const paint = () => {
      raf = 0;
      const rects = chars.map(c => c.getBoundingClientRect());
      chars.forEach((c, i) => {
        const r = rects[i];
        const d = Math.hypot(r.left + r.width / 2 - px, r.top + r.height / 2 - py);
        c.style.setProperty('--t', d < R ? (1 - d / R).toFixed(2) : '0');
      });
    };
    el.addEventListener('pointermove', e => { px = (e as PointerEvent).clientX; py = (e as PointerEvent).clientY; if (!raf) raf = requestAnimationFrame(paint); });
    el.addEventListener('pointerleave', () => { cancelAnimationFrame(raf); raf = 0; chars.forEach(c => c.style.setProperty('--t', '0')); });
  });
}

/* ── expand / collapse (toggle sits after the text) ── */
$$<HTMLButtonElement>('[data-xtoggle]').forEach(btn => btn.addEventListener('click', () => {
  const box = btn.previousElementSibling as HTMLElement | null;
  if (!box) return;
  const open = box.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
  btn.textContent = open ? btn.dataset.less! : btn.dataset.more!;
  setTimeout(() => ScrollTrigger.refresh(), 480);
}));

/* ── cert touch flip ── */
$$('.cert').forEach(c => c.addEventListener('click', e => { if ((e.target as HTMLElement).closest('a')) return; c.classList.toggle('flip'); }));

/* ── magnetic buttons ── */
if (fine && !reduce) $$('[data-magnet]').forEach(b => {
  b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .25, y: (e.clientY - r.top - r.height / 2) * .35, duration: .3 }); });
  b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' }));
});

/* ── cursor ── */
const cur = $('#cursor');
if (cur && fine && !reduce) {
  const xs = gsap.quickTo(cur, 'x', { duration: .25, ease: 'power3' }), ys = gsap.quickTo(cur, 'y', { duration: .25, ease: 'power3' });
  addEventListener('pointermove', e => { xs(e.clientX - 17); ys(e.clientY - 17); });
  document.addEventListener('pointerover', e => cur.classList.toggle('big', !!(e.target as HTMLElement).closest('a,button,.cert,.pcard')));
}

/* ── analytics events ── */
document.addEventListener('click', e => { const t = (e.target as HTMLElement).closest('[data-track]') as HTMLElement | null; if (t) track(t.dataset.track!); });

/* ── contact form ── */
const form = $<HTMLFormElement>('#form');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(form); const err = $('#f-err')!;
  const name = String(f.get('name') || '').trim(), email = String(f.get('email') || '').trim(), msg = String(f.get('message') || '').trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) { err.hidden = false; err.textContent = 'Please add your name, a valid email and a message.'; return; }
  err.hidden = true;
  const subject = String(f.get('subject') || '') || `Hello from ${name}`;
  track('contact_submit');
  location.href = `mailto:santasila.bryan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${msg}\n\n— ${name} (${email})`)}`;
});

addEventListener('load', () => ScrollTrigger.refresh());
