import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CacheModule } from '../cache/cache.module';
import { InterceptorsModule } from 'src/common/interceptors/interceptors.module';
import { NotFoundInterceptor } from 'src/common/interceptors/not-found-interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CacheModule, InterceptorsModule],
  controllers: [UserController],
  providers: [CacheModule, UserService, NotFoundInterceptor],
})
export class UserModule {}
