import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '@/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { MotherModule } from '@/mother/mother.module';
import { RoleService } from './services/role.service';

@Module({
  imports: [
    UserModule,
    MotherModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<number>('JWT_EXPIRATION_TIME')}s`
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    AuthService,
    RoleService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}

