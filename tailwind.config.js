/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      backgroundColor:{
        primaryColor: "hsl(235,85,60)",
      },
      textColor:{
        primaryColor: "hsl(235,85,60)",
      }
    },
  },
  plugins: [],
}