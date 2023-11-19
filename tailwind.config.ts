import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default <Partial<Config>>{
  darkMode: 'class',
  content: [],
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
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addVariant }) => {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }),
  ],
};
