export interface HeroSlide {
  id: string
  image: string
  alt: string
  label: string
  title: string
  quote: string
  fit?: 'cover' | 'contain'
  width?: number
  height?: number
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
    id: 'amaretto',
    image: '/images/hero/01-amaretto.webp',
    alt: 'Carta de cócteles Amaretto en piel marrón, con copa y cantoneras doradas',
    label: 'Cartas de cócteles',
    title: 'La copa\nantes del brindis',
    quote: 'Piel, marco dorado y el nombre del cóctel, pensados para la barra.',
    fit: 'contain',
    width: 1122,
    height: 1402,
  },
  {
    id: 'la-favorita',
    image: '/images/hero/02-la-favorita.webp',
    alt: 'Carta La Favorita en blanco, con lomo rojo, horno y el nombre de la pizzería',
    label: 'Pizzería',
    title: 'El horno\nen la portada',
    quote: 'Lomo rojo, el horno y el nombre del local, pensados para la mesa.',
    fit: 'contain',
    width: 1448,
    height: 1700,
  },
  {
    id: 'karnivoro',
    image: '/images/hero/03-karnivoro.webp',
    alt: 'Carta Karnívoro en piel negra, con el nombre en oro y cantoneras doradas',
    label: 'Steak house',
    title: 'El nombre\ngrabado',
    quote: 'Piel negra, cantoneras de oro y el nombre del local, grabados para la mesa.',
    fit: 'contain',
    width: 1448,
    height: 1700,
  },
  {
    id: 'inaki',
    image: '/images/hero/04-inaki.webp',
    alt: 'Carta Asador Iñaki en turquesa, con ilustración de mercado y lomo a juego',
    label: 'Asadores',
    title: 'El mercado\nen la tapa',
    quote: 'Ilustración, lomo turquesa y el nombre del asador, pensados para la mesa.',
    fit: 'contain',
    width: 1448,
    height: 1700,
  },
  {
    id: 'rincon-playa',
    image: '/images/hero/05-rincon-playa.webp',
    alt: 'Carta Rincón de la Playa en blanco y azul, con pez, lomo azul y cantoneras plateadas',
    label: 'Chiringuitos',
    title: 'El pez\nque abre',
    quote: 'Lomo azul, cantoneras de plata y el nombre del restaurante, pensados para la mesa.',
    fit: 'contain',
    width: 1448,
    height: 1700,
  },
]

/** Diapositivas ocultas del carrusel hasta nuevo aviso. */
export const hiddenHeroSlideIds = new Set<string>()

export function buildHeroSlides(
  localeSlides: { id: string; alt: string; label: string; title: string; quote: string }[],
) {
  const byId = new Map(localeSlides.map((slide) => [slide.id, slide]))
  const extras = mockHeroSlides
    .filter((slide) => !hiddenHeroSlideIds.has(slide.id))
    .map((slide) => ({
      ...slide,
      ...(byId.get(slide.id) ?? {}),
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
