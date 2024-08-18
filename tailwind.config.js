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
      screens: {
        "3xl": "1800px",
        "2md": "1200px",
      },
      fontFamily: {
        calibre: ['"Calibre"', "sans-serif"],
        rubik: "'Rubik', serif",
        poppins: "'Poppins', serif",
        josefins: "'Josefin Sans', sans-serif",
        barlow: "'Barlow', sans-serif",
        raleway: "'Raleway', sans-serif",
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
      colors: {
        primary: "#001d3d",
        darkPrimary: "#001123",
        primary900: "#003580",
        primary800: "#0047A6",
        primary700: "#0059C9",
        primary600: "#296CE5",
        primary400: "#7394FF",
        primary300: "#96AAFF",
        primary200: "#B6C1FF",
        primary100: "#cfe2fc",
        primary50: "#F2F2FF",
        secondary: "#23CDAB",
        secondary900: "#004433",
        secondary800: "#005A44",
        secondary700: "#007055",
        secondary600: "#008568",
        secondary500: "#009A7C",
        secondary400: "#57C2A8",
        secondary200: "#88D5C0",
        secondary100: "#B8E7D9",
        secondary50: "#E7F7F2",
        gray900: "#393939",
        gray800: "#4B4B4B",
        gray700: "#5E5E5E",
        gray600: "#727272",
        gray500: "#868686",
        gray400: "#9B9B9B",
        gray300: "#B0B0B0",
        gray200: "#C6C6C6",
        gray100: "#DDDDDD",
        gray50: "#F3F3F3",
        gray10: "#F1F3F5",
        red50: "#FCE8FF",
        error: "#ff4242",
        errorLight: "#ffbcbc81",
        black: "#1d1d1d",
        white: "#ffffff",
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
