import { Address } from '@/common/interfaces/address.interface';
import { DocumentType } from '../../common/enums/documentType.enum';

export class CreatePatientDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly documentType: DocumentType;
  readonly id: string;
  readonly phone: string;
  readonly email: string;
  readonly dob?: string;
  readonly photo?: string;
  readonly address?: Address;
}
