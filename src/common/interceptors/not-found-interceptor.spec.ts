import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundInterceptor } from './not-found-interceptor';

describe('NotFoundInterceptor', () => {
  let provider: NotFoundInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotFoundInterceptor],
    }).compile();

    provider = module.get<NotFoundInterceptor>(NotFoundInterceptor);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
