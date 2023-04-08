/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'teaser-gradient-darkblue':
          'linear-gradient(299.63deg, #3822B3 0%, #333333 47.71%, #3E3E3E 100%)',
      },
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
    },
  },
  plugins: [],
};
