import { Injectable } from '@nestjs/common';
import { MotherService } from '@/mother/mother.service';
import { RoleSpecificDataDto } from '../dto/create-role.dto';
import { Role } from '@/user/constants/role.constants';

@Injectable()
export class RoleService {
  constructor(private readonly motherService: MotherService) {}

  async createRoleSpecificDocument(
    id: string,
    role: string,
    data: RoleSpecificDataDto
  ) {
    switch (role) {
      case Role.ADMIN:
        return;
      case Role.MOTHER:
        return await this.motherService.create(id, data);
      case Role.PHILANTHROPIST:
        return;
      case Role.PROVIDER:
        return;
    }
  }
}
