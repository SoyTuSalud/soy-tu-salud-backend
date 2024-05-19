import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { Role } from '../constants/role.constants';
import { AccountStatus } from '../constants/accountStatus.constant';
import { AutoMap } from '@automapper/classes';

export class CreateUserDto {
  @AutoMap()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @AutoMap()
  @IsEnum(Role)
  @IsNotEmpty()
  readonly role: Role;

  @AutoMap()
  @IsOptional()
  @IsEnum(AccountStatus)
  @IsNotEmpty()
  readonly accountStatus: AccountStatus;
}
