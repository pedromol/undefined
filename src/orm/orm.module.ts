import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config/config.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        if (configService.get('MYSQL_HOST') === 'true') {
          return {
            type: 'mysql',
            host: configService.get('MYSQL_HOST'),
            port: configService.get('MYSQL_PORT'),
            username: configService.get('MYSQL_USERNAME'),
            password: configService.get('MYSQL_PASSWORD'),
            database: configService.get('MYSQL_DATABASE'),
            synchronize: ['localhost', 'db'].includes(configService.get('MYSQL_HOST')) ? true : false,
            autoLoadEntities: true,
          };
        }

        return {
          type: 'sqljs',
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  exports: [OrmModule],
})
export class OrmModule {}
