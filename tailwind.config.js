/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F8F8F6',
        surface: '#FFFFFF',
        charcoal: '#171717',
        muted: '#737373',
        subtle: '#A3A3A3',
        line: '#E7E5E4',
        accent: {
          DEFAULT: '#6D45D9',
          hover: '#5B35C8',
          subtle: '#F5F3FF',
          border: '#DDD6FE',
          dark: '#4C28A8',
        },
        success: {
          DEFAULT: '#16866A',
          subtle: '#F0FDF4',
          border: '#BBF7D0',
        },
        warning: {
          DEFAULT: '#B7791F',
          subtle: '#FFFBEB',
          border: '#FDE68A',
        },
        danger: {
          DEFAULT: '#C2414B',
          subtle: '#FEF2F2',
          border: '#FECACA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'dropdown': '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
        'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '14px',
      }
    },
  },
  plugins: [],
}
