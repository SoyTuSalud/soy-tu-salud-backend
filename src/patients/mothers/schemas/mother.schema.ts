import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Patient } from '../../schemas/patient.schema';
import { Document } from 'mongoose';
import { MotherForm, MotherFormSchema } from './mother-form.schema';
import { OmitType } from '@nestjs/swagger';
import { PatientType } from '../../constants/patient.constants';

@Schema()
export class Mother extends OmitType(Patient, ['patientType']) {
  patientType: PatientType.MOTHER;

  @Prop({ type: MotherFormSchema })
  medicalInfo: MotherForm;
}

export type MotherDocument = Mother & Document;

export const MotherSchema = SchemaFactory.createForClass(Mother);
