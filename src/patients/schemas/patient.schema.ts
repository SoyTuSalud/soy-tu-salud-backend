import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Gender } from '../constants/gender.constants';
import { DocumentType } from '@/common/constants/documentType.constants';
import { PatientType } from '../constants/patient.constants';
import { Address, AddressSchema } from '@/common/schemas/address.schema';

@Schema({ _id: false, discriminatorKey: 'patientType' })
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

  @Prop({ required: true, enum: PatientType, default: PatientType.MOTHER })
  patientType: string;
}

export type PatientDocument = HydratedDocument<Patient>;

export const PatientSchema = SchemaFactory.createForClass(Patient);
