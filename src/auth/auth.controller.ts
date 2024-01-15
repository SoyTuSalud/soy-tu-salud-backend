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
import { User } from '@/users/schemas/user.schema';
import { UserDto } from '@/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @UseInterceptors(MapInterceptor(User, UserDto))
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}

