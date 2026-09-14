# Contributing to HaloPay Merchant POS

Thank you for your interest in contributing to **HaloPay Merchant POS**! This repository provides an offline-first Progressive Web Application (PWA) that allows merchants in emerging markets and crisis zones to accept digital payments over the Stellar network without requiring constant cellular connectivity.

To maintain architectural integrity, code quality, and smooth collaboration, please adhere to our contribution guidelines below.

---

## 🚀 How to Contribute

### 1. Select an Open Issue
* Browse issues labeled `status: ready-for-dev`, `good first issue`, or `help wanted`.
* Review the issue's **Background & Context**, **Technical Requirements**, and **Acceptance Criteria**.

### 2. Request Assignment Before Starting Work
* **Please do not begin coding or submit unsolicited PRs without being assigned to an issue.** This prevents multiple contributors from duplicating effort on the same feature or bug.
* Comment on the issue detailing your proposed technical approach. A maintainer will triage and assign the issue to you.

### 3. Branching Strategy
* Create your feature branch off `main`:
  ```bash
  git checkout -b feat/issue-<issue_number>-<short-description>
  ```
  *Examples:*
  * `feat/issue-19-qr-camera-scanner`
  * `fix/issue-28-localstorage-ssr-hydration`
  * `test/issue-34-staleness-edge-cases`

### 4. Pull Request Standards
* **Title Format:** PR titles MUST reference the issue number:
  ```text
  [#<issue_number>] <Imperative description of changes>
  ```
  *Example:* `[#19] Implement QR code camera scanner component for merchant payments`
* **Issue Linking:** In your PR description, explicitly link the issue:
  ```text
  Closes #<issue_number>
  ```
* **Atomicity:** Keep each PR focused strictly on the assigned issue. Avoid mixing unrelated UI adjustments or refactors.

---

## 🛠️ Local Development & Quality Gates

All pull requests trigger our continuous integration (CI) workflow. Before submitting a PR, ensure all checks pass locally:

### 1. Code Quality & Linting
```bash
npm run lint
```

### 2. TypeScript Typechecking & Build
```bash
npm run build
```

### 3. Running Unit Tests
```bash
npm test
```

---

## 🏛️ Repository Architecture

* `src/app/`: Next.js 14 App Router layout, pages, and global styling.
* `src/components/`: Modular React components (keypad, QR generator, network monitor, staleness banners).
* `src/lib/`: Core domain logic (SEP-0007 URI formatting, rate calculation, localStorage wrappers).
* `public/`: Service worker (`sw.js`) and PWA manifest (`manifest.json`) for offline caching.
* `tests/`: Jest and React Testing Library suites validating UI components and offline logic.

---

## 📜 Code of Conduct & Licensing

* **Respect & Professionalism:** Treat all community members, reviewers, and maintainers with courtesy.
* **Licensing:** All contributions to this repository are licensed under the **MIT License**. By submitting a pull request, you agree that your work will be licensed under these terms.

