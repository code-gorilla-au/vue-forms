module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'prettier',
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-tsdoc',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error'],
  },
  ignorePatterns: ['dist.*'],
  overrides: [],
};
