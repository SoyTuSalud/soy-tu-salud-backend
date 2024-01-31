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
import { JwtPayload } from '../auth.interface';
import { VerifyAccountService } from './verify-account.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
    private readonly verifyAccountService: VerifyAccountService
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

    this.verifyAccountService.sendVerificationEmail(user.email);

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

  async validatePassword(match: string, password: string): Promise<boolean> {
    return await bcrypt.compare(match, password);
  }

  async generateToken(payload: Partial<JwtPayload>) {
    return await this.jwtService.signAsync(payload, { expiresIn: '6h' });
  }
}

