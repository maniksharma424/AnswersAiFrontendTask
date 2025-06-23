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
      },
    },
  },
  plugins: [],
};
