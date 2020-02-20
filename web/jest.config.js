module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTest.ts'],
  moduleNameMapper: {
    '\\.(svg)$': '<rootDir>/__mocks__/SvgMock.ts',
    '\\.(png)$': '<rootDir>/__mocks__/AssetMock.ts',
    '\\.(md)$': '<rootDir>/__mocks__/RawLoaderMock.ts',
    '^@web(.*)$': '<rootDir>/src$1',
  },
  clearMocks: true,
  restoreMocks: true,
  resetModules: true,
};
