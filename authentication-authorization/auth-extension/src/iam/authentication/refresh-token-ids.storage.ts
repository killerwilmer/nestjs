import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

// 💡 Ideally this should be in a separate file - putting this here for brevity
export class InvalidatedRefreshTokenError extends Error {}

@Injectable()
export class RefreshTokenIdsStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: RedisClientType;

  async onApplicationBootstrap() {
    // ⚡ Conexión con redis@4
    this.redisClient = createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: +(process.env.REDIS_PORT || 6379),
      },
    });

    this.redisClient.on('error', (err) =>
      console.error('Redis Client Error', err),
    );

    await this.redisClient.connect();
  }

  async onApplicationShutdown(signal?: string) {
    if (this.redisClient) {
      await this.redisClient.quit();
    }
  }

  async insert(userId: number, tokenId: string): Promise<void> {
    await this.redisClient.set(this.getKey(userId), tokenId);
  }

  async validate(userId: number, tokenId: string): Promise<boolean> {
    const storedId = await this.redisClient.get(this.getKey(userId));
    if (storedId !== tokenId) {
      throw new InvalidatedRefreshTokenError();
    }
    return storedId === tokenId;
  }

  async invalidate(userId: number): Promise<void> {
    await this.redisClient.del(this.getKey(userId));
  }

  private getKey(userId: number): string {
    return `user-${userId}`;
  }
}
