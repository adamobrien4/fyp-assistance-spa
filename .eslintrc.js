module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'only-warn'],
  rules: {
    'prefer-const': 0,
    'multiline-ternary': 0,
    'space-before-funaction-paren': 'never'
  }
}
