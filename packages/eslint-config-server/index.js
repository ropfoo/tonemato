module.exports = {
  env: {
    node: true,
    commonjs: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],

  rules: {
    'prettier/prettier': 'warn',
    // Needs to be turned off because of a strange error probably related to enum
    // 'no-unused-vars': 'off',
  },
};
