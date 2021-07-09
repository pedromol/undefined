import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { EnvironmentVariables } from './app.config';
import { AppModule } from './app.module';
import { Logger, PinoLogger } from 'nestjs-pino';

async function bootstrap(): Promise<void> {
  return NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: false }), {
    logger: new Logger(new PinoLogger({}), {}),
  })
    .then((app: NestFastifyApplication) => {
      app.useLogger(app.get(Logger));
      const config: ConfigService<EnvironmentVariables> = app.get(ConfigService);
      return app.listen(config.get('HTTP_PORT'), '0.0.0.0');
    })
    .catch((err) => {
      console.error(JSON.stringify(err.details ? err.details : err));
      process.exit(1);
    });
}
bootstrap();
