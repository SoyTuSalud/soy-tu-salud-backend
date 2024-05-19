import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TokenBlacklistDto } from '../dto/token-blacklist.dto';
import { TokenBlacklist } from '../schemas/token-blacklist.schema';
import { MongoServerError } from 'mongodb';

@Injectable()
export class TokenBlacklistService {
  constructor(
    @InjectModel(TokenBlacklist.name)
    private readonly tokenBlacklistModel: Model<TokenBlacklist>
  ) {}

  async findRevokedToken(jti: string): Promise<TokenBlacklist> {
    const result = await this.tokenBlacklistModel
      .findOne({ jti })
      .exec()
      .catch((error: unknown) => {
        console.log(error);
        throw new InternalServerErrorException('Failed to find revoked token.');
      });
    if (result !== null) return result;
    throw new NotFoundException('Revoked token not found.');
  }

  async revokeToken(token: TokenBlacklistDto): Promise<void> {
    await this.tokenBlacklistModel.create(token).catch((error: unknown) => {
      if (error instanceof MongoServerError && error.code == 11000) {
        throw new ConflictException('Token is already revoked.');
      }
      console.log(error);
      throw new InternalServerErrorException('Failed to revoke token.');
    });
  }

  async deleteRevokedToken(jti: string): Promise<void> {
    const result = await this.tokenBlacklistModel
      .deleteOne({ jti })
      .exec()
      .catch((error: unknown) => {
        console.log(error);
        throw new InternalServerErrorException(
          'Failed to delete revoked token.'
        );
      });

    if (result.deletedCount === 0)
      throw new NotFoundException('Revoked token not found for deletion.');
  }
}
