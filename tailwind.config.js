/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '16px',
      screens: {
        sm: '100%',
        md: '760px',
        lg: '1024px',
        xl: '1440px',
      },
    },
  },
  plugins: [],
};
