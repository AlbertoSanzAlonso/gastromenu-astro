# GastroMenu Premium (Astro)

Clon hermano del sitio Vite+React en `../gastromenu`, orientado a **SSG** para SEO.

## Requisitos

- Node.js **≥ 22.23.4** (`nvm use` lee `.nvmrc`)

## Arranque

```bash
cd ../gastromenu-astro
nvm use
npm install
cp .env.example .env   # opcional
npm run dev
```

Build:

```bash
npm run build && npm run preview
```

Formulario de contacto: en local apunta a `/api/contact` (proxy Vite → wrangler `:8787`). En producción, define `PUBLIC_CONTENT_API` o sirve el worker en el mismo origen.

## Incluye (sin admin)

- Home completa (hero, colecciones, about, equipo, CTA)
- Dossier ES + EN (`/en/...`)
- Blog ES + EN
- Contacto con formulario + detalles
- Legales ES + EN + redirect `/condiciones`
- Cookies notice + WhatsApp / volver arriba
- SEO head, JSON-LD, `hreflang` es/en
- `public/images` via symlink al original

## No incluye

- Admin / Supabase backoffice
- Admin / CMS dinámico del hero (usa slides por defecto)
- Algunos microdetalles React del original (lightbox de dossier, etc.)
