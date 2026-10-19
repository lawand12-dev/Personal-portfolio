# Animations and Interactions

The current implementation is intentionally restrained. The original project brief describes some ideas not present in the app; this file records only behaviors found in source.

| Behavior | What the user sees / trigger | Technique, timing, easing | Source |
| --- | --- | --- | --- |
| Terminal typing | On mount, transcript characters appear progressively, with a brief pause at line breaks. | React state and chained `setTimeout`; 40ms per character and 300ms after a line break. No easing. | `src/components/ui/TerminalWindow.tsx` |
| Terminal cursor | A cursor blinks next to the transcript. | CSS keyframes, 1s cycle using `steps(2, start)`, infinite. | `src/styles/Portfolio.css` |
| Scroll reveal | Wrapped content fades in and moves upward 12px when entering the viewport; each reveal runs once. The `delay` prop can stagger items. | Motion `whileInView`, `opacity` and `y`; 400ms with ease-out; default delay 0. | `src/components/ui/Reveal.tsx` |
| Route transition | On route changes, the outgoing page fades and moves slightly upward; the new page fades in and moves from `y: 8` to rest. The shell also focuses the main landmark after route change. | Motion opacity/transform; exit 150ms ease-in, entry 240ms ease-out. | `src/components/layout/PageShell.tsx` |
| Navigation disclosure | Mobile menu appears/disappears when the menu button is toggled; links close it. Escape closes the menu and returns focus. | Base UI `Collapsible` with controlled React state; no animation. | `src/components/layout/NavBar.tsx` |
| Contribution wave morph | 2D heatmap morphs into a 3D isometric skyline (and vice-versa). Bars rise in a progressive wave sweeping from oldest week to newest week as the camera tilts. | Canvas `requestAnimationFrame`, `easeOutCubic` / `easeInOutCubic`, wave delay offset per column/row (`riseAt`). Duration default 750ms. | `src/contribution.tsx`, `src/contribution-utils.ts` |
| Contribution 3D orbit | In 3D view, dragging on canvas rotates camera yaw (8° to 82°) and elevation (18° to 62°); double-clicking smoothly resets to default isometric angle. | Canvas pointer drag listeners with delta tracking and clamped spherical camera projection. | `src/contribution.tsx`, `src/contribution-utils.ts` |
| Action-link color feedback | Primary/secondary action background and border colors change on hover/active. | CSS color/border transitions, 150ms, ease-out. No press translation is applied to portfolio action links. | `src/styles/Portfolio.css` |
| Navigation hover/active | Text and underline treatment changes on hover/active. | CSS state selectors; immediate, with no transition declared for portfolio navigation. | `src/styles/Portfolio.css` |
| Action button states | Action buttons brighten or change surface on hover and move down 1px while pressed. | CSS color/border/transform transitions, 150ms, ease-out. | `src/styles/Portfolio.css` |
| Text-link arrow | A text-link arrow moves 4px right on hover. | CSS transform transition, 150ms, ease-out. | `src/styles/Portfolio.css` |
| Showcase loading sample | A sample circular indicator spins. | CSS keyframes, 800ms linear, infinite. It is not used in ordinary site navigation. | `src/pages/KitchenSinkPage.css` |
| Skip link | The skip link is visually moved out of the way until focused, then brought into view. | CSS transform/state change; not a decorative animation. | `src/styles/Portfolio.css` |

The actual implementation does **not** include the planned project-card lift, frame draw-in, parallax, custom cursor, nav hide/show, or `AnimatePresence` route-outlet setup. Project cards are not implemented.

## Reduced motion

- `TerminalWindow` uses Motion's reduced-motion preference and presents the complete transcript immediately rather than typing; the cursor animation is disabled.
- `Reveal` checks the reduced-motion preference and avoids its entrance movement/hidden initial state when reduction is requested.
- `PageShell` disables route animation when reduced motion is requested.
- `ContributionSkyline` respects user preference and avoids disorienting motion; 2D/3D state transitions snap directly without prolonged wave delays.
- Global CSS uses `@media (prefers-reduced-motion: reduce)` to switch smooth scrolling off and set CSS animation/transition durations to `0.01ms` with a single iteration.
- The kitchen-sink spinner is stopped under reduced motion. Its arrow sample also does not translate.

The page remains usable when motion is reduced; no content depends on an animation completing.

## Performance and intent

- The terminal timer runs only while characters remain; it is not a perpetual typing loop.
- Reveals and route transitions animate opacity and transforms, not layout dimensions.
- Cursor blinking and the kitchen-sink spinner use CSS keyframes. The spinner only appears on the development showcase.
- The transcript retains a static accessible equivalent rather than relying on animated visual text alone.
- The original brief proposed `LazyMotion`/`m` for a smaller Motion payload; the current source should be checked before making bundle-size claims. The code uses Motion components and does not have a dedicated motion feature-loading module.
- Actual LCP and Lighthouse figures are recorded in [ROADMAP.md](./ROADMAP.md); the measured lab LCP exceeded the brief's target despite high Lighthouse category scores.
