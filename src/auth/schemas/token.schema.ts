import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TokenType } from '../constants/token-type.constant';
import { Transform } from 'class-transformer';

@Schema({ timestamps: true, versionKey: false })
export class Token {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true, index: true })
  code: string;

  @Prop({ type: String, required: true, enum: TokenType })
  type: TokenType;

  @Transform(({ value }) => value && Number(value))
  @Prop({ type: Date, required: true, index: { expireAfterSeconds: 0 } })
  expiresAt: number;
}

export type TokenDocument = Token & Document;

export const TokenSchema = SchemaFactory.createForClass(Token);
