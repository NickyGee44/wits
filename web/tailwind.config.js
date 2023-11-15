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
      },
      colors: {
        'gold-50': '#A5A488',
        gold: '#FFFED0',
        'light-gold': '#ECE8E0',
        'light-grey': '#A6A6A6',
        'dark-gold': '#8C8C73',
        'dark-grey': '#151515',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
