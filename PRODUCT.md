# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Local brick-and-mortar merchants in emerging markets, using low-cost Android POS devices and smartphones in environments with limited or intermittent internet connectivity.

## Product Purpose
Enables local merchants to accept USDC payments over the Stellar network with instant fiat exchange rate conversions. Guarantees payment terminal operation even when internet connectivity drops by operating offline-first.

## Positioning
An offline-first, cached-rate POS terminal for emerging markets that natively outputs SEP-0007 QR codes, making any Stellar wallet a viable payment method without requiring a live connection on the merchant's device.

## Operating Context
Merchants use low-end Android devices (480p/720p screens) at checkout counters. Customers scan the generated QR code using their own Stellar wallets (e.g., LOBSTR, Beans, Vibrant). Transactions are completed by the customer and verified via WebSocket when the merchant is online.

## Capabilities and Constraints
- **Capabilities**: Offline SEP-0007 QR Generation, Cached Rate Engine with Staleness Indicator, Real-time WebSocket Listener for confirmations, PWA Service Worker caching.
- **Constraints**: Must function on low-end devices with limited connectivity. Built as a Next.js Progressive Web Application (PWA).

## Brand Commitments
Standard category convention (Canon exit). Must sit alongside Stripe Terminal and Square POS, matching their craft level at full fidelity. Requires a functional, professional aesthetic.

## Evidence on Hand
- PWA setup (manifest.json, sw.js) and Next.js / Tailwind CSS stack.
- Real-time WebSocket and Horizon API environment variables.
- Exchange rate caching and SEP-0007 QR logic.

## Product Principles
1. **Unbreakable Offline Core**: QR generation and fiat conversion must work perfectly without an internet connection.
2. **Hardware-Tolerant UI**: Large touch targets, high contrast, and haptic feedback simulation to compensate for low-end 480p/720p touch screens.
3. **Immediate Clarity**: Merchant interactions must be unambiguous, avoiding crypto jargon in favor of standard POS paradigms.

## Accessibility & Inclusion
Strict requirement for high contrast and large tap targets to accommodate 480p/720p low-end Android touch screens.
