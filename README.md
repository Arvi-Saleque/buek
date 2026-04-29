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

## Commands

```bash
npm run dev
npm run build
npm run lint
```
