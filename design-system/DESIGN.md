# FOSS United Design System Guidelines for Unscroll

Source Reference: `https://fossunited.org/indiafoss/2026`

## Brand Identity & Aesthetic Principles
- **Aesthetic**: Flat, crisp, community-centric, high-contrast, professional tech event design.
- **Color Anchors**:
  - **Primary**: Vitalize Green `#08b54d` / `#28a745` (action highlights, main badges, brand accents)
  - **Secondary**: Rose Madder `#e03636` / `#c54444` (alerts, special tags, watch indicators)
  - **Accent**: Indigo Carmine `#006ccc` (deep links, information badges)
  - **Neutrals**: `#0a0a0a` (headings & text), `#141414` (dark containers), `#fafafa` / `#f0f0f0` (surfaces), `#e5e7eb` (borders)
- **Typography**: Inter (weights: 300, 400, 500, 600, 700). High hierarchy contrast with uppercase tracking on labels.
- **Voice & Tone**: Friendly, open, confident. Action verbs: *what*, *is*, *explore*, *talk*, *why*, *live*, *open*.

## Design Tokens & CSS Variables
Import `design-system/fossunited-variables.css` in `globals.css` or layout.
- `--color-primary`: `#08b54d`
- `--color-secondary`: `#c54444`
- `--color-accent`: `#006ccc`
- `--radius-3`: `3px`
- `--radius-6`: `6px`
- `--radius-12`: `12px`
- `--radius-16`: `16px`

## Component Guidelines
1. **Cards**: Clean 1px `#e5e7eb` borders, rounded 12px/16px corners, subtle elevation (`--shadow-md`) on hover, bold primary brand category badge.
2. **Buttons**: Solid `--color-primary` with hover color change or crisp outlined buttons with 1px border.
3. **Sidebar / Navigation**: Charcoal / Off-white background, subtle active state indicator, clean icon alignment.
