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
        ink: "#141414",
        muted: "#62666d",
        line: "#e6e8ec",
        surface: "#f7f8fa",
        brand: "#256f5a",
        "brand-dark": "#17483b",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(20, 20, 20, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
