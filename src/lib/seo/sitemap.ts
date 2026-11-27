import fs from 'node:fs'
import path from 'node:path'
import { localePath, LOCALES } from '@/i18n/locale'
import { pageUrl, publicPages, SITE_URL, type PublicPage } from '@/lib/seo/site'

const IMAGE_EXT = /\.(webp|png|jpe?g|gif)$/i

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function imageTitle(filename: string) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+-/, '')
    .replaceAll('-', ' ')
}

function imagesFor(root: string, dirs: readonly string[]) {
  const images: { loc: string; title: string }[] = []

  for (const dir of dirs) {
    const absolute = path.join(root, 'public', dir)
    if (!fs.existsSync(absolute)) continue

    for (const name of fs.readdirSync(absolute).sort()) {
      if (!IMAGE_EXT.test(name)) continue
      // Copia responsive de la misma foto. No es otra imagen de la página.
      if (/-(800|1200)\.webp$/i.test(name)) continue
      images.push({
        loc: `${SITE_URL}/${dir}/${name}`,
        title: imageTitle(name),
      })
    }
  }

  return images
}

function lastmodFor(root: string, page: PublicPage) {
  let latest = 0

  for (const dir of page.imageDirs) {
    const absolute = path.join(root, 'public', dir)
    if (!fs.existsSync(absolute)) continue
    for (const name of fs.readdirSync(absolute)) {
      if (!IMAGE_EXT.test(name)) continue
      const mtime = fs.statSync(path.join(absolute, name)).mtimeMs
      if (mtime > latest) latest = mtime
    }
  }

  if (!latest) latest = Date.now()
  return new Date(latest).toISOString().slice(0, 10)
}

export function renderSitemap(root: string) {
  const urls = LOCALES.flatMap((locale) =>
    publicPages.map((page) => {
      // Imágenes solo en ES para no duplicar señales; EN hereda el mismo lastmod.
      const images =
        locale === 'es'
          ? imagesFor(root, page.imageDirs)
              .map(
                (image) => `    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
    </image:image>`,
              )
              .join('\n')
          : ''

      return `  <url>
    <loc>${pageUrl(localePath(locale, page.path))}</loc>
    <lastmod>${lastmodFor(root, page)}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${images ? `${images}\n` : ''}  </url>`
    }),
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`
}

export function writeSitemap(root: string, outDir?: string) {
  const xml = renderSitemap(root)
  fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml)
  if (outDir) fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml)
  return xml
}
