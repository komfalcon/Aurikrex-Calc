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
        aurikrex: {
          bg: "#0F172A",
          bgDark: "#0B1222",
          accent: "#3B82F6",
          shift: "#22D3EE",
          alpha: "#A78BFA",
          inv: "#FBBF24",
          hyp: "#F472B6",
          error: "#F59E0B",
          ac: "#EF4444",
          teal: "#14B8A6",
          tealLight: "#2DD4BF",
          keyBg: "#1E293B",
          keyActive: "#334155",
          keyBorder: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        key: "14px",
      },
      boxShadow: {
        key: "inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 2px 4px rgba(0, 0, 0, 0.4)",
        keyActive: "inset 0 2px 4px rgba(0, 0, 0, 0.4)",
        keyBlue: "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 10px rgba(59, 130, 246, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
