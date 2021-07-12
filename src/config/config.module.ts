import { Module } from '@nestjs/common';
import * as Nest from '@nestjs/config';
import configuration from './config.schema';

@Module({
  imports: [
    Nest.ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigModule {}
