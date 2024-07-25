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
        primaryColor2: "hsla(0,0%,94%,1)",
      },
      textColor:{
        primaryColor: "hsl(235,85,60)",
      },
      borderColor:{
        primaryColor: "hsl(235,85,60)",
        
      },
      animation: {
        spin_fast: 'spin 0.5s linear infinite',
      },
    },
  },
  plugins: [],
}