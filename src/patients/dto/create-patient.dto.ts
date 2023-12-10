import { DocumentType } from '../../common/constants/documentType.constants';
import { PatientType } from '../constants/patient.constants';
import { AddressDto } from '@/common/dto/address.dto';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../constants/gender.constants';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEnum(DocumentType)
  @IsNotEmpty()
  readonly documentType: DocumentType;

  @IsString()
  @IsNotEmpty()
  readonly documentId: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly dob?: string;

  @IsString()
  @IsOptional()
  readonly photo?: string;

  @Type(() => AddressDto)
  @ValidateNested()
  @IsNotEmpty()
  readonly address: AddressDto;

  @IsEnum(Gender)
  @IsOptional()
  readonly gender?: Gender;

  @IsString()
  @IsOptional()
  readonly genderIdentity?: string;

  @IsString()
  @IsOptional()
  readonly sexualOrientation?: string;

  @IsString()
  @IsOptional()
  readonly populationGroup?: string;

  @IsString()
  @IsOptional()
  readonly sisben?: string;

  @IsString()
  @IsOptional()
  readonly eps?: string;

  @IsEnum(PatientType)
  @IsOptional()
  readonly patientType: PatientType;
}
