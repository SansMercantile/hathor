# HATHOR Frontend — Mining & Resource Intelligence

HATHOR is Sans Mercantile's autonomous mining and geological resource
platform: AI geology scanning, extraction sequence optimization, safety
hazard command, and ESG/environmental compliance auditing, with live links to
its sister Constellation systems (Ptah, Hapi, Mami_Wata, Shango).

## Stack

Single Node/Express server (`server.ts`) that runs Vite in middleware mode for
dev and serves the static build in production — one process, one port, same
pattern as [[ptah]] and [[shango]].

- React 19 + TypeScript, Vite 6, Tailwind CSS 4
- `motion` (Framer Motion), `lucide-react` icons
- Google Gemini (`@google/genai`, model `gemini-3.5-flash`)

## Local Development

**Prerequisites:** Node.js 20+

```bash
npm install
cp .env.example .env.local
# then set GEMINI_API_KEY in .env.local
npm run dev
```

Runs on **http://localhost:3000**. Without `GEMINI_API_KEY`, all three
`/api/gemini/*` routes return realistic mock data instead of failing — the UI
is fully explorable without a key.

## API Routes (server.ts)

- `POST /api/gemini/geoscan` — geological stratigraphy scan, takes
  `{ blockSelection, expectedGrade, seismicAnomalies }`, returns
  `{ layers[], geologicalSummary }`
- `POST /api/gemini/optimize` — extraction sequence optimizer, takes
  `{ targetGrade, energyCap, haulerCount, tailingsRate, currentHazards }`,
  returns `{ schedule[], esgImpact, recommendations[] }`
- `POST /api/gemini/compliance` — ESG/safety audit report generator, takes
  `{ auditScope, telemetrySnap }`, returns `{ markdown }`

## Build & Run (production)

```bash
npm run build   # vite build + esbuild-bundles server.ts to dist/server.cjs
npm start        # node dist/server.cjs
```

## Project Structure

```
hathor/
├── server.ts                    # Express app: 3 Gemini API routes + Vite/static serving
├── src/
│   ├── App.tsx                   # Login gate + tabbed console shell
│   ├── components/
│   │   ├── LoginPortal.tsx
│   │   ├── GeologyModeler.tsx     # AI geology scan + interactive stratigraphy canvas
│   │   ├── ExtractionOptimizer.tsx
│   │   ├── SafetyHazards.tsx
│   │   ├── EnvironmentalAudit.tsx # ESG/compliance report generator
│   │   └── ConstellationLink.tsx  # Cross-system sister-node registry
│   ├── types.ts
│   └── index.css
└── vite.config.ts
```

Note: this repo also deploys to GitHub Pages (`CNAME` present) as a static
build alongside/instead of the Express server, depending on the deploy target.

## Notes

- 2026-08-09/10: replaced the previous (much simpler, plain-JS/JSX) HATHOR
  frontend with this real one from the authoritative source in
  `Downloads/Websites`. Fixed the same recurring issues found across the
  Constellation-family Gemini apps: invalid Tailwind classes that silently
  applied no style (`zinc-805`/`zinc-850` → `zinc-800`, `zinc-150` → `zinc-100`,
  `zinc-350`/`neutral-905` → `400`/`900`, `neutral-850` → `neutral-800`,
  `neutral-955` → `neutral-950`, `w-4.5`/`h-4.5` → `w-4`/`h-4` throughout),
  a broken build script missing the esbuild server-bundle step (same as
  [[ptah]]/[[shango]]), and the leftover `react-example` placeholder package
  name.
