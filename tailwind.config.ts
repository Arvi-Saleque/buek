import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#102033",
        university: {
          navy: "#0B2341",
          royal: "#123A63",
          green: "#0F6B57",
          gold: "#C89B3C",
          goldDark: "#B88A2F",
          mist: "#F8FAF7",
          surface: "#FFFFFF",
          text: "#52606D",
          line: "#E5EAF0",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(16, 32, 51, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
