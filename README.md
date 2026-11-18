# GastroMenu Premium (Astro)

Clon hermano del sitio Vite+React en `../gastromenu`, orientado a **SSG** para SEO: el HTML de cada ruta incluye el contenido (no solo meta tags).

## Requisitos

- Node.js **≥ 22.23.4** (`nvm use` lee `.nvmrc`)

## Arranque

```bash
cd ../gastromenu-astro
nvm use
npm install
npm run dev
```

Build estático:

```bash
npm run build && npm run preview
```

## Qué incluye (fase 1)

- Home, dossier (`/nosotros`, `/cartas`, `/atriles`, `/manteles`, `/exclusividades`)
- Blog índice + artículos
- Contacto
- SEO head + JSON-LD (misma fuente que el proyecto original: `src/lib/seo/site.ts`)
- Contenido ES del dossier copiado desde el original
- `public/images` enlazado por **symlink** al proyecto original (no duplica ~50 MB)

## Qué no incluye aún

- Admin / Supabase
- i18n EN + `hreflang`
- Formularios de contacto vía Worker
- Paridad visual completa (hero carrusel, animaciones, legales)

## Relación con el original

| Original (`gastromenu`) | Este clon |
| --- | --- |
| Vite SPA + shells HTML | Astro SSG (HTML con body) |
| Producción actual | Preview / experimento SEO |
| `public/images` | Symlink → original |

Cuando el clon esté listo, el cutover de producción sería apuntar el deploy a este proyecto (o fusionar lo necesario).
