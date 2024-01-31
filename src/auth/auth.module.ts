import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '@/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { MotherModule } from '@/mother/mother.module';
import { RoleService } from './services/role.service';
import { RolesGuard } from './guards/roles.guard';
import { VerifyAccountService } from './services/verify-account.service';
import { TokenModule } from '@/token/token.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<number>('JWT_EXPIRATION_TIME')}s`
        }
      }),
      inject: [ConfigService]
    }),
    TokenModule,
    UserModule,
    MotherModule
  ],
  providers: [
    AuthService,
    RoleService,
    VerifyAccountService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}

