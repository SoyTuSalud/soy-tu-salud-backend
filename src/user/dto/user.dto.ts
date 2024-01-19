import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../constants/role.constants';
import { AccountStatus } from '../constants/accountStatus.constant';
import { AutoMap } from '@automapper/classes';

export class UserDto {
  @AutoMap()
  @IsEnum(Role)
  @IsNotEmpty()
  readonly role: Role;

  @AutoMap()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @AutoMap()
  @IsEnum(AccountStatus)
  @IsNotEmpty()
  readonly accountStatus: AccountStatus;
}