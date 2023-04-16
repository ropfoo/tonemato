/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    colors: {
      jimmy: '#B9FFF2',
      hendrix: '#03CFAA',
      rod: '#FFD6C9',
      stewart: '#FF3D00',
      elvis: '#E6E6FF',
      presley: '#5855C7',
      amy: '#1F1F27',
      whinehouse: '#181621',
      snow: '#F4F3FF',
      wolf: '#9B9B9B',
      onyx: '#3E3E3E',
      white: '#FFFFFF',
      black: '#000000',
    },
    extend: {
      backgroundImage: {
        'teaser-elvis':
          'linear-gradient(299.63deg, #EAEAFF 0%, #EAEAFF 0%, #EDEDFF 0.01%, #FDFDFF 49.23%, #F9F9FF 91.67%)',
        'teaser-presley':
          'linear-gradient(299.63deg, #282758 0%, #181736 16.67%, #171329 47.92%, #100F19 100%)',
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
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
};
