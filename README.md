# VIO.CO — Company Profile Website (React)

Single-page React app (client-side routing, 7 routes). Dark navy + cyan glow
theme, glassmorphism, fully responsive with **distinct mobile vs desktop layouts**.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site → dist/
npm run preview    # serve the built site
```

## Routes
| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About (team + process) |
| `/services` | Services (6 categories) |
| `/work` | Portfolio (filterable grid/carousel) |
| `/work/:slug` | Project detail |
| `/process` | Process + social media |
| `/contact` | Contact + brief form |

## Where to edit content
All copy lives in **`src/data.js`** — add/edit services, projects, clients,
steps, social media flow, contact links there.

## Responsive approach (mobile ≠ desktop)
- **Desktop**: split hero (text + portrait phone), responsive grid for
  services/work/clients, joined-row process steps, centered filters.
- **Mobile** (<=820px): centered text + landscape brand banner, horizontal
  swipe carousels (snap) for services & work, scroll-strip filters, vertical
  timeline rail with glowing dots for process, 2-col icon chips, logo marquee.

## Brand visual
Hero uses the reference brand lockup — glowing **V** mark +
`VIO.CO PRODUCTION HOUSE / CREATIVE AGENCY` on a navy->cyan gradient phone mockup.

## Placeholders to replace with client assets
- Project thumbnails: `WorkArt` (src/components/Bits.jsx) draws abstract
  gradients — swap for real stills/videos.
- Client logos: `CLIENTS` in data.js are text placeholders.
- Photos (team, on-set, BTS): gradient placeholders.
- Showreel / videos: `PhoneBrand` hero + project pages take real media.
- WhatsApp / Instagram / email: edit `BRAND` in data.js.

## Tech
React 19, react-router-dom 7, Vite 8. No UI framework — hand-written CSS
design system in src/index.css.
