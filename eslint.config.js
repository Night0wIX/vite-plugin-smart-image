import js from "@eslint/js";

import eslintJest from "eslint-plugin-jest";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import eslintTS from "typescript-eslint";

const tsFiles = ["**/*.ts", "**/*.tsx"];
const jsFiles = ["**/*.js", "**/*.cjs", "**/*.mjs"];
const testFiles = ["tests/unit/**/*.spec.ts", "tests/integration/**/*.spec.ts"];

export default [
  // ---------------------------
  // Global ignore patterns
  // ---------------------------
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/coverage/**", "**/*.d.ts"],
  },

  // ---------------------------
  // Base JS rules
  // ---------------------------
  {
    ...js.configs.recommended,
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      ecmaVersion: "latest",
    },
  },

  // ---------------------------
  // TypeScript rules
  // ---------------------------
  ...eslintTS.configs.recommended,

  {
    files: tsFiles,
    languageOptions: {
      parser: eslintTS.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", disallowTypeAnnotations: false },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/promise-function-async": "warn",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/ban-ts-comment": ["warn", { "ts-ignore": "allow-with-description" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },

  // ---------------------------
  // Plain JS files
  // ---------------------------
  {
    files: jsFiles,
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "warn",
      eqeqeq: ["error", "always"],
    },
  },

  // ---------------------------
  // Unicorn plugin (quality boosters)
  // ---------------------------
  {
    files: [...tsFiles, ...jsFiles],
    plugins: {
      unicorn,
    },
    rules: {
      "unicorn/prefer-node-protocol": "error",
      "unicorn/filename-case": ["error", { cases: { kebabCase: true, camelCase: true } }],
      "unicorn/prefer-top-level-await": "error",
      "unicorn/no-null": "warn",
      "unicorn/no-array-for-each": "warn",
      "unicorn/consistent-function-scoping": "warn",
      "unicorn/prefer-string-slice": "warn",
      "unicorn/prefer-structured-clone": "warn",
    },
  },

  // ---------------------------
  // Jest configuration (Unit & Integration testing)
  // ---------------------------
  {
    files: testFiles,
    plugins: {
      jest: eslintJest,
    },
    languageOptions: {
      globals: { jest: true },
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
      "jest/consistent-test-it": "error",
    },
  },
];
