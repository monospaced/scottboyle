const babelParser = require("@babel/eslint-parser");
const globals = require("globals");

module.exports = [
  {
    ignores: ["build/**", "coverage/**", "node_modules/**"],
  },
  {
    files: ["src/**/*.js", "netlify/**/*.js", "webpack.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-transform-object-rest-spread"],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      "comma-dangle": ["error", "always-multiline"],
      curly: "error",
      "dot-location": ["error", "property"],
      "dot-notation": "error",
      eqeqeq: ["error", "smart"],
      "key-spacing": [
        "warn",
        {
          beforeColon: false,
          afterColon: true,
        },
      ],
      "guard-for-in": "error",
      "no-caller": "error",
      "no-constant-condition": "error",
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-else-return": "error",
      "no-empty": "error",
      "no-empty-character-class": "error",
      "no-eval": "error",
      "no-ex-assign": "error",
      "no-extra-semi": "error",
      "no-func-assign": "error",
      "no-floating-decimal": "error",
      "no-implied-eval": "error",
      "no-invalid-regexp": "error",
      "no-labels": "error",
      "no-global-assign": "error",
      "no-obj-calls": "error",
      "no-redeclare": "error",
      "no-regex-spaces": "error",
      "no-return-assign": "error",
      "no-unreachable": "error",
      "no-with": "error",
      semi: "error",
      "use-isnan": "error",
      "wrap-iife": "error",
    },
  },
];
