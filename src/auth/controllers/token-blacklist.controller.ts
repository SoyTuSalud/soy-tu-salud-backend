import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post
} from '@nestjs/common';
import { Public } from '@/common/decorators/public.decorator';
import { routes } from '@/common/constants/routes.constant';
import { TokenBlacklistService } from '../services/token-blacklist.service';
import { TokenBlacklistDto } from '../dto/token-blacklist.dto';

@Controller(`${routes.blacklists.prefix}/${routes.blacklists.tokens.prefix}`)
export class TokenBlacklistController {
  constructor(private readonly tokenBlacklistService: TokenBlacklistService) {}

  @Public()
  @Get(routes.blacklists.tokens.get)
  async get(@Param('jti') jti: string) {
    return this.tokenBlacklistService.findRevokedToken(jti);
  }

  @Public()
  @Post()
  async create(@Body() token: TokenBlacklistDto) {
    return this.tokenBlacklistService.revokeToken(token);
  }

  @Public()
  @Delete(routes.blacklists.tokens.delete)
  async delete(@Param('jti') jti: string) {
    return this.tokenBlacklistService.deleteRevokedToken(jti);
  }
}
