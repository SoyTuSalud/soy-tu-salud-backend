import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TokenTypeEnum } from '../constants/tokenType.constant';

@Schema({ timestamps: true, versionKey: false })
export class Token {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  })
  email: string;

  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ required: true, enum: TokenTypeEnum })
  type: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export type TokenDocument = Token & Document;

export const TokenSchema = SchemaFactory.createForClass(Token).index(
  { createdAt: 1 },
  { expireAfterSeconds: 21600 }
);
