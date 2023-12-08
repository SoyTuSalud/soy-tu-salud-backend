import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Gender } from '../enums/gender.enum';
import { Address } from '@/common/interfaces/address.interface';
import { DocumentType } from '@/common/enums/documentType.enum';

@Schema()
export class Patient {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, enum: DocumentType })
  documentType: string;

  @Prop({ required: true, index: { unique: true } })
  id: string;

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

  @Prop(Object)
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
}

export type PatientDocument = HydratedDocument<Patient>;

export const PatientSchema = SchemaFactory.createForClass(Patient);
