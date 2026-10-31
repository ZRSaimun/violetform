# VioletForm — reference reconstruction

The main website now reproduces the visible sequence from **Immersive agency — reference study**, replacing the independently illustrated concept on the main route.

## Current experience

- Scroll forward/backward through the recorded scenes.
- Chapter navigation, keyboard step controls, range slider, restart and pause.
- Reduced-motion support, loading/error state and source credits.
- No WebGL requirement for the recorded visual reconstruction.

This is a **visual reconstruction of the recording, not the original application**. Recorded on-screen buttons are part of the image; native scene navigation is provided separately. Unseen page content, original 3D models, checkout and private source code were not recovered.

Source: https://www.facebook.com/reel/1441081254434227
Creator: Jerry the Web Dev

The source records a screen. Cropping, perspective, motion blur and clipped page edges remain. This reproduces recorded visuals rather than recovering the original application.

See [REFERENCE.md](REFERENCE.md) for fidelity and provenance details. The earlier independently modelled prototype remains at [independent-study.html](independent-study.html). Its Three.js library and credited stock photograph are retained for that route.

## Run

Serve the repository root over HTTP (`python3 -m http.server 8000`) or use GitHub Pages from main/root. No build, package installation, backend or API keys are needed.

## Rights

Reference imagery and displayed brands remain the work of their respective creators. No ownership or asset-reuse licence is asserted for the reference imagery. Third-party library and stock-photo licences apply to the earlier independent route; see CREDITS.md and ASSETS.json.
