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
import { ConfigService } from '@nestjs/config';
import { RoleSpecificDataDto } from '../dto/create-role.dto';
import { RoleService } from './role.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
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
      password: await bcrypt.hash(signUpDto.password, 10)
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
      access_token: await this.generateToken({
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

  async generateToken(payload: Payload) {
    return await this.jwtService.signAsync(payload, { expiresIn: '6h' });
  }

  getCookieWithJwtToken(payload: Payload) {
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME'
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}

