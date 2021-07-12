import { Module } from '@nestjs/common';
import * as Nest from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import StaticLogger from '../logger/logger.static';
import Crash from '../common/helpers/crash';

@Module({
  imports: [
    Nest.CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 3,
        retry_strategy: (options): number => {
          if (options.attempt > 10) {
            Crash.logAndExit('CacheModule', options);
          } else {
            StaticLogger.getLogger().error(options, undefined, 'CacheModule');
          }
          return options.attempt * 1000;
        },
      }),
    }),
  ],
  exports: [CacheModule, Nest.CacheModule],
})
export class CacheModule {}
