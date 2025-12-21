import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
    plugins: [
        devtools(),
        viteTsConfigPaths({
            projects: ["./tsconfig.json"],
        }),
        tailwindcss(),
        nodePolyfills({ globals: { Buffer: true }, protocolImports: true }),
        tanstackRouter({ target: "react", autoCodeSplitting: true }),
        viteReact(),
    ],
    resolve: {
        alias: {
            crypto: "crypto-browserify",
            stream: "stream-browserify",
        },
    },
});

export default config;
