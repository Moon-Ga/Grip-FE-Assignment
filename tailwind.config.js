module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        zoomin: 'zoomin 0.1s ease-in',
      },

      keyframes: {
        zoomin: {
          '0%': { opacity: '0', transform: 'scale3d(0.3, 0.3, 0.3)' },
          '100%': { opacity: '1' },
        },
      },

      boxShadow: {
        common: '0.5rem 1rem 0.5rem',
        block: '0 0 1rem',
      },

      backgroundImage: {
        main: 'url(../public/logo.png)',
      },
    },
  },
  plugins: [],
};
