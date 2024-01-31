import { routes } from '@/common/constants/routes.constant';
import { Controller } from '@nestjs/common';

@Controller(routes.users.prefix)
export class UserController {}

