import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Address {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  state?: string;

  @Prop()
  city?: string;

  @Prop()
  zipCode?: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
