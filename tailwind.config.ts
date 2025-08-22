import type {Config} from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Montserrat', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'disperse-and-gather': {
           '0%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'translateX(calc(cos(var(--angle)) * 60px)) translateY(calc(sin(var(--angle)) * 60px)) scale(0.5) rotate(calc(var(--angle)))',
            opacity: '0.5',
          },
          '100%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '1',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'disperse-and-gather': 'disperse-and-gather 5s ease-in-out',
      },
    },
    textStrokeWidth: {
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
    },
    textStrokeColor: (theme) => theme('colors'),
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addUtilities, theme, e }) {
      const values = theme('textStrokeWidth');
      if (values) {
        addUtilities(
          Object.entries(values).map(([key, value]) => ({
            [`.${e(`text-stroke-${key}`)}`]: {
              '-webkit-text-stroke-width': value,
            },
          }))
        );
      }
      const colors = theme('textStrokeColor');
      if (colors) {
        const newUtilities = {};
        const flattenColorPalette = (colors: any, prefix = ''): any => {
          return Object.keys(colors).reduce((acc, color) => {
            const value = colors[color];
            const newPrefix = prefix ? `${prefix}-${color}` : color;
            if (typeof value === 'string') {
                if (color === 'DEFAULT') {
                    acc[`.${e(`text-stroke-${prefix}`)}`] = { '-webkit-text-stroke-color': value };
                } else {
                    acc[`.${e(`text-stroke-${newPrefix}`)}`] = { '-webkit-text-stroke-color': value };
                }
            } else if (typeof value === 'object' && value !== null) {
              Object.assign(acc, flattenColorPalette(value, newPrefix));
            }
            return acc;
          }, {});
        };

        addUtilities(flattenColorPalette(colors));
      }
    }),
  ],
} satisfies Config;
