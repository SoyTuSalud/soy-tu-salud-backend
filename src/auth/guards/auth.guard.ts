import { IS_PUBLIC_KEY } from '@/common/decorators/public.decorator';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { extractTokenFromHeader } from '../helpers/jwt.helper';
import { TokenBlacklistService } from '../services/token-blacklist.service';
import { TokenBlacklistCacheService } from '../services/token-blacklist-cache.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly tokenBlacklistService: TokenBlacklistService,
    private readonly tokenBlacklistCacheService: TokenBlacklistCacheService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token);

      const tokenId = payload.jti;

      const blacklisted =
        this.tokenBlacklistCacheService.findRevokedToken(tokenId);
      if (blacklisted) return false;

      const result = await this.tokenBlacklistService
        .findRevokedToken(tokenId)
        .catch(() => null);
      if (!!result) {
        this.tokenBlacklistCacheService.revokeToken(tokenId);
        return false;
      }

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
