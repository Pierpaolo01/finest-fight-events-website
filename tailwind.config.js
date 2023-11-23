/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        mont: "Montserrat",
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
        "ffe-off-white": "#EEE",
      },
      boxShadow: {
        inset: "inset 0px 5px 20px -5px rgba(64,64,64,1)",
      },
    },
  },
  plugins: [],
};
