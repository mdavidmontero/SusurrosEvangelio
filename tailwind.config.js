/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#592C00",
        secondary: "#582C00",
        tertiary: "#F5F5F5",
        bgIconos: "#7E1710",
      },
    },
  },
  plugins: [],
};
