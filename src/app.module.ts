import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';
import { CacheModule } from './cache/cache.module';
import { OrmModule } from './orm/orm.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from './config/config.module';
import { OpenApiModule } from './open-api/open-api.module';

@Module({
  imports: [ConfigModule, CacheModule, LoggerModule, OrmModule, HealthModule, UserModule, OpenApiModule],
})
export class AppModule {}
