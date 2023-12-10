import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { MothersService } from './mothers.service';
import { routes } from '@/common/constants/routes.constant';
import { CreateMotherDto } from './dto/create-mother.dto';
import { UpdateMotherDto } from './dto/update-mother.dto';

@Controller('mothers')
export class MotherController {
  constructor(private readonly mothersService: MothersService) {}

  @Get()
  async getAll() {
    return this.mothersService.findAll();
  }

  @Get(routes.mothers.get)
  async getById(@Param('id') id: string) {
    return this.mothersService.findById(id);
  }

  @Post(routes.mothers.create)
  async create(@Body() patient: CreateMotherDto) {
    return this.mothersService.create(patient);
  }

  @Patch(routes.mothers.update)
  async update(@Param('id') id: string, @Body() patient: UpdateMotherDto) {
    return this.mothersService.update(id, patient);
  }

  @Delete(routes.mothers.delete)
  async delete(@Param('id') id: string) {
    return this.mothersService.delete(id);
  }
}

