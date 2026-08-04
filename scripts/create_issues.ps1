# HaloPay Merchant POS - GitHub Issue Creator Script (Drips Wave Format)
# Requirements: GitHub CLI (gh) logged in with repository scope

$ErrorActionPreference = "Stop"

Write-Host "🚀 Initializing Drips Wave GitHub Issue Creation for HaloPay POS..." -ForegroundColor Cyan

# Verify gh CLI is installed
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Error "GitHub CLI ('gh') is not installed or not in PATH. Please install gh CLI to create repository issues automatically."
    exit 1
}

$issues = @(
    @{
        Title = "[Drips Wave] [Trivial - 1 pt] Update PWA App Icons & Theme Metadata"
        Labels = "drips-wave,pos,trivial,documentation"
        Body = @"
## 🎯 Goal
Replace placeholder PWA icons with branded high-resolution HaloPay POS vector assets (192x192 & 512x512 PNGs).

## 📋 Acceptance Criteria
- [ ] Add `icon-192.png` and `icon-512.png` to `/public` directory.
- [ ] Verify manifest validation in Chrome DevTools Application tab.
- [ ] Confirm dark mode splash screen color match (`#0b0f17`).

**Point Estimate:** 1 Point (Trivial)
"@
    },
    @{
        Title = "[Drips Wave] [Medium - 3 pts] Implement IndexedDB Persistent Offline Payment Log"
        Labels = "drips-wave,pos,medium,enhancement"
        Body = @"
## 🎯 Goal
Upgrade POS LocalStorage transaction logging to IndexedDB to support unlimited offline transaction storage for high-volume merchants.

## 📋 Acceptance Criteria
- [ ] Implement `idb` wrapper for transaction records.
- [ ] Support export of daily sales log to CSV for merchant accounting.
- [ ] Retain real-time query performance with secondary indexes on timestamp & status.

**Point Estimate:** 3 Points (Medium)
"@
    },
    @{
        Title = "[Drips Wave] [High - 8 pts] Add Bluetooth Thermal Printer Driver Integration (ESC/POS)"
        Labels = "drips-wave,pos,high,feature"
        Body = @"
## 🎯 Goal
Integrate Web Bluetooth API to auto-print physical paper receipts on portable ESC/POS thermal receipt printers upon payment confirmation.

## 📋 Acceptance Criteria
- [ ] Implement Web Bluetooth device pairing modal for ESC/POS micro-printers.
- [ ] Format receipt layout with merchant header, SEP-0007 transaction hash, fiat amount, and Stellar Explorer QR code.
- [ ] Test offline printing reliability when device network is disconnected.

**Point Estimate:** 8 Points (High)
"@
    }
)

foreach ($issue in $issues) {
    Write-Host "Creating Issue: $($issue.Title)..." -ForegroundColor Yellow
    try {
        gh issue create --title $issue.Title --body $issue.Body --label $issue.Labels
        Write-Host "✅ Created: $($issue.Title)" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Failed to create issue via gh CLI (ensure gh auth is configured): $_" -ForegroundColor Red
    }
}

Write-Host "🎉 Drips Wave Issue Creation Script Completed!" -ForegroundColor Cyan
