---
name: Kinetic Cipher
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#ffffff'
  on-secondary: '#2b3400'
  secondary-container: '#cdf200'
  on-secondary-container: '#5a6b00'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#929090'
  on-tertiary-container: '#2a2a2a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#cdf200'
  secondary-fixed-dim: '#b4d400'
  on-secondary-fixed: '#181e00'
  on-secondary-fixed-variant: '#3f4c00'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 120px
---

## Brand & Style

This design system is engineered for a high-performance software engineering portfolio. It merges **Minimalism** with **Cyber-Tech** influences to evoke a sense of precision, innovation, and technical mastery. The aesthetic is built on a "Dark Mode First" philosophy, utilizing deep obsidian surfaces to make code snippets and project visuals pop with cinematic intensity.

The target audience consists of technical recruiters, engineering managers, and open-source collaborators who value clarity, speed, and technical depth. The UI utilizes **Glassmorphism** to create a sense of layered complexity without clutter, employing frosted surfaces and subtle glowing accents to guide the eye toward key achievements and calls to action.

## Colors

The palette is anchored in **Midnight Black (#0A0A0A)**, providing a high-contrast foundation that minimizes eye strain and maximizes professional "dev" appeal. 

- **Primary (Electric Indigo):** Used for primary actions, active states, and brand-critical highlights.
- **Secondary (Cyber Lime):** Reserved for high-energy accents, success states, and "Open to Work" indicators. This color should be used sparingly to maintain its impact.
- **Surface Tiers:** Backgrounds transition from #0A0A0A (Base) to #1A1A1A (Cards) to #262626 (Overlays).
- **Accents:** Vibrant gradients (Indigo to Lime) are permitted for decorative elements like progress bars or hover-state borders.

## Typography

Typography balances the corporate reliability of **Inter** with the technical, "builder" aesthetic of **JetBrains Mono**. 

- **Headlines:** Use Inter with tight tracking and heavy weights (700+) to create a bold, confident hierarchy.
- **Body:** Inter is the workhorse for readability. Use wide line-heights (1.6) to ensure long-form project descriptions remain accessible.
- **Data & Metadata:** JetBrains Mono is utilized for all technical labels, tags, code snippets, and timestamps. This reinforces the developer persona.
- **Responsive Scaling:** On mobile, display sizes must shrink aggressively to prevent awkward word breaks, while maintaining the heavy stroke weight.

## Layout & Spacing

This design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **The 8px Rule:** All padding, margins, and component heights must be multiples of 8px to maintain mathematical harmony.
- **Section Breathing Room:** Substantial vertical gaps (120px+) between sections are used to focus the user's attention on one project or skill at a time.
- **Safe Zones:** Content is centered with a max-width of 1200px to ensure legibility on ultrawide monitors common in engineering setups.
- **Alignment:** Consistent left-alignment is preferred for technical readability, with the exception of hero displays.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **Glassmorphism** rather than traditional drop shadows.

- **The Glass Layer:** Cards use a semi-transparent background (`rgba(26, 26, 26, 0.6)`) with a `backdrop-filter: blur(12px)`.
- **Glowing Borders:** Instead of shadows, use a 1px solid border (`rgba(255, 255, 255, 0.1)`). On hover, this border should transition to a subtle "outer glow" using the Primary color at 20% opacity.
- **Z-Axis Hierarchy:**
  - Level 0: Pure Black (#0A0A0A) - Site background.
  - Level 1: Dark Charcoal (#1A1A1A) - Standard card surfaces.
  - Level 2: Glass Overlay - Modals, dropdowns, and sticky navigation.

## Shapes

The shape language is **Soft (0.25rem)** to maintain a technical, "engineered" look. Rounded corners are intentional but minimal, avoiding the "bubbly" appearance of consumer social apps. 

- **Base Radius:** 4px for buttons, inputs, and small chips.
- **Large Radius:** 8px (rounded-lg) for project cards and container sections.
- **Interactive Elements:** Buttons maintain a strict rectangular feel with just enough rounding to feel modern and "touch-friendly" without losing their sharp edge.

## Components

### Buttons
- **Primary:** Solid Electric Indigo with white text. 0.5s transition to a slightly brighter indigo on hover.
- **Secondary:** Ghost style. Transparent background, 1px Cyber Lime border, Cyber Lime text.
- **Icon Buttons:** Square 40x40px containers with JetBrains Mono icons or minimal SVG line icons.

### Project Cards
- **Structure:** Glassmorphic background, 8px corner radius, 1px subtle border.
- **Content:** Headline-sm for project title, Code-md for technology tags, and Body-md for the description.
- **Interaction:** On hover, the 1px border glows Electric Indigo and the image within scales by 5%.

### Technical Chips
- **Style:** Small, pill-shaped containers using JetBrains Mono (label-caps).
- **Colors:** Dark grey background (#262626) with light grey text. No borders.

### Inputs & Fields
- **Style:** Dark backgrounds (#1A1A1A) with bottom-only borders for a sleek "terminal" feel.
- **Focus State:** The bottom border transforms into a 2px Cyber Lime line.

### Code Blocks
- **Style:** Deep black background with syntax highlighting inspired by "Tokyo Night" or "One Dark" themes. Always include a "Copy" button in the top-right corner using the Cyber Lime accent.