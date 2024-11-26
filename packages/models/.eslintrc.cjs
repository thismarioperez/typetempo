/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    ignorePatterns: [".eslintrc.cjs"],
    extends: ["@typetempo/config-eslint/index.js"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: true,
    },
    rules: {
        "no-var": "off",
    },
};
