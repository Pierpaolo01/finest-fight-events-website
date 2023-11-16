/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "Montserrat",
        lora: "Lora",
      },
      screens: {
        mobile: "479px",
        tablet: "767px",
        laptop: "991px",
      },
      colors: {
        "ffe-bg": "#1A1A1A",
        "ffe-red": "#D2090A",
        "ffe-border": "#404040",
      },
    },
  },
  plugins: [],
};
