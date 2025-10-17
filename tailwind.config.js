// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         brand: {
//           teal: "#73C8D2",
//           blue: "#0046FF",
//           beige: "#F5F1DC",
//           orange: "#FF9013",
//         },
//       },
//     },
//   },
//   plugins: [],
// };

//** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#73C8D2",
          blue: "#0046FF",
          beige: "#F5F1DC",
          orange: "#FF9013",
        },
      },
    },
  },
  plugins: [],
};
