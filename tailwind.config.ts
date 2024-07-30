import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default <Partial<Config>>{
  content: [
    "./nuxt.config.ts",
    "./pages/**/*.vue",
    "./layouts/**/*.vue",
    "./content/**/*.md",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
