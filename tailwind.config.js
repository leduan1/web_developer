/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0a0a0a",
        red: {
          500: "#ED0D32",
          600: "#d60928",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        condensed: ["Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
};
