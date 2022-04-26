module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "1.6rem": "1.6rem",
        "2px": "2px",
      },
      colors: {
        gray: {
          50: "#8e8e93",
          10: "#f5f5f5",
        },
        success: {
          77: "#5ab98c",
        },
        danger: {
          66: "#ba5059",
        },
      },
    },
  },
  plugins: [],
};
