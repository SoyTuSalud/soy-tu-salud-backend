import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Gender } from '../constants/gender.constants';
import { DocumentType } from '@/common/constants/documentType.constants';
import { Address, AddressSchema } from '@/common/schemas/address.schema';
import { Document } from 'mongoose';
import { MotherForm, MotherFormSchema } from './mother-form.schema';

@Schema()
export class Mother {
  _id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, enum: DocumentType })
  documentType: string;

  @Prop({ required: true, index: { unique: true } })
  documentId: string;

  @Prop({ required: true, validate: /^\d{10}$/ })
  phone: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  })
  email: string;

  @Prop(Date)
  dob: string;

  @Prop()
  photo: string;

  @Prop({ type: AddressSchema, required: true })
  address: Address;

  // --------- IDENTIFICATION ---------
  @Prop({ enum: Gender })
  gender: string;

  @Prop()
  genderIdentity: string;

  @Prop()
  sexualOrientation: string;

  // --------- OTHER ---------
  @Prop()
  populationGroup: string;

  @Prop()
  sisben: string;

  @Prop()
  eps: string;

  @Prop()
  clinicalHistory: string;

  @Prop({ type: MotherFormSchema })
  medicalInfo: MotherForm;
}

export type MotherDocument = Mother & Document;

export const MotherSchema = SchemaFactory.createForClass(Mother);
