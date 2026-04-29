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
        panel: "-20px 0 60px rgba(11,35,65,0.22)",
      },
      keyframes: {
        slideInRight: {
          from: { opacity: "0", transform: "translateX(40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeInDown: {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        slideInRight: "slideInRight 0.45s cubic-bezier(0.16, 1, 0.3, 1) both",
        fadeInDown: "fadeInDown 0.3s ease both",
      },
      transitionDuration: {
        "400": "400ms",
        "450": "450ms",
      },
    },
  },
  plugins: [],
};

export default config;
