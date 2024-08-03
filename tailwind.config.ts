import type { Config } from "tailwindcss";
import tailwindTypography from "@tailwindcss/typography";
import daisyui from "daisyui";

export default <Partial<Config>>{
  content: [
    "./nuxt.config.ts",
    "./app.vue",
    "./pages/**/*.vue",
    "./layouts/**/*.vue",
    "./content/**/*.md",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindTypography, daisyui],
};
