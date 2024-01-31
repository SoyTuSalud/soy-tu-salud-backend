import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TokenType } from '../constants/token-type.constant';
import { Transform } from 'class-transformer';

@Schema({ timestamps: true, versionKey: false })
export class Token {
  _id: string;

  @Prop({ required: true, trim: true })
  email: string;

  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ required: true, enum: TokenType })
  type: string;

  @Transform(({ value }) => value && Number(value))
  createdAt: number;

  @Transform(({ value }) => value && Number(value))
  updatedAt: number;
}

export type TokenDocument = Token & Document;

export const TokenSchema = SchemaFactory.createForClass(Token);
