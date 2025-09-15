/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Cores personalizadas para o tema Poetry Creator com paleta dourada
      colors: {
        poetry: {
          // Cores douradas principais
          golden: {
            50: '#FEF7ED',
            100: '#FEF0DB',
            200: '#FCDBB7',
            300: '#F9C088',
            400: '#F4A261',
            500: '#D4A574', // golden-primary
            600: '#B8860B', // golden-secondary
            700: '#8B4513', // brown-warm
            800: '#A0522D', // brown-light
            900: '#654321'
          },
          // Cores de fundo
          dark: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
            950: '#020617'
          },
          // Background gradientes
          bg: {
            start: '#1a1a2e',
            middle: '#16213e',
            end: '#0f3460'
          },
          // Cores complementares
          accent: '#F4E4BC',
          cream: '#F5E6D3',
          beige: '#E6D3B7',
          amber: '#DEB887'
        }
      },

      // Fontes personalizadas
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        lato: ['Lato', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },

      // Animações personalizadas
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'golden-glow': 'goldenGlow 2s ease-in-out infinite'
      },

      // Keyframes para animações
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        goldenGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(212, 165, 116, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(212, 165, 116, 0.5)'
          }
        }
      },

      // Sombras personalizadas
      boxShadow: {
        golden:
          'inset 2px 2px 4px 0px rgba(255, 255, 255, 0.2), 0 8px 20px 0px rgba(139, 69, 19, 0.3), 0 4px 10px 0px rgba(139, 69, 19, 0.2)',
        'golden-hover':
          'inset 2px 2px 4px 0px rgba(255, 255, 255, 0.3), 0 12px 25px 0px rgba(139, 69, 19, 0.4), 0 6px 15px 0px rgba(139, 69, 19, 0.3)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'poetry-glow': '0 0 20px rgba(212, 165, 116, 0.3)',
        'inner-shadow': 'inset 0 2px 10px rgba(0, 0, 0, 0.2)'
      },

      // Backdrop blur personalizado
      backdropBlur: {
        xs: '2px',
        glass: '16px'
      },

      // Background gradients
      backgroundImage: {
        'poetry-gradient':
          'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        'golden-gradient':
          'linear-gradient(135deg, var(--golden-primary) 0%, var(--golden-secondary) 100%)',
        'golden-hover':
          'linear-gradient(135deg, var(--golden-secondary) 0%, var(--brown-warm) 100%)'
      },

      // Configurações de responsividade
      screens: {
        xs: '475px',
        '3xl': '1600px'
      }
    }
  },
  plugins: []
}
