import { captureMessage, Severity } from '@sentry/browser';

interface LogImplOptions {
  logLevel: Severity;
  msg: string;
  console: (msg: string) => void;
}

const logImpl = ({ logLevel, msg, console }: LogImplOptions): void => {
  captureMessage(msg, logLevel);
  console(`${logLevel}: ${msg}`);
};

const logger = {
  debug: (msg: string): void => {
    logImpl({ logLevel: Severity.Debug, msg, console: console.log });
  },
  info: (msg: string): void => {
    logImpl({ logLevel: Severity.Info, msg, console: console.log });
  },
  warning: (msg: string): void => {
    logImpl({ logLevel: Severity.Warning, msg, console: console.log });
  },
  error: (msg: string): void => {
    logImpl({ logLevel: Severity.Error, msg, console: console.error });
  },
  fatal: (msg: string): void => {
    logImpl({ logLevel: Severity.Fatal, msg, console: console.error });
  },
};

export { logger };
