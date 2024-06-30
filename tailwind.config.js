/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "390px",
      },
      fontSize: {
        '90': '90%',
        '80': '80%',
        '70': '70%',
        '60': '60%',
        '50': '50%',
        '40': '40%',
      },
    },
  },
  plugins: [],
};
