const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components, app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        dragon: ['Dragon', 'font-sans'],
        beaufort: ['BeaufortPro', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        'gold-50': '#A5A488',
        gold: '#FFFED0',
        'light-gold': '#ECE8E0',
        'light-grey': '#A6A6A6',
        'dark-gold': '#8C8C73',
        'dark-grey': '#151515',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-1deg)',
          },
          '50%': {
            transform: 'rotate(1deg)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 0.3s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
