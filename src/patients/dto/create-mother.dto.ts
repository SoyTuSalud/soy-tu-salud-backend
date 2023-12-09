import { PatientType } from '../constants/patient.constants';
import { MotherForm } from '../interfaces/mother-form.interface';
import { CreatePatientDto } from './create-patient.dto';

export class CreateMotherDto extends CreatePatientDto {
  readonly patientType: PatientType = PatientType.MOTHER;
  readonly medicalInfo: MotherForm;
}
