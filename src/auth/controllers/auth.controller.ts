import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseInterceptors
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '@/auth/dto/sign-in.dto';
import { Public } from '@/common/decorators/public.decorator';
import { SignUpDto } from '../dto/sign-up.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { User } from '@/user/schemas/user.schema';
import { UserDto } from '@/user/dto/user.dto';
import { routes } from '@/common/constants/routes.constant';
import { RoleSpecificDataDto } from '../dto/create-role.dto';
import { Request } from 'express';
import { VerifyAccountService } from '../services/verify-account.service';
import { extractTokenFromHeader } from '../helpers/jwt.helper';
import { TokenBlacklistService } from '../services/token-blacklist.service';

@Controller(routes.auth.prefix)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly verifyAccountService: VerifyAccountService
  ) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post(routes.auth.sign_up)
  @UseInterceptors(MapInterceptor(User, UserDto))
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Body() roleSpecificDataDto: RoleSpecificDataDto
  ) {
    const user = await this.authService.signUp(signUpDto, roleSpecificDataDto);
    await this.verifyAccountService.sendVerificationEmail(user._id, user.email);
    return user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post(routes.auth.sign_in)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post(routes.auth.logout)
  async logout(@Req() req: Request) {
    const payload = req['user'];
    await this.authService.logout(payload);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post(routes.auth.verify)
  async verify(@Body('userId') userId: string, @Body('code') code: string) {
    await this.verifyAccountService.verifyAccount(userId, code);
  }
}

