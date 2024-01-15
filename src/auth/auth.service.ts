import { UsersService } from '@/users/users.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserDto } from '@/users/dto/user.dto';
import { User } from '@/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const existingUser = await this.usersService.findOneByEmail(
      signUpDto.email
    );
    if (existingUser) {
      throw new BadRequestException(
        `An account with the email address ${signUpDto.email} already exists.`
      );
    }

    const user = await this.usersService.create({
      ...signUpDto,
      password: await bcrypt.hash(signUpDto.password, 10)
    });

    return user;
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    const passwordMatch = await this.validatePassword(
      signInDto.password,
      user.password
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    return {
      role: user.role,
      email: user.email,
      accountStatus: user.accountStatus,
      access_token: await this.createAccessToken({
        sub: user.email,
        role: user.role,
        email: user.email,
        statusAccount: user.accountStatus
      })
    };
  }

  async validatePassword(match: string, password: string): Promise<boolean> {
    return await bcrypt.compare(match, password);
  }

  async createAccessToken(payload: Payload) {
    return await this.jwtService.signAsync(payload, { expiresIn: '6h' });
  }
}

