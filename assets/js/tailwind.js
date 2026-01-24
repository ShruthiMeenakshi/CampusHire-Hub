tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: {
                DEFAULT: '#2563eb',
                dark: '#1d4ed8',
                light: '#3b82f6',
              },
              secondary: {
                DEFAULT: '#10b981',
                dark: '#059669',
                light: '#34d399',
              },
              dark: {
                50: '#f8fafc',
                100: '#0f172a',
                200: '#1e293b',
                300: '#334155',
                400: '#475569',
              },
            },
            fontFamily: {
              inter: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
              'fade-in': 'fadeIn 0.5s ease-in-out',
              'slide-up': 'slideUp 0.3s ease-out',
              'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
              fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
              },
              slideUp: {
                '0%': { transform: 'translateY(10px)', opacity: '0' },
                '100%': { transform: 'translateY(0)', opacity: '1' },
              },
              float: {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-5px)' },
              },
            },
            backgroundImage: {
              'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
              'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
          },
        },
      }