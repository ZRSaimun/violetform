# VioletForm

An original figure interactive website concept built for TripBhai.

## Experience

A speculative digital studio brought to life through a metallic figure, orbiting forms and changing light. Explore identity, interaction and expression as separate creative directions.

- Scroll-linked object assembly and camera composition.
- Three named chapters with keyboard-accessible buttons.
- Responsive layouts, pause control and reduced-motion support.
- Local original SVG artwork remains available if WebGL cannot start.
- No backend, payments, tracking, external fonts or API keys.

## Run

Serve this folder over HTTP, for example `python3 -m http.server 8000`, then open localhost:8000. No build or package installation is needed. GitHub Pages serves the repository root.

## Reference and authorship

Inspired by https://www.facebook.com/reel/1441081254434227. This is independently written code and artwork, not the creator's source or an exact reproduction. See CREDITS.md for asset provenance and licences. The design remains a concept; any product/venue is fictional.

## Rendering

Three.js is vendored for reliable static hosting. WebGL and the SVG fallback implement the same chapter progression using separate authored scene components. The renderer uses device pixel ratio capped at 2 for performance; this does not claim that all source images are native 4K.

The no-GPU composition also uses credited high-resolution photography, with independently animated clipped layers for garment/food studies. This fallback is a photographic composition rather than real-time 3D.
