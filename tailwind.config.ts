import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0c1020",
        muted: "#717790",
        line: "#252b42",
        surface: "#f7f3ea",
        brand: "#cda861",
        "brand-dark": "#8b6d32",
        midnight: "#050713",
        starlight: "#f7efd8",
        aurora: "#8fc7ff",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(4, 7, 19, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
