import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react({
      // Enable the new JSX transform
      jsxRuntime: "automatic",
    }),
    tailwindcss(),
  ],
});
