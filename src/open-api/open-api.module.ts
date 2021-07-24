import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config/config.module';
import { OpenApiService } from './open-api.service';

@Module({
  imports: [ConfigModule],
  providers: [ConfigService, OpenApiService],
})
export class OpenApiModule {}
