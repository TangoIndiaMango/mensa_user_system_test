module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/tests/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.(ts|tsx|js)$': 'ts-jest',
    '^.+\\.(ts|js)$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: "node"
};