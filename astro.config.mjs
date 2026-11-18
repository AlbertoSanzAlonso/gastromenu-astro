// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  site: 'https://www.gastromenupremium.com',
  trailingSlash: 'never',
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Cinzel',
      cssVariable: '--font-cinzel',
      weights: [400, 600],
      styles: ['normal'],
      display: 'swap',
      fallbacks: ['Times New Roman', 'Times', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Playfair Display',
      cssVariable: '--font-playfair',
      // Google ya no sirve Playfair 300; 400 es la cara ligera real disponible.
      weights: [400, 500],
      styles: ['normal', 'italic'],
      display: 'swap',
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Montserrat',
      cssVariable: '--font-montserrat',
      weights: [400, 500],
      styles: ['normal'],
      // optional: evita CLS tardío en labels si la fuente no llega a tiempo
      display: 'optional',
      fallbacks: ['system-ui', 'Segoe UI', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Pinyon Script',
      cssVariable: '--font-pinyon',
      weights: [400],
      styles: ['normal'],
      display: 'optional',
      fallbacks: ['Segoe Script', 'Apple Chancery', 'cursive'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(root, 'src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8787',
          changeOrigin: true,
        },
      },
    },
  },
})
