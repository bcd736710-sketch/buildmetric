import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#00203f",
        forest: "#00433b",
        moss: "#d8f3c4",
        warm: "#f7f6f1",
        mist: "#eef3ec",
        slate: "#52615d",
      },
    },
  },
  plugins: [],
};

export default config;
