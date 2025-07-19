import { type Config } from "jest";

const config: Config = {
  // Base configuration
  verbose: true,
  bail: true,
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/unit/**/*.spec.ts", "<rootDir>/tests/integration/**/*.spec.ts"],
  moduleFileExtensions: ["js", "ts", "json"],
  modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "@src/(.*)$": "<rootDir>/src/$1",
    "@tests/(.*)$": "<rootDir>/tests/$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            decorators: true,
          },
          transform: {
            optimizer: {
              globals: {
                vars: {
                  "import.meta.env": "{}",
                },
              },
            },
          },
        },
      },
    ],
  },

  // Coverage configuration
  collectCoverageFrom: ["<rootDir>/src/**/*.{js,jsx,ts,tsx}"],
  coverageReporters: ["html"],
  coveragePathIgnorePatterns: ["node_modules", "dist"],
  coverageDirectory: "<rootDir>/tests/coverage",

  // Temporary commented until start writing tests
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
};

export default config;
