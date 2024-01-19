import { Role } from '@/user/constants/role.constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AccountStatus } from '@/user/constants/accountStatus.constant';
import { AutoMap } from '@automapper/classes';
import { ObjectId } from 'mongoose';

@Schema()
export class User {
  @AutoMap()
  _id: ObjectId;

  @AutoMap()
  @Prop({ required: true, enum: Role })
  role: string;

  @AutoMap()
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  })
  email: string;

  @AutoMap()
  @Prop({ required: true })
  password: string;

  @AutoMap()
  @Prop({ required: true, enum: AccountStatus })
  accountStatus: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
