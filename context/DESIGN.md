---
name: Arable Sophisticate
colors:
  surface: "#f9f9f7"
  surface-dim: "#dadad8"
  surface-bright: "#f9f9f7"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f4f4f2"
  surface-container: "#eeeeec"
  surface-container-high: "#e8e8e6"
  surface-container-highest: "#e2e3e1"
  on-surface: "#1a1c1b"
  on-surface-variant: "#444748"
  inverse-surface: "#2f3130"
  inverse-on-surface: "#f1f1ef"
  outline: "#747878"
  outline-variant: "#c4c7c7"
  surface-tint: "#5f5e5e"
  primary: "#000000"
  on-primary: "#ffffff"
  primary-container: "#1c1b1b"
  on-primary-container: "#858383"
  inverse-primary: "#c9c6c5"
  secondary: "#3b6934"
  on-secondary: "#ffffff"
  secondary-container: "#b9eeab"
  on-secondary-container: "#3f6d38"
  tertiary: "#000000"
  on-tertiary: "#ffffff"
  tertiary-container: "#241a0e"
  on-tertiary-container: "#928170"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#e5e2e1"
  primary-fixed-dim: "#c9c6c5"
  on-primary-fixed: "#1c1b1b"
  on-primary-fixed-variant: "#474646"
  secondary-fixed: "#bcf0ae"
  secondary-fixed-dim: "#a1d494"
  on-secondary-fixed: "#002201"
  on-secondary-fixed-variant: "#23501e"
  tertiary-fixed: "#f4dfcb"
  tertiary-fixed-dim: "#d7c3b0"
  on-tertiary-fixed: "#241a0e"
  on-tertiary-fixed-variant: "#524436"
  background: "#f9f9f7"
  on-background: "#1a1c1b"
  surface-variant: "#e2e3e1"
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: "400"
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 36px
    fontWeight: "400"
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: "400"
    lineHeight: 40px
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: "400"
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: "600"
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system balances the raw, grounded nature of agriculture with the precision of modern enterprise technology. The brand personality is authoritative yet organic, designed for high-end agritech platforms where data clarity meets environmental stewardship.

The aesthetic is rooted in **Minimalism** with a **High-Contrast** foundation. It leverages generous whitespace to symbolize vast open fields, while using asymmetric layouts to create a modern, editorial rhythm. The emotional goal is to evoke a sense of quiet confidence, reliability, and precision, moving away from "dirty" industrial associations toward a clean, high-key laboratory and field-monitoring atmosphere.

## Colors

The palette is a high-contrast monochromatic study punctuated by organic tones.

- **Primary (Ink):** A deep, near-black for typography and primary navigation, ensuring maximum legibility and authority.
- **Secondary (Foliage):** A rich, muted forest green used sparingly for active states, primary actions, and "growth" indicators.
- **Tertiary (Silt):** A sophisticated tan used for subtle background divisions, secondary buttons, and highlighting data clusters without the harshness of grey.
- **Neutral (Canvas):** A warm, off-white background that reduces eye strain compared to pure hex white while maintaining a high-key, airy feel.

## Typography

The typographic strategy bridges heritage and innovation. **Libre Caslon Text** is used for headlines to provide a literary, established feel—reminiscent of botanical journals and traditional agricultural records.

To maintain a "SaaS" level of utility, **Hanken Grotesk** is used for all functional UI elements, body copy, and data visualizations. This combination ensures that while the brand looks premium, the data remains hyper-readable and modern. Captions and labels utilize increased letter spacing and uppercase styling to provide a clear hierarchy against the serif headings.

## Layout & Spacing

The layout follows a **Fluid Grid** model with high-margin "safe zones" to emphasize minimalism.

- **Desktop:** 12-column grid with wide 48px margins and 24px gutters. Use asymmetric column spans (e.g., a 4-column sidebar with an 8-column content area, or a 7-column main image offset by a 3-column text block) to create visual interest.
- **Tablet:** 8-column grid with 32px margins.
- **Mobile:** 4-column grid with 20px margins.

Spacing should favor the `lg` and `xl` tokens to create a sense of "breathable" space. Component-level spacing follows an 8px rhythmic scale to maintain technical precision.

## Elevation & Depth

Depth in the design system is achieved through **High-Key Global Illumination**. Instead of heavy shadows, use:

- **Soft Ambient Shadows:** Large blur radii (20px+) with very low opacity (3-5%) tinted with the Primary color. These should feel like objects resting gently on a surface rather than floating.
- **Tonal Layering:** Use the Tertiary (Silt) color as a subtle background for containers to distinguish sections from the Neutral (Canvas) background.
- **Micro-borders:** 1px solid lines in a very light tint of the Primary color (10% opacity) are preferred over shadows for defining structured data tables and input fields.

## Shapes

The shape language is **Soft**. A subtle 0.25rem (4px) corner radius is applied to buttons and inputs to prevent the UI from feeling too aggressive or "industrial," maintaining the organic brand narrative. Larger containers like cards may use the `rounded-lg` (8px) setting to appear more approachable. Avoid pill-shapes; rectangles with soft corners feel more "architectural" and professional for the agritech sector.

## Components

- **Buttons:** Primary buttons are solid Primary (Ink) with white text. Secondary buttons use an outline of the Primary color or a solid Tertiary (Silt) fill with Primary text. No gradients.
- **Cards:** Use a Neutral background with a subtle 1px border. No heavy shadows. Cards should have generous internal padding (min 24px).
- **Inputs:** Clean, bottom-border only or light 1px stroke. Active state is indicated by a Secondary (Foliage) border.
- **Chips/Badges:** Use the Tertiary color for neutral status and the Secondary color for "Optimal" or "Active" status.
- **Data Tables:** High-density text in Hanken Grotesk. Use thin horizontal rules only; avoid vertical dividers to maintain the minimalist feel.
- **Charts:** Use a palette of Secondary (Foliage) and various shades of Tertiary (Silt) to maintain the organic monochromatic aesthetic.
