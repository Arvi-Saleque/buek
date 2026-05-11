# BUEK University Website

Next.js university website with a protected admin panel, MongoDB content storage, and Cloudinary image uploads.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- MongoDB
- Cloudinary
- JWT/cookie based single-admin login

## Local Setup

```bash
npm install
npm run dev
```

Open:

- Site: `http://127.0.0.1:3000`
- Admin: `http://127.0.0.1:3000/admin`

## Environment Variables

Copy `.env.example` to `.env.local` and fill the real values:

```env
MONGODB_URI=
MONGODB_DB=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
SESSION_SECRET=
NEXT_PUBLIC_SITE_URL=
```

Never commit `.env.local` or real credentials.

## Security (Vercel Deployment)

- Keep all secrets in Vercel Environment Variables (Production/Preview/Development), never in git.
- Use strong unique values for `ADMIN_PASSWORD` and `SESSION_SECRET`, and rotate them if exposure is suspected.
- Restrict GitHub ↔ Vercel integration to only required repositories and enforce 2FA on GitHub/Vercel accounts.
- Enable GitHub security features (secret scanning, Dependabot alerts/security updates, branch protection on `main`).
- The app sets global security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and CSP) in `next.config.ts`.
- Admin login has basic brute-force protection (per-IP, in-memory lockout). Because this is instance-local memory, use robust centralized auth/rate limiting (for example Redis/Vercel KV + managed auth) for stronger production guarantees.
- `.env.example` is placeholder-only and should remain credential-free.

## Commands

```bash
npm run dev
npm run build
npm run lint
```
