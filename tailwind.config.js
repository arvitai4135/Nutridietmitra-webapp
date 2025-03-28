/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "nutricare-primary-dark": "#9E0B7F",
        "nutricare-primary-light": "#D93BB1",
        "nutricare-green": "#ADD01C",
        "nutricare-green-dark": "#8CA417",
        "nutricare-bg-light": "#FCF0F8",
        "nutricare-text-dark": "#333333",
        "nutricare-text-gray": "#718096",
      },
      fontFamily: {
        sans: ["Arial", "sans-serif"], // Updated to Arial
      },
    },
  },
  plugins: [],
};