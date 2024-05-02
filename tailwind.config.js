import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';
import tailwindAnimate from 'tailwindcss-animate';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-dark-mode="true"]'],
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--inputColor)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primaryForeground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondaryForeground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructiveForeground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--mutedForeground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accentForeground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popoverForeground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--cardForeground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      screens: {
        sm: '32em',
        md: '48em',
        lg: '64em',
        xl: '80em',
        '2xl': '96em',
        'sm-max': {max: '48em'},
        'md-max': {max: '64em'},
        'sm-only': {min: '32em', max: '48em'},
        'md-only': {min: '48em', max: '64em'},
        'lg-only': {min: '64em', max: '80em'},
        'xl-only': {min: '80em', max: '96em'},
        '2xl-only': {min: '96em'},
      },
      spacing: {
        nav: 'var(--height-nav)',
        screen: 'var(--screen-height, 100vh)',
        gutter: 'var(--gutter)',
      },
      height: {
        screen: 'var(--screen-height, 100vh)',
        'screen-no-nav':
          'calc(var(--screen-height, 100vh) - var(--height-nav))',
        'screen-dynamic': 'var(--screen-height-dynamic, 100vh)',
      },
      width: {
        mobileGallery: 'calc(100vw - 3rem)',
      },
      fontFamily: {
        sans: [
          'SyndicatGrotesk',
          'Helvetica Neue',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        serif: ['ui-serif'],
      },
      fontSize: {
        oversize: ['var(--font-size-oversize)', '1.25'],
        display: ['var(--font-size-display)', '1.1'],
        heading: ['var(--font-size-heading)', '1.25'],
        lead: ['var(--font-size-lead)', '1.333'],
        mid: ['var(--font-size-mid)', '1.5'],
        copy: ['var(--font-size-copy)', '1.5'],
        fine: ['var(--font-size-fine)', '1.333'],
        sm: ['0.875rem', '1.2rem'],
      },
      maxWidth: {
        'prose-narrow': '45ch',
        'prose-wide': '80ch',
        portrait: '370px',
      },
      boxShadow: {
        border: 'inset 0px 0px 0px 1px rgb(var(--color-primary) / 0.08)',
        darkHeader: 'inset 0px -1px 0px 0px rgba(21, 21, 21, 0.4)',
        lightHeader: 'inset 0px -1px 0px 0px rgba(21, 21, 21, 0.05)',
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: ({theme}) => ({
        default: {
          css: {
            '--tw-prose-body': theme('colors.foreground[800]'),
            '--tw-prose-headings': theme('colors.foreground[900]'),
            '--tw-prose-lead': theme('colors.foreground[700]'),
            '--tw-prose-links': theme('colors.foreground[900]'),
            '--tw-prose-bold': theme('colors.foreground[900]'),
            '--tw-prose-counters': theme('colors.foreground[600]'),
            '--tw-prose-bullets': theme('colors.foreground[400]'),
            '--tw-prose-hr': theme('colors.foreground[300]'),
            '--tw-prose-quotes': theme('colors.foreground[900]'),
            '--tw-prose-quote-borders': theme('colors.foreground[300]'),
            '--tw-prose-captions': theme('colors.foreground[700]'),
            '--tw-prose-code': theme('colors.foreground[900]'),
            '--tw-prose-pre-code': theme('colors.foreground[100]'),
            '--tw-prose-pre-bg': theme('colors.foreground[900]'),
            '--tw-prose-th-borders': theme('colors.foreground[300]'),
            '--tw-prose-td-borders': theme('colors.foreground[200]'),
            '--tw-prose-invert-body': theme('colors.background[200]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.background[300]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.background[400]'),
            '--tw-prose-invert-bullets': theme('colors.background[600]'),
            '--tw-prose-invert-hr': theme('colors.background[700]'),
            '--tw-prose-invert-quotes': theme('colors.background[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.background[700]'),
            '--tw-prose-invert-captions': theme('colors.background[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.background[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.background[600]'),
            '--tw-prose-invert-td-borders': theme('colors.background[700]'),
          },
        },
      }),
    },
  },

  plugins: [formsPlugin, typographyPlugin, tailwindAnimate],
};
