# Cloud Possible — Website

Marketing website for **Cloud Possible** (a Think Jay Inc company) — managed IT
support, cybersecurity, and cloud solutions for small businesses across Ontario.

Live site: **https://cloudpossible.ca**

This is a static site built with **Vite + React + Tailwind CSS**, hosted for free
on **GitHub Pages**. Every push to `main` rebuilds and redeploys the site
automatically — there is no server to run and no subscription.

## Pages

- `/` — Home
- `/services` — Business IT services
- `/ai` — AI configuration & enablement
- `/residential` — Residential tech support
- `/pricing` — Plans ($79 / $149 / $299)
- `/contact` — Contact form (see below)
- `/privacy`, `/terms` — Legal

## How the contact form works

The contact form posts to **Formspree** (`https://formspree.io/f/xwvrzqqd`), which
emails each submission to **info@cloudpossible.ca**. No backend or database is
required.

If the form ever stops delivering, sign in at <https://formspree.io> and confirm
the form/endpoint is active, then update the `FORMSPREE_ENDPOINT` value in
`src/pages/contact.tsx` if the ID changed.

## Editing the site

You don't need to run anything locally to make simple changes — edit the files on
GitHub (or with Claude) and the site redeploys on push. Common edits:

- **Text / copy** — the page files in `src/pages/*.tsx`.
- **Header & footer** — `src/components/layout.tsx`.
- **Brand colors** — the CSS variables in `src/index.css` (`--primary` is the sky
  blue).
- **Logo / images** — replace files in `public/`.
- **SEO / social preview** — `index.html` (title, description, Open Graph) and
  `public/sitemap.xml`.

## Running locally (optional)

```bash
npm install
npm run dev      # start a local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

Requires Node 20+.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub
Pages on every push to `main`. The custom domain is set via `public/CNAME`
(`cloudpossible.ca`), which is copied into the build output.

## Notes

- This repository is a clean rebuild of the original Replit project. The original
  had an optional lead-capture backend (Express + PostgreSQL + Resend); that has
  been replaced with Formspree so the whole site can run statically with nothing
  to host or pay for.
- Hero images are loaded from Unsplash. To make the site fully self-contained,
  download those images into `public/` and update the URLs in `src/pages/home.tsx`.
