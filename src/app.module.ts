import { Module, CacheModule } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HealthService } from './health/health.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    LoggerModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('RDS_HOST'),
        port: configService.get('RDS_PORT'),
        username: configService.get('RDS_USERNAME'),
        password: configService.get('RDS_PASSWORD'),
        database: configService.get('RDS_DATABASE'),
        synchronize: ['localhost', 'db'].includes(configService.get('RDS_HOST')) ? true : false,
        autoLoadEntities: true,
      }),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('RDS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 0,
      }),
    }),
    TerminusModule,
    UserModule,
  ],
  controllers: [UserController, HealthController],
  providers: [UserService, HealthService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
