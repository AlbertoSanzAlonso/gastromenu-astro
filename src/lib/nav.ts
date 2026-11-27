export const navLinks = [
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/cartas', label: 'Cartas' },
  { href: '/atriles', label: 'Atriles' },
  { href: '/manteles', label: 'Manteles' },
  { href: '/exclusividades', label: 'Exclusividades' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
] as const

export const collections = [
  {
    href: '/cartas',
    label: 'Cartas',
    image: '/images/web/inicio/01-cartas-menu-premium-1620x945.webp',
    srcSet:
      '/images/web/inicio/01-cartas-menu-premium-800.webp 800w, /images/web/inicio/01-cartas-menu-premium-1200.webp 1200w, /images/web/inicio/01-cartas-menu-premium-1620x945.webp 1620w',
  },
  {
    href: '/atriles',
    label: 'Atriles',
    image: '/images/web/inicio/02-atriles-portamenu-premium-1620x945.webp',
    srcSet: undefined,
  },
  {
    href: '/manteles',
    label: 'Manteles',
    image: '/images/web/inicio/03-manteles-premium-1620x945.webp',
    srcSet:
      '/images/web/inicio/03-manteles-premium-800.webp 800w, /images/web/inicio/03-manteles-premium-1200.webp 1200w, /images/web/inicio/03-manteles-premium-1620x945.webp 1620w',
  },
  {
    href: '/exclusividades',
    label: 'Exclusividades',
    image: '/images/web/inicio/04-exclusividades-premium-1620x945.webp',
    srcSet:
      '/images/web/inicio/04-exclusividades-premium-800.webp 800w, /images/web/inicio/04-exclusividades-premium-1200.webp 1200w, /images/web/inicio/04-exclusividades-premium-1620x945.webp 1620w',
  },
] as const
