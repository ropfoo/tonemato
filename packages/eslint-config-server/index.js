module.exports = {
  env: {
    node: true,
    commonjs: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  extends: ['eslint:recommended'],

  rules: {
    'prettier/prettier': 'warn',
    'no-unused-var': 0
  },
};
