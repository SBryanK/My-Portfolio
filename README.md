# Santasila Bryan Kusno — Portfolio

Personal site for Santasila Bryan Kusno — Cloud Solution Architect, Data
Analyst, and MSc candidate at NUS. Static HTML, CSS, and vanilla JS — no
build step, no framework, no dependencies. Deployed on AWS Amplify from
`main`.

**Live:** https://main.d3ludbi4nxj7ab.amplifyapp.com

## Run it locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Any static file server works — there's nothing to build or install.

## Files

| Path          | What it is                                                   |
| ------------- | ------------------------------------------------------------- |
| `index.html`  | Whole site, one page, sections in nav order                  |
| `styles.css`  | Design tokens at the top, then one block per section          |
| `script.js`   | Nav, scroll spy, carousels, reveal animations, contact form   |
| `assets/`     | Photos, logos, certification badges, résumé PDF, OG card      |

## Design system

Tokens live in `:root` at the top of `styles.css`.

```
--au-500   #C9962C   gold — primary accent, foil text, CTAs
--rd-600   #C0263F   crimson — secondary accent, used sparingly
--ink      #231B16   body text
--paper    #FFFFFF   background — no dark sections anywhere
```

Type: **Figtree** throughout (closest free stand-in for Proxima Nova — swap
in a real Proxima Nova `@font-face` if you have an Adobe Fonts kit; the
font-family stack already lists it first as a fallback target).

### Signature elements

- **Foil-stamped name** — the surname in the hero animates through a gold
  gradient sweep (`@keyframes foil`), like a foil-stamped business card.
- **Medallion portrait** — the profile photo sits inside two concentric
  rings (dashed gold, solid crimson) that rotate slowly in opposite
  directions, with a subtle 3D tilt toward the cursor on desktop.
- **Timeline spine** — the Experience section's connecting line fills with
  a gold-to-crimson gradient as you scroll, and each node position is
  derived from a single `--rail` CSS variable so it can never drift out of
  alignment with the line at any viewport width.
- **Carousels** — Projects (2×2 pages) and Certifications (3×2 pages) use
  native scroll-snap with JS-driven dot indicators and prev/next buttons.
  On mobile they collapse into plain vertical lists.
- **Pointer flourishes** — a soft gold spotlight follows the cursor across
  cards, and buttons lean slightly toward it. Both are gated to
  `(hover: hover) and (pointer: fine)` and fully disabled under
  `prefers-reduced-motion`, so touch devices never pay for them.

## Contact form

By default the form validates client-side, then opens the visitor's mail
client with the message pre-filled — no backend required. To receive
submissions directly in your inbox instead, create a
[Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com)
endpoint and set it at the top of `script.js`:

```js
const FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
```

Nothing else needs to change — the POST request and error handling are
already wired up.

## Deployment

Pushes to `main` trigger an automatic AWS Amplify build and deploy — no
CI config needed for a static site like this. To deploy elsewhere
(Netlify, Vercel, GitHub Pages), just point the host at the repo root;
there's no build command to run.

## Before the next content update

- [ ] Confirm all project links in the Projects section point to live
      repos/demos, not placeholder GitHub profile links
- [ ] Re-export `assets/santasila-bryan-kusno-cv.pdf` whenever the résumé
      changes so it matches what's on the site
- [ ] Regenerate `assets/og-card.png` if the hero headline or role text
      changes (script used to generate it is not checked in — rebuild with
      Pillow using the Fraunces/Figtree fonts if needed)
- [ ] Double-check dates in the Experience and Education sections stay
      current (e.g. Tencent end date, NUS MSc completion date)
