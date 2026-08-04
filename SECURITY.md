# Security Policy 🔒

## Supported Versions

Only the latest release on the `main` branch is actively supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

---

## 🛡️ Reporting Vulnerabilities

If you discover a potential security vulnerability within HaloPay Merchant POS, please **DO NOT** create a public GitHub issue.

Instead, please report security vulnerabilities directly to our security response team at **security@halopay.io**.

### Please Include:

* A detailed description of the vulnerability.
* Steps to reproduce the issue (including sample payloads or screenshots).
* Potential impact on merchant devices or customer funds.

We aim to acknowledge receipt of all security reports within 24 hours and issue a patch or advisory within 7 business days.

---

## 🔑 Key Management Guidelines

* HaloPay POS **NEVER** stores merchant secret keys (`S...`) or private keys.
* Only public Stellar addresses (`G...`) are stored in client LocalStorage.
* All generated QR payment URIs follow standard SEP-0007 specifications without requiring sensitive parameters.
