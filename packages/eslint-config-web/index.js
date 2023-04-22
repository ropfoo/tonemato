module.exports = {
  env: {
    node: true,
    commonjs: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['solid', 'prettier'],
  extends: ['eslint:recommended', 'plugin:solid/typescript'],
  rules: {
    'prettier/prettier': 'warn',
    'no-unused-vars': 0,
  },
};
