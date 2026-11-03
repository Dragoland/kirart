// Fuente única de las secciones. Sin imports: la usan el sitio Y las Functions del servidor.
// Para añadir una sección nueva (p. ej. Concept art) basta con agregar una línea aquí.
export const CATEGORIES = [
  { key: 'personajes', label: 'Diseño de personajes', desc: 'Héroes, criaturas y villanos con alma propia: hojas de personaje, expresiones y vistas de giro.' },
  { key: 'ilustracion', label: 'Ilustración', desc: 'Piezas completas con atmósfera, color y una historia dentro.' },
  { key: 'animacion', label: 'Animación', desc: 'Dibujos en movimiento: loops, cortos y pruebas de animación 2D.' },
  { key: 'storyboard', label: 'Storyboard', desc: 'La escena planificada plano a plano: encuadre, ritmo y narrativa.' },
  { key: 'adoptables', label: 'Adoptables', desc: 'Diseños únicos que esperan un nuevo dueño.' },
  { key: 'editorial', label: 'Ilustración editorial', desc: 'Imágenes para portadas, revistas, libros y artículos.' },
  { key: 'comics', label: 'Cómics', desc: 'Páginas, tiras y relatos secuenciales.' },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]['key'];
export const CATEGORY_KEYS: string[] = CATEGORIES.map((c) => c.key);
export const categoryLabel = (key: string) => CATEGORIES.find((c) => c.key === key)?.label ?? key;
