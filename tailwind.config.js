/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    screens: {
      "2xl": { max: "1536px" },
      xl: { max: "1280px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      450: { max: "450px" },
      xs: { max: "400px" },
      "2xs": { max: "350px" },
    },
    extend: {
      colors: {
        "main-blue": "#3CA9EB",
        "light-blue": "#EAF6FE",
        "dark-blue": "#05273C",
        "accent-blue": "#1b3a4e",
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },

      fontSize: {
        "30px": "rfs(30px)",
        "40px": "rfs(40px)",
        "50px": "rfs(50px)",
      },
    },
  },
  plugins: [],
};
