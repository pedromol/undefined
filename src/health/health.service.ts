import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { Cache } from 'cache-manager';
import * as hyperid from 'hyperid';

@Injectable()
export class HealthService {
  private localKey: string = hyperid()();
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  cacheCheck(): Promise<HealthIndicatorResult> {
    return this.setCache()
      .then(() => this.getCache())
      .then((val) => this.compareCache(val));
  }

  private setCache(): Promise<void> {
    return this.cacheManager.set(this.localKey, this.localKey, { ttl: 2 });
  }

  private getCache(): Promise<string> {
    return this.cacheManager.get(this.localKey);
  }

  private compareCache(value: string): Promise<HealthIndicatorResult> {
    return Promise.resolve({
      cache: { status: value === this.localKey ? 'up' : 'down' },
    });
  }
}
