---
name: HaloPay POS
description: A minimalist, high-contrast point of sale terminal matching the Stripe Terminal and Square POS category standard.
colors:
  primary: "#2563eb"
  neutral-bg: "#f9fafb"
  neutral-surface: "#ffffff"
  neutral-text-primary: "#111827"
  neutral-text-secondary: "#6b7280"
  neutral-border: "#e5e7eb"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: "1"
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: "1.25rem"
    letterSpacing: "normal"
rounded:
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
spacing:
  md: "12px"
  lg: "16px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.2xl}"
  button-keypad:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text-primary}"
    rounded: "{rounded.2xl}"
---

# Design System: HaloPay POS

## Overview

**Creative North Star: "The Category Standard (Canon Exit)"**

A clean, stark white, high-contrast interface designed to sit natively alongside Stripe Terminal and Square POS. The design discards earlier sci-fi or rugged tropes in favor of a purely functional, professional aesthetic. It relies on crisp typography, generous touch targets, and stark separation of planes (gray backgrounds vs. white interactive surfaces) rather than heavy borders or stylized effects.

**Key Characteristics:**
- High-contrast legibility for bright retail environments.
- Large, reliable touch targets (16px radius minimum for primary actions).
- Utilitarian hierarchy driven by weight and scale, not color.
- Action-oriented accenting: color is reserved exclusively for the primary "Charge" action and active states.

## Colors

The palette is strictly constrained, prioritizing legibility and a clinical, professional feel over brand expression.

### Primary
- **Action Blue** (#2563eb): The sole interactive accent, reserved for the primary "Charge" button and critical active states.

### Neutral
- **Terminal Background** (#f9fafb): The default canvas. Slightly cool to reduce eye strain compared to pure white.
- **Surface White** (#ffffff): Interactive elements (keys, cards) and raised planes.
- **Text Primary** (#111827): Maximum contrast for the charge amount and primary readings.
- **Text Secondary** (#6b7280): Supportive data, labels, and timestamps.
- **Subtle Border** (#e5e7eb): Used sparingly to define structural edges on white surfaces.

### Named Rules
**The Action Isolation Rule.** The primary blue is used only for the terminal's main objective (charging/confirming) and active notification states. Never use it for decoration or secondary actions.

## Typography

**Display Font:** Inter (with system-ui fallback)
**Body Font:** Inter (with system-ui fallback)

**Character:** Clinical, numeric-first, and highly legible.

### Hierarchy
- **Display** (Extra Bold, 3rem, tight tracking): The primary charge amount. Designed to be readable at a glance from a distance.
- **Body** (Medium, 0.875rem): Standard interface labels and settings.
- **Mono / Label** (Medium, 0.75rem, mono-spaced): Used exclusively for transaction hashes, memos, and public keys where character distinction is critical.

### Named Rules
**The Numeric Primacy Rule.** The charge amount is always the largest element on the screen, rendered in Extra Bold, ensuring the merchant and customer are never in doubt of the transaction state.

## Layout

The application uses a constrained, mobile-first column layout optimized for 480p/720p handheld form factors (`max-w-md mx-auto`). Spacing is utilitarian, favoring dense but clearly separated clusters for rapid data entry.

## Elevation & Depth

The system uses a nearly flat hierarchy, relying on tonal contrast (white surfaces on gray backgrounds) rather than heavy drop shadows to establish planes.

### Shadow Vocabulary
- **Subtle Lift** (`box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)`): Applied to keypad buttons to separate them from the background.
- **Primary Glow** (`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)`): Applied exclusively to the primary Action button and slide-over panels.

### Named Rules
**The Flat Plane Rule.** Depth is structural, not decorative. Use shadows only to indicate interactivity (buttons) or elevation over the primary canvas (bottom sheets/modals).

## Shapes

Forms are friendly but firm, utilizing generous border radii (`16px` for keys, `24px` for bottom sheets) to soften the stark contrast and provide comfortable, finger-sized touch targets.

## Components

### Keypad Buttons
- **Shape:** Soft square (16px radius)
- **Primary Style:** White surface, subtle gray border, heavy primary text.
- **Active State:** Darkens to a light gray (`#f3f4f6`) to provide immediate tactile feedback.

### Charge Button
- **Shape:** Pill-like rectangle (16px radius), spanning the available width.
- **Primary:** Action Blue with white text and a medium shadow.
- **Disabled State:** 50% opacity, shadow removed, preventing ambiguous interaction.

### Bottom Sheets (History / Modals)
- **Corner Style:** 24px radius on top corners only.
- **Background:** Pure white over the terminal canvas.
- **Shadow Strategy:** Heavy top shadow to indicate it sits above the main context.

## Do's and Don'ts

### Do:
- **Do** ensure all interactive touch targets are at least 48px high.
- **Do** use the Action Blue solely for the terminal's primary intent.
- **Do** maintain maximum contrast (gray-900 on white) for all monetary amounts.

### Don't:
- **Don't** reintroduce dark mode. The application must remain light and legible in variable retail environments.
- **Don't** use decorative gradients, glassmorphism, or heavy borders.
