module.exports = {
  root: true,
  extends: ['expo'],
  env: {
    node: true,
  },
  ignorePatterns: ['node_modules/', 'android/', 'ios/', 'coverage/'],
  overrides: [
    {
      files: ['**/__tests__/**/*.js', '**/*.test.js', 'jest.setup.js'],
      env: {
        jest: true,
        node: true,
      },
    },
  ],
};
