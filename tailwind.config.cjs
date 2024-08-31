/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
    "./node_modules/gtomy-lib/index.js",
  ],
  theme: {
    extend: {
      listStyleType: {
        square: 'square',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
    themes: ["retro"],
  },
}

