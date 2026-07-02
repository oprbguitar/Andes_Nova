/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071A2F",
        navyDark: "#03111F",
        slateInk: "#334155",
        softWhite: "#F8FAFC",
        teal: "#0F9F9A",
        tealDark: "#0B7773",
        gold: "#C9933A",
        goldDark: "#A87524",
        line: "#E2E8F0",
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        premium: "0 24px 70px rgba(3, 17, 31, 0.24)",
        card: "0 18px 40px rgba(7, 26, 47, 0.12)",
      },
    },
  },
  plugins: [],
};
