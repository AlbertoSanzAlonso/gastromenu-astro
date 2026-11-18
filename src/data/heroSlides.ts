export interface HeroSlide {
  id: string
  image: string
  alt: string
  label: string
  title: string
  quote: string
  fit?: 'cover' | 'contain'
}

export const coverSlide: HeroSlide = {
  id: 'actual',
  image: '/images/hero-ref-01.webp',
  alt: 'Imagen de portada de GastroMenu Premium',
  label: 'Alta calidad en imagen gastronómica',
  title: 'La excelencia\ncomo destino',
  quote: 'A veces una primera impresión es la que queda para siempre…',
  fit: 'cover',
}

export const mockHeroSlides: HeroSlide[] = [
  {
    id: 'the-view',
    image: '/images/hero/01-the-view.webp',
    alt: 'Carta The View en azul, con el sol en oro y cantoneras doradas',
    label: 'Restaurant & Cocktail Bar',
    title: 'El nombre\nen oro',
    quote: 'Un sol dorado y cantoneras de oro para una carta que abre la mesa.',
    fit: 'contain',
  },
  {
    id: 'amaretto',
    image: '/images/hero/02-amaretto.webp',
    alt: 'Carta de cócteles Amaretto en piel marrón, con copa y marco dorado',
    label: 'Cartas de cócteles',
    title: 'La copa\nantes del brindis',
    quote: 'Piel, marco dorado y el nombre del cóctel, pensados para la barra.',
    fit: 'contain',
  },
  {
    id: 'cervantes',
    image: '/images/hero/04-cervantes.webp',
    alt: 'Carta de vinos Cervantes en piel negra, con cantoneras y tornillos de oro',
    label: 'Cartas de vino',
    title: 'La piel\nque recibe',
    quote: 'Tornillos vistos y cantoneras de oro para una carta que se recuerda en la mano.',
    fit: 'contain',
  },
]

export function buildHeroSlides(localeSlides: { alt: string; label: string; title: string; quote: string }[]) {
  const extras = mockHeroSlides.map((slide, index) => ({
    ...slide,
    ...(localeSlides[index] ?? {}),
  }))
  return [coverSlide, ...extras]
}

export function slideOffset(position: number, current: number, total: number) {
  if (total <= 1) return 0
  let diff = position - current
  const half = total / 2
  if (diff > half) diff -= total
  if (diff < -half) diff += total
  return diff
}
