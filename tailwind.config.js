/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // H for Her Brand Colors
        'blush-pink': '#FCECEC',
        'champagne-beige': '#E4BFA3',
        'jet-black': '#1B1B1B',
        'soft-white': '#FFFFFF',
        'warm-gray': '#A89F9F',
        'dusty-rose': '#D78C8C',
        
        // Semantic color mappings
        primary: '#E4BFA3', // champagne-beige
        secondary: '#D78C8C', // dusty-rose
        accent: '#FCECEC', // blush-pink
        muted: '#A89F9F', // warm-gray
        background: '#FFFFFF',
        foreground: '#1B1B1B',
        
        // Component-specific colors
        border: '#A89F9F',
        input: '#FFFFFF',
        ring: '#E4BFA3',
        
        // State colors
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#A89F9F',
          foreground: '#1B1B1B',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#1B1B1B',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1B1B1B',
        },
      },
      fontFamily: {
        // H for Her Brand Fonts
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'dancing': ['Dancing Script', 'cursive'],
        
        // Default mappings
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FCECEC, #E4BFA3)',
        'gradient-secondary': 'linear-gradient(90deg, #E4BFA3, #D78C8C)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
