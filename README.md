# Krishna Gupta — Portfolio V2.2

A modern editorial-style developer portfolio built with React, TypeScript, Vite, GSAP, Framer Motion, Lenis, and an Express contact API starter.

## Included in this version

- Krishna's supplied portrait is included at `public/assets/krishna-portrait.jpg` and displayed prominently in the hero section.
- Local SVG visual assets for architectural contours, grid textures, and custom project interface concept artwork.
- Animated hero orbit, floating information cards, scroll progress indicator, parallax details, reveal transitions, and smooth scrolling.
- Interactive project artwork with hover depth and animated transitions.
- Responsive navigation, reduced-motion support, and a mobile layout.
- Express API starter for the contact form (email delivery still requires an email provider integration).

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

To run the API in another terminal:

```bash
cp .env.example .env
npm run server
```

## Production build

```bash
npm run build
npm run preview
```

## Project structure

- `src/App.tsx` — page structure and animation orchestration
- `src/styles.css` — visual system, responsive styles, and motion styling
- `src/data/content.ts` — project and skills content
- `public/assets/` — supplied portrait and locally bundled SVG visual assets
- `server/index.js` — Express API starter

## Notes

- Project preview images are conceptual interface artwork, not screenshots of the live applications.
- Project descriptions and skills should be reviewed before public launch to ensure every claim matches the user's actual contribution.
- Add a real resume file and configure an email provider before deploying the contact workflow.
- The supplied portrait is used as provided; the site applies a crop and subtle colour treatment rather than changing the subject's appearance.


## Cinematic scroll experience (v2.3)

GSAP ScrollTrigger and Lenis make scroll position drive the scene transitions. Chapters enter with a soft clip-mask reveal, scale/depth shift, and blur-to-focus transition. The hero gently recedes as the next chapter arrives, while project cards animate in with scroll-scrubbed depth. This is intentionally scroll-controlled (not autoplay video), so visitors can move forward or backward through the experience at their own pace.

Your portrait is included at `public/assets/krishna-portrait.jpg` and used in the hero.

### Run locally

```bash
npm install
npm run dev
```

Optional API server in a second terminal:

```bash
npm run server
```

For accessibility, users with `prefers-reduced-motion: reduce` receive the static layout without cinematic scroll transforms.
