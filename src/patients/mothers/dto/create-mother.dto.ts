import { Type } from 'class-transformer';
import { MotherFormDto } from './mother-form.dto';
import { CreatePatientDto } from '../../dto/create-patient.dto';
import { IsOptional, ValidateNested } from 'class-validator';

export class CreateMotherDto extends CreatePatientDto {
  @Type(() => MotherFormDto)
  @ValidateNested()
  @IsOptional()
  readonly medicalInfo: MotherFormDto;
}
