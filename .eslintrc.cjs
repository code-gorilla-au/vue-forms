module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'prettier',
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-tsdoc',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  extends: ['plugin:@typescript-eslint/recommended'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {},
  ignorePatterns: ['dist.*'],
  overrides: [
    {
      files: '*.mjs',
      env: {
        node: true,
        es6: true,
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      plugins: [],
      extends: 'eslint:recommended',
    },
    {
      files: '*.vue',
      extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', '@vue/typescript/recommended'],
      globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
      },
    },
  ],
};
