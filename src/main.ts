if (process.env['NEW_RELIC_APP_NAME'] && process.env['NEW_RELIC_LICENSE_KEY']) {
  require('newrelic');
}

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { EnvironmentVariables } from './config/config.schema';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import Crash from './common/helpers/crash';
import StaticLogger from './logger/logger.static';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ClusterService } from './cluster/cluster.service';
import { OpenApiService } from './open-api/open-api.service';
import * as fastify from 'fastify';

process.on('uncaughtException', (err: Error) => Crash.logAndExit('UncaughtException', err));
process.on('unhandledRejection', (err: Error) => Crash.logAndExit('UnhandledRejection', err));

async function bootstrap(): Promise<void> {
  const fastifyInstance = fastify.hasOwnProperty('__NR_instrumented')
    ? fastify['__NR_original']({ logger: false })
    : fastify.fastify({ logger: false });

  return NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(fastifyInstance), {
    logger: StaticLogger.getLogger(),
  })
    .then((app: NestFastifyApplication) => {
      app.useLogger(app.get(Logger));
      app.enableVersioning({ type: VersioningType.URI });
      app.useGlobalPipes(new ValidationPipe());

      const config: ConfigService<EnvironmentVariables> = app.get(ConfigService);

      app.get(OpenApiService).start(app);

      return app.get(ClusterService).start(() => app.listen(config.get('HTTP_PORT'), '0.0.0.0'));
    })
    .catch((err) => {
      Crash.logAndExit('bootstrap', err);
    });
}

bootstrap();
