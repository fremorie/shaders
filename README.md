# All kinds of shaders

A personal playground of GLSL shaders and 3D scenes, built with three.js and
React Three Fiber. Each experiment is its own page: shader basics (gradients,
stripes, SDFs, transformation matrices), larger experiments (grass, spirals,
stencil buffer), plus models and full scenes.

Live at https://fremorie.github.io/shaders/

## Getting started

Use the project's Node version:

```bash
nvm use
```

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint
- `npm run format` — format with Prettier

## Project structure

- `src/routes.jsx` — list of all pages; add a route here to publish a new one
- `src/components/` — shader pages and shared layout components
- `src/models/` — pages showing individual 3D models
- `src/scenes/` — larger composed scenes
- `src/shaders/` — reusable `.glsl` vertex and fragment shaders
- `public/` — models, textures and other static assets

## Deployment

Pushing to `main` builds the project and deploys `dist/` to GitHub Pages via
`.github/workflows/deploy.yml`.
