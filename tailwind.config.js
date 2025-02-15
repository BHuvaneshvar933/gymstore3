/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        'zoom-out': '150%',  // 150% will zoom out the image
      },
    },
  },
  plugins: [],
}