import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseInterceptors
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SignInDto } from '@/auth/dto/sign-in.dto';
import { Public } from '@/common/decorators/public.decorator';
import { SignUpDto } from './dto/sign-up.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { User } from '@/user/schemas/user.schema';
import { UserDto } from '@/user/dto/user.dto';
import { routes } from '@/common/constants/routes.constant';
import { RoleSpecificDataDto } from './dto/create-role.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post(routes.auth.sign_up)
  @UseInterceptors(MapInterceptor(User, UserDto))
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Body() roleSpecificDataDto: RoleSpecificDataDto
  ) {
    return this.authService.signUp(signUpDto, roleSpecificDataDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post(routes.auth.sign_up)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { user, accessToken } = await this.authService.signIn(signInDto);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      path: '/',
      maxAge: this.configService.get('JWT_EXPIRATION_TIME')
    });
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post(routes.auth.logout)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('jwt', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0
    });
  }
}

