import { BadRequestException, Injectable } from '@nestjs/common';
import { Token } from './schemas/token.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>
  ) {}

  async createToken(token: Token): Promise<void> {
    await this.tokenModel.create(token).catch((e: unknown) => {
      throw new BadRequestException();
    });
  }

  async deleteToken(email: string): Promise<void> {
    await this.tokenModel
      .findOneAndDelete({ email })
      .exec()
      .catch((e: unknown) => {
        throw new BadRequestException();
      });
  }

  async useToken(email: string, token: string, type: string): Promise<void> {
    await this.tokenModel
      .findOneAndDelete({ email, token, type })
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

  async validateToken(
    email: string,
    token: string,
    type: string
  ): Promise<void> {
    await this.tokenModel
      .findOne({ email, token, type })
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

