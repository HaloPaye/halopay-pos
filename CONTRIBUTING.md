# Contributing to HaloPay Merchant POS

Thank you for your interest in contributing to HaloPay POS! We welcome contributions from developers of all skill levels.

---

## Code of Conduct

Please maintain a respectful, inclusive, and professional environment across all issue discussions, pull requests, and code reviews.

---

## Branching Strategy & Workflow

1. Fork the repository and clone your fork locally.
2. Create a feature branch off `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. Run local unit tests and lint checks before committing:
   ```bash
   npm test
   npm run lint
   ```
4. Commit your changes using **Conventional Commits** format (see specification below).
5. Push to your fork and submit a Pull Request to `main`.

---

## Pull Request Rules

* All PRs must target the `main` branch.
* Ensure CI checks (linting, typescript compilation, and tests) pass before requesting a review.
* Include a descriptive title and reference any related issues (e.g., `Fixes #123`).
* Keep PRs focused on a single feature or bug fix to expedite the review process.

---

## Conventional Commits Specification

All commit messages MUST adhere to the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short description>
```

### Allowed Types

* `feat`: A new feature added to the POS terminal
* `fix`: A bug fix
* `test`: Adding or refactoring unit tests
* `docs`: Documentation updates
* `style`: Styling or layout adjustments without logic changes
* `refactor`: Code restructuring without breaking existing functionality
* `chore`: Build process, dependencies, or maintenance tasks

### Examples

* `feat(pos): add offline SEP-0007 QR code generator`
* `test(pos): add unit tests for cached rate staleness logic`
* `docs(pos): update README with PWA installation guide`
* `fix(pos): resolve localStorage fallback on SSR render`

---

## Testing Guidelines

* Unit tests reside in the `tests/` directory.
* Run tests with `npm test`.
* Ensure new features include corresponding Jest test coverage.
