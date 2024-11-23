import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globals: true,
            environment: "jsdom",
            include: ["__tests__/**/*.spec.ts"],
            exclude: [...configDefaults.exclude, "e2e/**", "setup.ts"],
            root: fileURLToPath(new URL("./", import.meta.url)),
        },
    }),
);
