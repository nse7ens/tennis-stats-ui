# ADR-0007: Use @tabler/icons-react SVG components instead of webfont CDN

**Status:** Accepted  
**Date:** 2026-06-25

## Context

The app loaded Tabler Icons from jsDelivr CDN (`cdn.jsdelivr.net/npm/@tabler/icons-webfont@3/dist/tabler-icons.min.css`) via a `<link>` tag in `index.html`. This caused two problems:

1. **Browser Tracking Prevention warnings** — Edge (Balanced/Strict) and Safari ITP block storage access for third-party CDN domains, producing console warnings on every page load.
2. **Unnecessary download weight** — The webfont approach downloads a single woff2 file containing all ~5,000+ icons (~300–400 KB), even though the app only uses 5 icons.

## Decision

Replace the CDN webfont link with the `@tabler/icons-react` npm package. Icons are imported as tree-shakeable SVG React components and rendered inline. Only the 5 icons actually used (`IconSun`, `IconMoon`, `IconStar`, `IconGripVertical`, `IconX`) are included in the JS bundle.

## Consequences

- Icons are served from the same origin as the app — no CDN dependency, no Tracking Prevention warnings.
- Icon-related transfer drops from ~300–400 KB (full webfont) to ~2–3 KB (5 inlined SVGs).
- Icons are React components (`<IconStar size={28} />`) rather than `<i>` elements — slightly more explicit at the call site.
- Adding a new icon requires an import statement rather than just a class name, which is a negligible cost.
