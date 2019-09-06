const error = 2;
const warning = 1;
const ignore = 0;

module.exports = {
  // root: true,
  // env: {
  //   node: true
  // },
  // parser: "babel-eslint",
  // parserOptions: {
  //   ecmaVersion: 6
  // },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  plugins: ["vue", "import"],
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "problems",
    "plugin:vue/base"
  ],
  rules: {
    "linebreak-style": ["error", "unix"],
    "no-use-before-define": ignore,
    "no-duplicate-imports": warning,
    "no-extra-semi": warning,
    "no-undef": warning,
    "prefer-const": warning,
    "prefer-arrow-callback": warning,
    eqeqeq: warning,
    "object-shorthand": warning,
    "no-var": warning,
    "no-unreachable": warning,
    "no-buffer-constructor": warning,
    "no-path-concat": warning,
    "prefer-template": warning,
    "no-extra-boolean-cast": warning,
    "no-unused-vars": warning,
    "import/default": warning
  },
  globals: {
    test: false,
    module: false,
    process: false,
    require: false
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".vue"]
      },
      webpack: {
        config: {
          resolve: {
            extensions: [".js", ".vue"],
            alias: {
              "~": `${__dirname}/src`
            }
          }
        }
      }
    }
  }
};