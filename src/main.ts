import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { EnvironmentVariables } from './config/config.schema';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import Crash from './common/helpers/crash';
import StaticLogger from './logger/logger.static';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { ClusterService } from './cluster/cluster.service';

process.on('uncaughtException', (err: Error) => Crash.logAndExit('UncaughtException', err));
process.on('unhandledRejection', (err: Error) => Crash.logAndExit('UnhandledRejection', err));

async function bootstrap(): Promise<void> {
  return NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: false }), {
    logger: StaticLogger.getLogger(),
  })
    .then((app: NestFastifyApplication) => {
      app.useLogger(app.get(Logger));
      app.enableVersioning({ type: VersioningType.URI });

      const packageJson = JSON.parse(readFileSync('package.json').toString());
      const openApiConfig = new DocumentBuilder()
        .setTitle(packageJson.name)
        .setDescription(packageJson.description)
        .setVersion(packageJson.version)
        .build();
      const document = SwaggerModule.createDocument(app, openApiConfig);
      SwaggerModule.setup('api', app, document);

      const config: ConfigService<EnvironmentVariables> = app.get(ConfigService);
      return app.listen(config.get('HTTP_PORT'), '0.0.0.0');
    })
    .catch((err) => {
      Crash.logAndExit('bootstrap', err);
    });
}
ClusterService.createCluster(bootstrap);
