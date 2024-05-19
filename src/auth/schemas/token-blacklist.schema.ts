import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';

@Schema({ versionKey: false })
export class TokenBlacklist {
  _id: string;

  @Prop({ required: true, unique: true })
  jti: string;

  @Transform(({ value }) => value && Number(value))
  @Prop({ type: Date, required: true, index: { expireAfterSeconds: 0 } })
  exp: number;

  @Transform(({ value }) => value && Number(value))
  @Prop({ type: Date, default: Date.now })
  createdAt: number;
}

export type TokenBlacklistDocument = TokenBlacklist & Document;

export const TokenBlacklistSchema =
  SchemaFactory.createForClass(TokenBlacklist);
