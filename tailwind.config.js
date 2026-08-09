/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
  corePlugins: {
    preflight: false, // avoid resetting the existing hand-built design in styles.css
  },
};
