/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "barlow-regular": ["BarlowRegular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
