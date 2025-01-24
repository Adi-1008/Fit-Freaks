const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fill: {
        green: {
          400: "#86efac",
          500: "#34d399",
          600: "#10b981",
          700: "#047857",
        },
        gray: {
          200: "#e5e7eb",
          800: "#121212",
          400: "#9CA3AF",
        },
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 5px #fff, 0 0 10px #00e6e6, 0 0 15px #00e6e6, 0 0 20px #00e6e6' },
          '50%': { textShadow: '0 0 10px #fff, 0 0 20px #00e6e6, 0 0 30px #00e6e6, 0 0 40px #00e6e6' },
        },
        shimmer: {
          from: {
            "backgroundPosition": "0 0"
          },
          to: {
            "backgroundPosition": "-200% 0"
          }
        },
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        glow: 'glow 2s infinite ease-in-out',
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [addVariablesForColors, hideNumberInputArrows],
}

function addVariablesForColors({
  addBase,
  theme
}) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}

function hideNumberInputArrows({ addUtilities }) {
  addUtilities({
    ".hide-arrows": {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: "0",
      },
      "&": {
        "-moz-appearance": "textfield",
      },
    },
  });
}