/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      jimmy: '#B9FFF2',
      hendrix: '#03CFAA',
      rod: '#FFD6C9',
      stewart: '#FF3D00',
      elvis: '#E6E6FF',
      presley: '#5855C7',
      amy: '#1F1F27',
      whinehouse: '#181621',
      janis: '#272552',
      joplin: '#000413',
      snow: '#F4F3FF',
      wolf: '#9B9B9B',
      onyx: '#3E3E3E',
      white: '#FFFFFF',
      black: '#000000',
    },
    extend: {
      backgroundImage: {
        'teaser-elvis':
          'radial-gradient(73.26% 81.37% at 23.09% 29.52%, rgba(143, 188, 255, 0.21) 0%, rgba(232, 232, 255, 0.21) 29.27%, rgba(243, 241, 255, 0.24) 50.4%, rgba(199, 216, 255, 0.048) 71.92%, rgba(194, 219, 255, 0.132) 100%) ',
        'teaser-presley':
          'radial-gradient(73.26% 81.37% at 23.09% 29.52%, rgba(0, 102, 254, 0.24) 0%, rgba(51, 50, 113, 0.228) 29.27%, rgba(29, 21, 71, 0.24) 50.4%, rgba(60, 89, 157, 0.048) 71.92%, rgba(0, 37, 91, 0.234) 100%) ',
        'teaser-jimmy':
          'linear-gradient(299.63deg, #E1FFFA 0%, #F7FFFD 45.83%, #F2FFFD 100%)',
        'teaser-hendrix':
          'linear-gradient(299.63deg, #008A71 0%, #0D3C33 47.71%, #0F1010 100%);',
        'teaser-rod':
          'linear-gradient(299.63deg, #FFEDED 0%, #FFFBF9 45.83%, #FFFCFB 100%)',
        'teaser-stewart':
          'linear-gradient(299.63deg, #830101 0%, #251313 47.71%, #121111 100%)',
      },
      borderWidth: {
        1: '0.063rem',
      },
      boxShadow: {
        'filter-dark': '0px 3px 10px rgba(79, 77, 182, 0.2)',
        'filter-light': '0px 3px 10px rgba(79, 77, 182, 0.04)',
      },
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
};
