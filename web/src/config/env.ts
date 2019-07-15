let env;

switch (process.env.ENVIRONMENT) {
  case 'dev':
    env = {};
    break;

  case 'stage':
    env = {};
    break;

  case 'prod':
    env = {};
    break;

  default:
    throw new Error('Error: Unknown process.env.ENVIRONMENT');
}

export { env };
