# The Lift — vision site (short version)

Private, single scrolling page in French: Sabrina's vision for The Lift, for Yoann.
The full brief and the decisions are in `the-lift-project-handoff.md`.

## Run locally

```bash
npm install
echo "SITE_PASSWORD=choose-one" > .env.local
npm run dev
```

Open http://localhost:3000, you land on the lift panel, type the password, press "8".

## Deploy (Vercel)

1. Import the repo in Vercel.
2. Add the environment variable `SITE_PASSWORD`.
3. Deploy. Without `SITE_PASSWORD` nobody can get in (the gate refuses everything).

Privacy: password cookie checked in `middleware.ts`, `noindex` meta, `X-Robots-Tag` header on every response, `robots.txt` disallows all.

## Images

All photos are from Pexels (free licence, no attribution required), graded with one warm colour grade so they feel like one place. Each one carries the caption "Visuel d'illustration". Sources in `CREDITS.md`.
