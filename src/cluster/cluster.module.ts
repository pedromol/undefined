import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { ClusterService } from './cluster.service';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [ConfigService, Logger, ClusterService],
  exports: [ClusterService],
})
export class ClusterModule {}
