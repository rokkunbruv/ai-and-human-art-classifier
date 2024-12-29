/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geologica", "sans-serif"]
      },
      colors: {
        cream: "#fff7bb",
        white: "#e8e7e1",
        "pale-midnight": "#322841",
        green: "#53ff40",
        red: "#f03d37",
      },
      backgroundImage: {
        "midnight-to-red-gradient": "linear-gradient(to bottom, #251c33, #331c29)",
      },
      textShadow: {
        "yellow-glow": "0 0 5px #ff9914, 0 0 5px #ffdc5c",
        "green-glow": "0 0 3px #6fe866, 0 0 5px #a9eba4",
        "red-glow": "0 0 5px #ff2d26, 0 0 5px #ff645e",
      },
      boxShadow: {
        "yellow-outer-glow": "0 0 5px #ff9914, 0 0 5px #ffdc5c",
        "yellow-inner-glow": "inset 0 0 5px #ff9914, 0 0 5px #ffdc5c",
        "green-outer-glow": "0 0 5px #60fc4e, 0 0 5px #a1ff96",
        "green-inner-glow": "inset 0 0 5px #60fc4e, 0 0 5px #a1ff96",
        "red-outer-glow": "0 0 5px #ff2d26, 0 0 5px #ff645e",
        "red-inner-glow": "inset 0 0 5px #ff2d26, 0 0 5px #ff645e",
      },
      keyframes: {
        "bounce-dots": {
          "0%, 30%, 100%": {
            transform: "translateY(0)",
          },
          "60%": {
            transform: "translateY(-5px)",
          },
        },
      },
      animation: {
        "bounce-dots": "bounce-dots 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
}

