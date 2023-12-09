import { Address } from '@/common/interfaces/address.interface';
import { DocumentType } from '../../common/constants/documentType.constants';
import { PatientType } from '../constants/patient.constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty()
  readonly patientType: PatientType;
  @ApiProperty()
  readonly firstName: string;
  @ApiProperty()
  readonly lastName: string;
  @ApiProperty()
  readonly documentType: DocumentType;
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly phone: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly dob?: string;
  @ApiProperty()
  readonly photo?: string;
  @ApiProperty()
  readonly address?: Address;

  @ApiProperty()
  readonly gender?: string;
  @ApiProperty()
  readonly genderIdentity?: string;
  @ApiProperty()
  readonly sexualOrientation?: string;

  @ApiProperty()
  readonly populationGroup?: string;
  @ApiProperty()
  readonly sisben?: string;
  @ApiProperty()
  readonly eps?: string;
}
