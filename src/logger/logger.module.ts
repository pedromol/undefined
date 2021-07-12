import { Module } from '@nestjs/common';
import * as Pino from 'nestjs-pino';

@Module({
  imports: [Pino.LoggerModule.forRoot()],
  exports: [LoggerModule],
})
export class LoggerModule {}
