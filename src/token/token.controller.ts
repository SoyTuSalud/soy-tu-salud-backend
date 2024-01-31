import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenType } from './constants/token-type.constant';
import { Public } from '@/common/decorators/public.decorator';
import { TokenDto } from './dto/token.dto';

@Controller('tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}
  @Public()
  @Post()
  async create(@Body() token: TokenDto) {
    return this.tokenService.createToken({ ...token });
  }
}
