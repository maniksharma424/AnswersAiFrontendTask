/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        robert: ["Robert", "sans-serif"],
        inter: ["Inter", "sans-serif"], // google font
      },
      colors: {
        bg_primary: "#161618",
        bg_primary_light: "#222324",
        border_primary: "#525252",
        border_secondary: "#C8E972",
        text_primary: "#B3E237",
        text_secondary: "#DCFF7FFD",
        text_light: "#BBBBBB",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOutDown: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.3s ease-out forwards",
        fadeOutDown: "fadeOutDown 0.3s ease-in forwards",
      },
    },
  },
  plugins: [],
};
