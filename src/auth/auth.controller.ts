import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '@/auth/dto/sign-in.dto';
import { Public } from '@/common/decorators/public.decorator';
import { SignUpDto } from './dto/sign-up.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { User } from '@/user/schemas/user.schema';
import { UserDto } from '@/user/dto/user.dto';
import { routes } from '@/common/constants/routes.constant';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post(routes.auth.sign_up)
  @UseInterceptors(MapInterceptor(User, UserDto))
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post(routes.auth.sign_up)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}

