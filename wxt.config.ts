import { defineConfig } from "wxt";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],

  vite: () => ({
    plugins: [nodePolyfills()],
  }),

  manifest: {
    name: "Stash (Web3 Wallet)",
    permissions: ["storage"],
  },
});
