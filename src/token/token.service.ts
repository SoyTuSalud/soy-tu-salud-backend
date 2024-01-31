import { BadRequestException, Injectable } from '@nestjs/common';
import { Token } from './schemas/token.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TokenDto } from './dto/token.dto';
import { ConfigService } from '@nestjs/config';
import { TokenType } from './constants/token-type.constant';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
    private readonly configService: ConfigService
  ) {
    async function init() {
      try {
        await tokenModel.collection.dropIndex('code_ttl');
        await tokenModel.collection.dropIndex('jwt_ttl');
      } catch (error) {}

      await tokenModel.collection.createIndex(
        { createdAt: 1 },
        {
          name: 'code_token_ttl',
          partialFilterExpression: {
            type: {
              $in: [TokenType.EMAIL_VERIFICATION, TokenType.PASSWORD_RESET]
            }
          },
          expireAfterSeconds:
            configService.get<number>('CODE_TOKEN_TTL_IN_SECONDS', 0) * 1
        }
      );

      await tokenModel.collection.createIndex(
        { createdAt: 1 },
        {
          name: 'jwt_token_ttl',
          partialFilterExpression: { type: { $in: [TokenType.ACCESS] } },
          expireAfterSeconds:
            configService.get<number>('JWT_TOKEN_TTL_IN_SECONDS', 0) * 1
        }
      );
    }

    init();
  }

  async createToken(token: TokenDto): Promise<void> {
    await this.tokenModel.create(token).catch((e: unknown) => {
      console.log(e);
      throw new BadRequestException();
    });
  }

  async deleteToken(token: TokenDto): Promise<void> {
    await this.tokenModel
      .findOneAndDelete({ ...token })
      .exec()
      .then(data => {
        if (data === null) {
          throw new BadRequestException();
        }
      })
      .catch((e: unknown) => {
        throw new BadRequestException();
      });
  }

  async validateToken(token: TokenDto): Promise<void> {
    await this.tokenModel
      .findOne({ ...token })
      .exec()
      .then(data => {
        if (data === null) {
          throw new BadRequestException();
        }
      })
      .catch((e: unknown) => {
        throw new BadRequestException();
      });
  }
}
