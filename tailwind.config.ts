import type { Config } from "tailwindcss";
import tailwindTypography from "@tailwindcss/typography";
import daisyui from "daisyui";

export default <Partial<Config>>{
  daisyui: {
    themes: ["dark"],
  },
  content: [
    "./nuxt.config.ts",
    "./app.vue",
    "./pages/**/*.vue",
    "./layouts/**/*.vue",
    "./content/**/*.md",
  ],
  plugins: [tailwindTypography, daisyui],
};
