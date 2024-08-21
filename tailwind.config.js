/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        TextColor: "#5B5B98",
        PrimaryColor: "#757FEF",
        SecondaryColor: "#818093",
        SuccessColor: "#00B69B",
        InfoColor: "#2DB6F5",
        WarningColor: "#FFBC2B",
        DangerColor: "#EE368C",
        DarkColor: "#260944",
        headingColor: "#260944",
        WhiteColor: "#ffffff",
      },
    },
  },
  plugins: [],
};
