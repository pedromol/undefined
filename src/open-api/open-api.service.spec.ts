import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { OpenApiService } from './open-api.service';

describe('OpenApiService', () => {
  let service: OpenApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ConfigService, OpenApiService],
    }).compile();

    service = module.get<OpenApiService>(OpenApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
