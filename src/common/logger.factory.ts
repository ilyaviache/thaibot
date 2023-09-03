import { transports, format } from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

const newrelicFormatter = require('@newrelic/winston-enricher');
const winston = require('winston');
const newrelicWinstonFormatter = newrelicFormatter(winston);

export const LoggerFactory = (appName: string) => {
  let consoleFormat;
  const DEBUG = process.env.DEBUG;
  const USE_JSON_LOGGER = process.env.USE_JSON_LOGGER;
  if (USE_JSON_LOGGER === 'true') {
    consoleFormat = format.combine(
      format.ms(),
      format.timestamp(),
      format.json()
    );
  } else {
    consoleFormat = format.combine(
      format.timestamp(),
      format.ms(),
      nestWinstonModuleUtilities.format.nestLike(appName, {
        colors: true,
        prettyPrint: true,
      })
    );
  }
  return WinstonModule.createLogger({
    level: DEBUG ? 'debug' : 'info',
    transports: [
      new transports.Console({ format: consoleFormat }),
      new transports.File({
        filename: 'combined.log',
        format: format.combine(
          format.timestamp(),
          format.json(),
          newrelicWinstonFormatter()
        ),
      }),
    ],
  });
};
