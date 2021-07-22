import { LoggerService, Module } from '@nestjs/common';
import * as Nest from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { LoggerModule } from 'src/logger/logger.module';
import { PinoLogger } from 'nestjs-pino';
import Crash from 'src/common/helpers/crash';

@Module({
  imports: [
    Nest.CacheModule.registerAsync({
      imports: [ConfigModule, LoggerModule],
      inject: [ConfigService, PinoLogger],
      useFactory: (configService: ConfigService, loggerService: LoggerService) => ({
        store: configService.get('REDIS_ENABLED') === 'true' ? redisStore : 'memory',
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 3,
        retry_strategy: (options): number => {
          loggerService.error({ context: 'CacheModule', ...options });

          if (options.attempt > 10) {
            Crash.logAndExit('CacheModule', options);
          }
          return options.attempt * 1000;
        },
      }),
    }),
  ],
  exports: [CacheModule, Nest.CacheModule],
})
export class CacheModule {}
