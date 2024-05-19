import { LRUCache } from 'lru-cache';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenBlacklistCacheService {
  private readonly tokenBlacklistCache: LRUCache<string, boolean>;

  constructor() {
    this.tokenBlacklistCache = new LRUCache({
      max: 500,
      ttl: 1000 * 60 * 60,
      allowStale: false,
      updateAgeOnGet: false,
      updateAgeOnHas: false
    });
  }

  findRevokedToken(tokenId: string): boolean {
    const blacklisted = this.tokenBlacklistCache.get(tokenId);
    return typeof blacklisted !== 'undefined' ? blacklisted : false;
  }

  revokeToken(tokenId: string): void {
    this.tokenBlacklistCache.set(tokenId, true);
  }
}
