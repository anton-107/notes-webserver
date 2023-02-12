/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 10_000,
  maxConcurrency: 3,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: ["src/**/*"],
  transformIgnorePatterns: [
    "/node_modules/(?!(authentication-module)/)",
    "/src/actions/index-for-search.ts",
  ],
};
