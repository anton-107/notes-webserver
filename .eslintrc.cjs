module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "simple-import-sort",
    "eslint-plugin-eslint-comments",
  ],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["/dist/**/*"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-console": "error",
    "no-duplicate-imports": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "eslint-comments/no-unused-disable": "error",
    "max-depth": ["error", 2],
    "max-nested-callbacks": ["error", 2],
    "max-lines-per-function": ["error", 56],
    "max-statements": ["error", 22],
    "max-params": ["error", 3],
  },
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.dev.ts"],
      rules: {
        "max-lines-per-function": "off",
        "max-statements": "off",
        "max-nested-callbacks": "off",
      },
    },
  ],
};
