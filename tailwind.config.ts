import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        eve: {
          background: "#0d1117",
          surface: "#161b22",
          accent: "#f0b90b",
          blue: "#58a6ff",
          success: "#3fb950",
          danger: "#f85149",
        },
      },
    },
  },

  plugins: [],
}

export default config