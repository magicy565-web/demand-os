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
        // 赛博朋克配色方案
        cyber: {
          black: "#0a0a0f",
          dark: "#12121a",
          purple: "#9d4edd",
          pink: "#ff006e",
          cyan: "#00f5ff",
          blue: "#3a86ff",
          yellow: "#ffbe0b",
          green: "#06ffa5",
          red: "#ff3366",
        },
      },
      fontFamily: {
        cyber: ["Orbitron", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glitch": "glitch 1s linear infinite",
        "scan-line": "scan-line 6s linear infinite",
        "border-flow": "border-flow 3s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.3)",
          },
          "50%": { 
            boxShadow: "0 0 40px rgba(0, 245, 255, 0.8), 0 0 80px rgba(0, 245, 255, 0.5)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "scan-line": {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
        "border-flow": {
          "0%, 100%": { 
            backgroundPosition: "0% 50%",
          },
          "50%": { 
            backgroundPosition: "100% 50%",
          },
        },
      },
      backgroundImage: {
        "cyber-grid": 
          "linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "shimmer-gradient": 
          "linear-gradient(90deg, transparent 0%, rgba(0, 245, 255, 0.1) 50%, transparent 100%)",
      },
      backgroundSize: {
        "cyber-grid": "50px 50px",
      },
    },
  },
  plugins: [],
};

export default config;
