// TODO Study.1
/**
 * Custom logger is used to get more flexibility over console.log
 * winston logger implementation is proposed to use accross all application
 * To use it you should import it in a module and pass current module name to constructor function Logger(filename)
 *
 * DOCS: https://github.com/winstonjs/winston#table-of-contents
 */
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf, colorize, align, splat } = format;

const logsFormat = printf(info => {
  const ts = info.timestamp.slice(0, 19).replace('T', ' ');
  return `${ts} ${info.level} ${info.label}: ${info.message}`;
});

/**
 * Logger consists of two 'transports' object. Transport is logging output,
 * which can have its on log formatting and can be combined with other transports;
 *
 * Here we are using two transports transports.Console to output necessary logs to the console
 * and transports.File to save all the logs to /logs folder;
 * Transports have different formatting settings (logsFormat function);
 * Main difference between Console and File loggers are different 'level' of logging - INFO for console and ERROR for file;
 * Each log can be logged to separate level:
 *  logger.log('info', 'Info')
 *  logger.log('error', 'Error')
 * {
 *   error: 0,
 *   warn: 1,
 *   info: 2,
 *   verbose: 3,
 *   debug: 4,
 *   silly: 5
 * }
 * Level groups are inclusive, so if we are logging to ERROR level, all transports will log our error,
 * but if we are logging to INFO level, only INFO and lower level (warn and error) transports will 'catch' our log.
 *
 * @param {*} fileName Current (were logging happens) module name
 */
const Logger = fileName => {
  let level = 'info';
  if (process.env.DEBUG) {
    level = 'debug';
  }
  const consoleLogger = new transports.Console({
    level,
    format: combine(
      colorize(),
      timestamp(),
      align(),
      label({ label: fileName }),
      splat(),
      logsFormat,
    ),
  });
  const fileLogger = new transports.File({
    filename: `logs/combined.log`,
    level: 'debug',
    maxsize: 5242880, // 5 mb
    maxFiles: 2,
    format: combine(timestamp(), align(), label({ label: fileName }), splat(), logsFormat),
  });
  const transportsArray = [fileLogger];
  if (process.env.NODE_ENV !== 'test') {
    transportsArray.push(consoleLogger);
  }
  const logger = createLogger({
    transports: transportsArray,
  });
  return logger;
};

module.exports = Logger;
