// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [

  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'indent': 'off',
    'space-before-function-paren': ['error', 'always'],
    'space-before-blocks': ['error', {'functions': 'always', 'keywords': 'always', 'classes': 'always'}],
    'function-paren-newline': ['error', {'minItems': 7}],
    // 'arrow-parens': ['error', 'as-needed'],
    'no-confusing-arrow': ['error', {'allowParens': true}],
    'no-useless-constructor': 'error',
    'no-dupe-class-members': 'error',
    'no-duplicate-imports': ['error', {'includeExports': true}],
    'one-var': ['error', {var: 'never', let: 'never', const: 'never'}],
    'spaced-comment': ['error', 'always', {'exceptions': ['-', '+', '*']}],
    'space-infix-ops': ['error', {'int32Hint': false}]
  }
}
