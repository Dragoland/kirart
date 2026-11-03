/** @type {import('tailwindcss').Config} */
const v = (name) => `hsl(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Grenze Gotisch', 'serif'],      // títulos medianos y nombres de obra
        gothic: ['UnifrakturCook', 'serif'],       // blackletter: títulos grandes
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Paleta exacta de la imagen
        cotton: '#EDEBDD',
        cherry: '#810100',
        maroon: '#630000',
        noir: '#1B1717',
        // Tokens del tema (cambian entre oscuro y claro)
        background: v('background'),
        foreground: v('foreground'),
        card: v('card'),
        'card-foreground': v('card-foreground'),
        primary: v('primary'),
        'primary-foreground': v('primary-foreground'),
        secondary: v('secondary'),
        'secondary-foreground': v('secondary-foreground'),
        muted: v('muted'),
        'muted-foreground': v('muted-foreground'),
        accent: v('accent'),
        'accent-foreground': v('accent-foreground'),
        border: v('border'),
        input: v('input'),
        ring: v('ring'),
        destructive: v('destructive'),
        'destructive-foreground': v('destructive-foreground'),
        popover: v('popover'),
        'popover-foreground': v('popover-foreground'),
        blood: v('blood'), // cherry aclarado: solo para texto/acentos sobre fondo oscuro
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 3px)',
      },
    },
  },
  plugins: [],
};
