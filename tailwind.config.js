// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      colors: {
        primary: "#3182f6",
        primaryHover: "#2563eb",
        border: "#e5e7eb",
        background: "#f9fafb",
        card: "#ffffff",
        text: "#111827",
        subtext: "#6b7280"
      },
    },
  },
  plugins: [],
};