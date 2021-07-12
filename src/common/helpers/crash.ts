import StaticLogger from '../../logger/logger.static';

export default class Crash {
  static logAndExit(context: string, err: Error, exitCode = 1): void {
    StaticLogger.getLogger().error(err?.message ? err.message : JSON.stringify(err), err?.stack, context);
    process.exit(exitCode);
  }
}
