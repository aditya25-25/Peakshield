/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        alpine: {
          950: '#070C16', // Deep mountain night
          900: '#0C1424', // Navy slate surface
          850: '#111B30', // Card surface
          800: '#18243E', // Card hover / border
          700: '#233354', // Border active
          600: '#384C72', // Slate muted
          500: '#5A719C', // Text muted
          400: '#8CA0C4', // Secondary text
          300: '#C2D0E8', // Light text
          200: '#E2EAF7', // Border light
          100: '#F0F4FC', // Surface light
          50: '#F8FAFD',  // Snow white
        },
        risk: {
          low: '#10B981',        // Emerald 500 (Safe)
          advisory: '#F59E0B',   // Amber 500 (Advisory)
          warning: '#F97316',    // Orange 500 (Warning)
          emergency: '#EF4444',  // Red 500 (Emergency)
          critical: '#DC2626',   // Red 600
        },
        shield: {
          blue: '#0284C7',
          cyan: '#06B6D4',
          ice: '#38BDF8',
          teal: '#0D9488',
          navy: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-emerald': '0 0 16px -4px rgba(16, 185, 129, 0.35)',
        'glow-amber': '0 0 16px -4px rgba(245, 158, 11, 0.35)',
        'glow-orange': '0 0 16px -4px rgba(249, 115, 22, 0.35)',
        'glow-red': '0 0 20px -4px rgba(239, 68, 68, 0.45)',
        'glow-cyan': '0 0 16px -4px rgba(56, 189, 248, 0.35)',
        'card-subtle': '0 2px 8px -2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'card-elevated': '0 8px 24px -4px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
}
