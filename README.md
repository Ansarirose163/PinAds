# BadPin Ads Verification

This repo contains static files for ads verification flow.

- `verify.html` shows ads/loading for 15 seconds and redirects to success page.
- `success.html` confirms verification.
- `status.json` controls whether the Android dialog should dismiss (`verified: true`) or keep showing (`verified: false`).

Deploy this repo to **Netlify** or any static hosting provider.

Update `status.json` manually or via GitHub to control verification state.
