// Settings for Vite, the tool that runs the game locally and builds it for the web.
import { defineConfig } from "vite";

export default defineConfig({
  // Use relative paths in the built site, so it works at any address,
  // like https://bederson.github.io/learn-to-code/
  base: "./",
});
