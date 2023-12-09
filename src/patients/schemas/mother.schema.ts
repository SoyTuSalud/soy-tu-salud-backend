import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Patient } from './patient.schema';
import { MotherForm } from '../interfaces/mother-form.interface';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Mother extends Patient {
  @Prop(Object)
  medicalInfo: MotherForm;
}

export type MotherDocument = HydratedDocument<Mother>;

export const MotherSchema = SchemaFactory.createForClass(Mother);
