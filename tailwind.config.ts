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
          green: "#0F5D50",
          gold: "#C99A2E",
          mist: "#F4F7F6",
          line: "#D9E2E0",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(16, 32, 51, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
