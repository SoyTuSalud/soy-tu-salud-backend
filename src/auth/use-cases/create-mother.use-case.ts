import { UserService } from '@/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MotherService } from '@/mother/mother.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { CreateMotherDto } from '@/mother/dto/create-mother.dto';

@Injectable()
export class CreateMotherUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly motherService: MotherService
  ) {}

  async execute(data: SignUpDto & CreateMotherDto): Promise<void> {}
}
