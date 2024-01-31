import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';
import { TokenController } from './token.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Token.name,
        schema: TokenSchema
      }
    ])
  ],
  providers: [TokenService],
  controllers: [TokenController],
  exports: [TokenService]
})
export class TokenModule {}
