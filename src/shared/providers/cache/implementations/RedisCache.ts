import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '../../../../config/cache';

export default class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any, seconds = 60): Promise<void> {
    await this.client.set(key, JSON.stringify(value), 'EX', seconds);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data);

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}
