import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import colors from 'tailwindcss/colors';

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '1024px',
          md: '1024px',
          lg: '1024px',
          xl: '1024px',
          '2xl': '1024px',
        },
      },
      fontSize: {
        sm: '16px',
      },
      colors: {
        error: {
          ...colors.red,
          DEFAULT: colors.red[500],
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addVariant }) => {
      addVariant('child', '& > *');
      addVariant('child-first', '& > *:first-child');
      addVariant('child-last', '& > *:last-child');
      addVariant('child-hover', '& > *:hover');
    }),
  ],
};
