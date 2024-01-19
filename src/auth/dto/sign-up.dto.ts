import { AccountStatus } from '@/user/constants/accountStatus.constant';
import { CreateUserDto } from '@/user/dto/create-user.dto';

export class SignUpDto extends CreateUserDto {
  readonly accountStatus = AccountStatus.UNVERIFIED;
}
