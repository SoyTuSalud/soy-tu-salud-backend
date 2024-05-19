import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '@/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { MotherModule } from '@/mother/mother.module';
import { RoleService } from './services/role.service';
import { RolesGuard } from './guards/roles.guard';
import { VerifyAccountService } from './services/verify-account.service';
import { TokenBlacklistService } from './services/token-blacklist.service';
import { TokenService } from './services/token.service';
import { TokenBlacklistController } from './controllers/token-blacklist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';
import {
  TokenBlacklist,
  TokenBlacklistSchema
} from './schemas/token-blacklist.schema';
import { TokenBlacklistCacheService } from './services/token-blacklist-cache.service';
import { TokenController } from './controllers/token.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          issuer: configService.get<string>('JWT_ISSUER', 'STS'),
          expiresIn: `${configService.get<number>('JWT_EXPIRATION_TIME')}s`
        }
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([
      {
        name: Token.name,
        schema: TokenSchema
      }
    ]),
    MongooseModule.forFeature([
      {
        name: TokenBlacklist.name,
        schema: TokenBlacklistSchema
      }
    ]),
    UserModule,
    MotherModule
  ],
  providers: [
    AuthService,
    RoleService,
    TokenService,
    TokenBlacklistService,
    TokenBlacklistCacheService,
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
  controllers: [AuthController, TokenController, TokenBlacklistController],
  exports: [AuthService]
})
export class AuthModule {}

