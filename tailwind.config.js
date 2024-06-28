/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        calibre: ['"Calibre"', "sans-serif"],
      },
      boxShadow: {
        small: "0px 2px 10px 0 #ffffff28",
      },
      keyframes: {
        cBjGZz: {
          "0%": { opacity: "0.2" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        cBjGZz: "cBjGZz 2s cubic-bezier(0.25, 0.4, 0.4, 1) forwards",
      },
      backgroundImage: {
        "radial-pattern":
          "radial-gradient(circle, rgb(42, 43, 48) 1px, rgb(42, 43, 48) 1px, transparent 1px, transparent 100%)",
      },
      backgroundSize: {
        "8x8": "8px 8px",
      },
      maskImage: {
        "radial-fade": "radial-gradient(rgb(0, 0, 0), transparent 50%)",
      },
    },
  },
  plugins: [
    // rest of the code
    addVariablesForColors,
  ],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
