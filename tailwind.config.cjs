/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    colors: {
      white: "#ffffff",
      black: "#222222",
      red: {
        light: "#FF5E6C",
        DEFAULT: "#E42031",
        dark: "#B1101E",
      },
    },
  },
  plugins: [
	require('flowbite-typography'),
  ],
};
