module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "react-app",
    "react-app/jest",
    'plugin:react/recommended',
    'standard',
  ],
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
    'space-before-function-paren': ['error', 'never']
  }
}
