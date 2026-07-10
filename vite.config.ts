import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves from /Andes_Nova/; Vercel serves from the domain root.
  base: process.env.VERCEL ? "/" : "/Andes_Nova/",
  build: {
    outDir: "docs",
  },
});
