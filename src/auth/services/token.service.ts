import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TokenDto } from '../dto/token.dto';
import { ConfigService } from '@nestjs/config';
import { Token } from '../schemas/token.schema';
import { MongoServerError } from 'mongodb';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
    private readonly configService: ConfigService
  ) {}

  async findToken(token: TokenDto): Promise<Token> {
    const result = await this.tokenModel
      .findOne(token)
      .exec()
      .catch((error: unknown) => {
        console.log(error);
        throw new InternalServerErrorException('Failed to find token.');
      });

    if (result !== null) return result;
    throw new NotFoundException('Token has expired.');
  }

  async createToken(token: TokenDto): Promise<void> {
    const ttl = this.configService.get<number>('TOKEN_TTL_IN_SECONDS');
    await this.tokenModel
      .create({
        ...token,
        expiresAt: new Date(Date.now() + ttl * 1000)
      })
      .catch((error: unknown) => {
        if (error instanceof MongoServerError && error.code == 11000) {
          throw new ConflictException('Token already exists.');
        }
        console.log(error);
        throw new InternalServerErrorException('Failed to save the token.');
      });
  }

  async deleteToken(token: TokenDto): Promise<void> {
    const result = await this.tokenModel
      .deleteOne(token)
      .exec()
      .catch((error: unknown) => {
        console.log(error);
        throw new InternalServerErrorException(
          'Failed to delete revoked token.'
        );
      });

    if (result.deletedCount === 0)
      throw new NotFoundException('Token not found for deletion.');
  }
}
