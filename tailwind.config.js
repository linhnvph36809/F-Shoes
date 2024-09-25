/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            sm: '0',
            md: '768px',
            lg: '1024px',
            xl: '1170px',
        },
        extend: {},
        container: {
            center: true,
            padding: '16px',
            screens: {
                sm: '100%',
            },
        },
    },
    plugins: [],
};
