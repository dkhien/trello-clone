/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'trello-blue': '#0055D1',
        'gradient-dark-blue': '#1371E0',
        'gradient-light-blue': '#34B0C4',
        'light-column-bg' : '#F1F2F4'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
