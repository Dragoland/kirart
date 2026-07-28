import { Tool } from '@/types';

export const tools: Tool[] = [
  { abbr: 'Kr', name: 'Krita', desc: 'Pintura digital principal. Libre y potente.', tag: 'digital', tagColor: 'digital' },
  { abbr: 'Gi', name: 'GIMP', desc: 'Retoques, ajustes y manipulación.', tag: 'digital', tagColor: 'digital' },
  { abbr: 'In', name: 'Inkscape', desc: 'Vectores, logos y líneas limpias.', tag: 'digital', tagColor: 'digital' },
  { abbr: 'Bl', name: 'Blender', desc: '3D para referencias y escenas.', tag: '3d', tagColor: '3d' },
  { abbr: 'Ca', name: 'Canson', desc: 'Papel para bocetos tradicionales.', tag: 'tradicional', tagColor: 'trad' },
  { abbr: 'Pr', name: 'Prismacolor', desc: 'Lápices de colores profesionales.', tag: 'tradicional', tagColor: 'trad' },
  { abbr: 'XP', name: 'XP-Pen', desc: 'Tableta gráfica Artist 15.6 Pro.', tag: 'hardware', tagColor: 'hardware' },
  { abbr: 'Li', name: 'Linux Mint', desc: 'Sistema operativo del estudio.', tag: 'sistema', tagColor: 'system' },
];
