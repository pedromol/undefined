import { Logger, PinoLogger } from 'nestjs-pino';

export default class StaticLogger {
  private static logger = new Logger(new PinoLogger({}), {});

  static getLogger(): Logger {
    return this.logger;
  }
}
