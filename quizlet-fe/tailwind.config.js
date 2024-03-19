const { nextui } = require('@nextui-org/react')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'login-thumb': "url('/images/auth/login-wal.png')"
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        dark: {
          colors: {
            primary: '#0a092d',
            secondary: '#4255ff',
            secondaryHover: '#423ed8',
            bottomHeader: '#282e3e', // Color of the border bottom of the
            yellow: '#ffcd1f',
            yellowHover: '#ffdc62',
            grayLight: '#f6f7fb',
            black: '#282e3e',
            white: '#ffffff',
            gray: '#d9dde8',
            'gray-600': '#6a748e',
            red: '#D90202',
            'gray-700': '#586380',
            'gray-main': '#2e3856',
            'yellow-active': '#ffdc62'
          }
        }
      }
    })
  ]
}
