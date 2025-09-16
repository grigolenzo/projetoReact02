/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'var(--color-bg)',
        'fg': 'var(--color-fg)',
        'fg-strong': 'var(--color-fg-strong)',
        'surface': 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        'surface-3': 'var(--color-surface-3)',
        'border': 'var(--color-border)',
        'accent': 'var(--color-accent)',
        'star': 'var(--color-star)',
        'skeleton': 'var(--color-skeleton)',
        'skeleton-highlight': 'var(--color-skeleton-highlight)',
      },
      boxShadow: {
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
      },
      keyframes: {
        shine: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      },
      animation: {
        shine: 'shine 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}