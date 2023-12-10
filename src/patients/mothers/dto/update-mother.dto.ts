import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateMotherDto } from './create-mother.dto';

export class UpdateMotherDto extends PartialType(
  OmitType(CreateMotherDto, ['patientType'] as const)
) {}
