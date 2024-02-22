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
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    },
    colors: {
      primary: '#0a092d',
      secondary: '#4255ff',
      secondaryHover: '#423ed8',
      bottomHeader: '#282e3e', // Color of the border bottom of the
      yellow: '#ffcd1f',
      yellowHover: '#ffdc62',
      grayLight: '#f6f7fb',
      black: '#282e3e'
    }
  }
}
