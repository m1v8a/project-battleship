import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
    {
        files: ["./src/**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended", eslintConfigPrettier],
        languageOptions: { globals: globals.browser },
        rules: {
            semi: "warn",
            "no-unused-vars": "warn",
            "array-callback-return": "error",
        },
    },
]);
