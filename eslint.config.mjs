import js from "@eslint/js"
import globals from "globals"
import { defineConfig } from "eslint/config"
import eslintConfigPrettier from "eslint-config-prettier"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended", eslintConfigPrettier],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      // semi: 1,
      // "prefer-const": 2,
      // "no-unused-vars": 1,
      // "no-undef": 1,
    },
  },
])
