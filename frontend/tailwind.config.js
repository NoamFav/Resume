module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],  // Updated 'purge' to 'content'
  darkMode: false,  // You can set this to 'media' or 'class' if you want dark mode
  theme: {
    extend: {},  // Extend Tailwind's default themes here
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
