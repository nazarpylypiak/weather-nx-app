/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-scss'],
  rules: {
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['theme'],
      },
    ],
    'selector-class-pattern': [
      '^([a-z0-9]+(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)*)$',
      {
        message:
          'Expected class selector to be kebab-case or BEM (block__element--modifier)',
      },
    ],
  },
};
