/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: ["/node_modules/(?!(authentication-module)/)"],
  testRegex: "\\.dev\\.ts$"
};
