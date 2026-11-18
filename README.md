# Santasila Bryan Kusno — Portfolio

Personal site built with [Astro](https://astro.build) (static output), GSAP and Lenis.
Live: https://main.d3ludbi4nxj7ab.amplifyapp.com

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
```

## Where things live

| Path | What |
| --- | --- |
| `src/data/site.ts` | All content: experience, projects, certifications, modules, awards |
| `src/components/` | One component per section |
| `src/styles/global.css` | Design tokens (gold, crimson, ink) and all styles, light + dark |
| `src/scripts/main.ts` | Animations, theme toggle, carousel, tabs, form |
| `src/pages/private/[slug].astro` | "Private project" page; add an entry to `privateProjects` |
| `public/` | Images, résumé PDF, favicon, OG card, `teamslot/` app |

## Add a certification

Put the badge in `public/img/`, then add one object to `certs` (earned) or `upcoming` in `src/data/site.ts`.
To move a certification from upcoming to earned, cut it from `upcoming`, paste it in `certs`, and add `href` (Credly link).

## Analytics (GA4)

Set the `PUBLIC_GA_ID` environment variable (for example `G-XXXXXXXXXX`) in Amplify and redeploy.
Without it, no analytics script is loaded.

## Deploy

- **AWS Amplify**: `amplify.yml` builds on every push to `main`.
- **GitHub Pages**: `.github/workflows/static.yml` builds with `SITE_BASE=/My-Portfolio/`.
