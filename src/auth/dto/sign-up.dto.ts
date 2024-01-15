import { AccountStatus } from '@/users/constants/accountStatus.constant';
import { CreateUserDto } from '@/users/dto/create-user.dto';

export class SignUpDto extends CreateUserDto {
  readonly accountStatus = AccountStatus.UNVERIFIED;
}
