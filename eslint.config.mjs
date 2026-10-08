import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    ".claude/worktrees/**",
    // Payload migrations are generated code and intentionally keep the
    // standard migration callback signature even when arguments are unused.
    "src/migrations/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
