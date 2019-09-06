import * as loggerLib from '@web/lib/logger';
const logger = jest.genMockFromModule<typeof loggerLib>('@web/lib/logger');

module.exports = logger;
