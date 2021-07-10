import StaticLogger from './staticLogger';

export default class Crash {
  static logAndExit(context: string, err: Error, exitCode = 1): void {
    StaticLogger.getLogger().error(err.message, err.stack, context);
    process.exit(exitCode);
  }
}
