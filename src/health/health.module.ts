import { Module } from '@nestjs/common';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '../cache/cache.module';
import { User } from '../user/entities/user.entity';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CacheModule],
  controllers: [HealthController],
  providers: [CacheModule, HealthService, HealthCheckService, HealthCheckExecutor, TypeOrmHealthIndicator],
})
export class HealthModule {}
