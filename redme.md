# University Website + Admin Panel

Next.js, Tailwind CSS, MongoDB, and Cloudinary implementation for a university website with a protected structured admin panel.

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

Admin panel: `http://127.0.0.1:3000/admin`

In development, if admin credentials are not set in `.env.local`, the fallback login is:

```txt
admin@example.com
admin123
```

## Environment

Copy `.env.example` to `.env.local` and fill:

```env

```

Without MongoDB and Cloudinary credentials, public pages use placeholder content and uploads/saves will not persist.
