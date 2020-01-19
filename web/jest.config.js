module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTest.ts'],
  moduleNameMapper: {
    '\\.(svg)$': '<rootDir>/__mocks__/SvgMock.ts',
    '^@web(.*)$': '<rootDir>/src$1',
  },
  clearMocks: true,
  restoreMocks: true,
  resetModules: true,
};
