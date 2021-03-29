module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "lib/**/*.{ts,vue}",
    "!lib/main.ts",
    "!lib/config.ts",
    "!lib/shims-vue.d.ts",
    "!**/node_modules/**",
  ],
  coverageReporters: ["json", "lcov", "text", 'html']
}