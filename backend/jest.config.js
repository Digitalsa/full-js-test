const { pathsToModuleNameMapper } = require("ts-jest/utils");

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/services/*ts"
  ],
  coverageDirectory: "coverage",

  coverageReporters: [
    "text-summary",
    "lcov",
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/src/" }),

  preset: "ts-jest",

  testEnvironment: "node",

  testMatch: [
    "**/*.spec.ts"
  ],

};
