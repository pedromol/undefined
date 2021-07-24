import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from 'nestjs-pino';
import { LoggerModule } from '../logger/logger.module';
import { ClusterService } from './cluster.service';

describe('ClusterService', () => {
  let service: ClusterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, LoggerModule],
      providers: [ConfigService, ClusterService, Logger],
    }).compile();

    service = module.get<ClusterService>(ClusterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
