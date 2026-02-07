/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2DD4BF', // Teal-400: Vibrant but soft teal
                    dark: '#14B8A6',    // Teal-500: Readable text/icons
                    light: '#F0FDFA',   // Teal-50: Backgrounds
                    50: '#F0FDFA',
                    100: '#CCFBF1',
                    200: '#99F6E4',
                    300: '#5EEAD4',
                    400: '#2DD4BF',
                    500: '#14B8A6',
                    600: '#0D9488',
                    700: '#0F766E',
                },
                secondary: {
                    DEFAULT: '#6366F1', // Indigo-500: Modern purple-blue
                    dark: '#4F46E5',    // Indigo-600
                    light: '#EEF2FF',   // Indigo-50
                    50: '#EEF2FF',
                },
                background: 'transparent', // Keep transparent for global gradient
                surface: '#FFFFFF',        // Pure white cards
                text: {
                    primary: '#334155',   // Slate-700: softer than black
                    secondary: '#64748B', // Slate-500: readable subtext
                    muted: '#94A3B8',     // Slate-400
                },
                anxiety: {
                    low: '#6EE7B7',      // Emerald-300
                    moderate: '#FCD34D', // Amber-300
                    high: '#FCA5A5',     // Red-300
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Outfit', 'Inter', 'sans-serif'],
            },
            borderRadius: {
                'xl': '1.25rem', // 20px
                '2xl': '1.75rem', // 28px - softer cards
                '3xl': '2.5rem',  // 40px - very round
                'full': '9999px',
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
                'card': '0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)', // Clean, crisp border-like shadow
                'dashboard': '0 0 0 1px rgba(0,0,0,0.03), 0 8px 30px rgba(0,0,0,0.04)', // Floating dashboard elements
                'glow': '0 0 20px rgba(45, 212, 191, 0.3)', // Primary teal glow
                'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.3)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'shimmer': 'shimmer 3s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                }
            }
        },
    },
    plugins: [],
}
