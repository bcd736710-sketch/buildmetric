import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        widgetEnter: {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "widget-enter": "widgetEnter 0.2s ease-out both",
      },
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
