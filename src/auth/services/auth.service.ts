import { UserService } from '@/user/user.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { User } from '@/user/schemas/user.schema';
import { RoleSpecificDataDto } from '../dto/create-role.dto';
import { RoleService } from './role.service';
import { AccessToken, JwtPayload } from '../interfaces/jwt.interface';
import { TokenBlacklistService } from '@/auth/services/token-blacklist.service';
import { nanoid } from 'nanoid';
import { TokenBlacklistCacheService } from './token-blacklist-cache.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
    private readonly tokenBlacklistService: TokenBlacklistService,
    private readonly tokenBlacklistCacheService: TokenBlacklistCacheService
  ) {}

  async signUp(
    signUpDto: SignUpDto,
    roleSpecificDataDto: RoleSpecificDataDto
  ): Promise<User> {
    const existingUser = await this.userService.findOneByEmail(signUpDto.email);
    if (existingUser) {
      throw new BadRequestException(
        `An account with the email address ${signUpDto.email} already exists.`
      );
    }

    const user = await this.userService.create({
      ...signUpDto,
      password: await this.encryptPassword(signUpDto.password)
    });

    this.roleService.createRoleSpecificDocument(
      user._id,
      user.role,
      roleSpecificDataDto
    );

    return user;
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findOneByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const passwordMatch = await this.validatePassword(
      signInDto.password,
      user.password
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const accessToken = await this.generateToken({
      sub: user._id,
      email: user.email,
      role: user.role,
      statusAccount: user.accountStatus
    });

    return { user, accessToken };
  }

  async logout(payload: AccessToken) {
    this.tokenBlacklistCacheService.revokeToken(payload.jti);

    await this.tokenBlacklistService.revokeToken({
      jti: payload.jti,
      exp: payload.exp * 1000
    });
  }

  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async validatePassword(match: string, password: string): Promise<boolean> {
    return await bcrypt.compare(match, password);
  }

  async generateToken(payload: Partial<JwtPayload>) {
    return await this.jwtService.signAsync(payload, { jwtid: nanoid() });
  }
}

