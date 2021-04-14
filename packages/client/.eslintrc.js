module.exports = {
  extends: 'universe/native',
  rules: {
    '@typescript-eslint/ban-types': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  plugins: ['jest'],
};
