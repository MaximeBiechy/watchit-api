import pino from 'pino';
import pinoPretty from 'pino-pretty';
import fs from 'node:fs';
import path from 'node:path';
import { __dirname } from './path.js';

const logLevel = process.env.LOG_LEVEL || 'info';

// ? Create a logs directory if it doesn't exist
const logDirectory = path.resolve(__dirname, '../../../logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const customLevels = {
  error: path.resolve(logDirectory, 'error.log'),
  info: path.resolve(logDirectory, 'info.log'),
  debug: path.resolve(logDirectory, 'debug.log'),
};

// ? Create streams to save logs in different files
const streams = Object.keys(customLevels).map((level) => ({
  level,
  stream: fs.createWriteStream(customLevels[level as keyof typeof customLevels], { flags: 'a' }),
}));

// ? Pretty print logs in development
const devTransport = pinoPretty({
  colorize: true,
  translateTime: 'SYS:standard',
  ignore: 'pid,hostname',
});

const prodTransport = pino.multistream([{ level: 'info', stream: process.stdout }, ...streams]);

const logger = pino(
  {
    level: logLevel,
    base: {
      service: 'watchit-api',
      environment: process.env.NODE_ENV || 'development',
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  },
  process.env.NODE_ENV !== 'production' ? devTransport : prodTransport,
);

// ? Function to log errors with a message
export const logError = (error: any, message: string = 'An error occurred') => {
  logger.error({
    message,
    error: {
      name: error.name || 'Error',
      message: error.message || '',
      stack: error.stack || '',
    },
  });
};

export default logger;
