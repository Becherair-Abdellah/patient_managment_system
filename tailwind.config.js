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
        primaryColor3: "#4251f014"
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
    gridTemplateColumns: {
      largScreenGrid: '6% 15.5% 24% 24% 15.5% 15%',
      mediumScreenGrid: '10% 30% 30% 30%',
      smallScreenGrid: '10% 45% 45%',
    },
    },
  },
  plugins: [],
}