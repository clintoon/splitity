module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTest.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '^@web(.*)$': '<rootDir>/src$1',
  },
  clearMocks: true,
  restoreMocks: true,
};
