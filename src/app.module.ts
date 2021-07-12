import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';
import { CacheModule } from './cache/cache.module';
import { OrmModule } from './orm/orm.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, CacheModule, LoggerModule, OrmModule, TerminusModule, HealthModule, UserModule],
  exports: [ConfigModule, CacheModule, LoggerModule, OrmModule],
})
export class AppModule {}
