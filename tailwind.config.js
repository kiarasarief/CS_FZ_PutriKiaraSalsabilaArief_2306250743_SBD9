/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "pastel-blue": "#AECFEE",
        "dark-pastel-blue": "#7DB1E0",
        cream: "#F7F3E3",
        "dark-cream": "#E8E0C8",
        "text-dark": "#333333",
        "text-light": "#FFFFFF",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
