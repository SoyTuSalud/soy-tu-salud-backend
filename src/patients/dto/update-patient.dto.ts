import { Disability } from '../constants/disability.const';
import { Gender } from '../enums/gender.enum';

export class UpdatePatientDto {
  readonly dob?: string;
  readonly photo?: string;

  readonly state?: string;
  readonly city?: string;
  readonly address?: string;

  readonly populationGroup?: string;
  // readonly isDisabled?: boolean;
  // readonly disability?: Disability;
  // readonly isVictimOfViolence?: boolean;

  // readonly gender?: Gender;
  // readonly genderIdentity?: string;
  // readonly sexualOrientation?: string;

  readonly eps?: string;
  readonly sisben?: string;

  readonly requestedServices?: string[];
  readonly clinicalHistory?: string;
  readonly requestDate?: string;

  // formularioTuHistoria: boolean
  // tuHistoria?: string // video
  // aplicaEnFundacion?: boolean
  // matchService?: boolean
  // comunidad?: string

  // autorizacionFoto?: boolean
  // recopilacionDatos?: boolean
}
