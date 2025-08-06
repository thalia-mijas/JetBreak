import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1dafa5",
        turquoise: {
          50: "#f1fcfa",
          100: "#cff8f1",
          200: "#9ef1e4",
          300: "#56dfcf",
          400: "#37cabe",
          500: "#1dafa5",
          600: "#158c87",
          700: "#15706d",
          800: "#155a58",
          900: "#164b49",
          950: "#062c2d",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
