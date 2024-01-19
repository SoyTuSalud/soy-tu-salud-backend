import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { MotherService } from './mother.service';
import { CreateMotherDto } from './dto/create-mother.dto';
import { UpdateMotherDto } from './dto/update-mother.dto';
import { routes } from '@/common/constants/routes.constant';

@Controller(routes.mothers.prefix)
export class MotherController {
  constructor(private readonly motherService: MotherService) {}

  @Get()
  async getAll() {
    return this.motherService.findAll();
  }

  @Get(routes.mothers.get)
  async getById(@Param('id') id: string) {
    return this.motherService.findById(id);
  }

  @Post(routes.mothers.create)
  async create(@Body() id: string, @Body() mother: CreateMotherDto) {
    return this.motherService.create(id, mother);
  }

  @Patch(routes.mothers.update)
  async update(@Param('id') id: string, @Body() mother: UpdateMotherDto) {
    return this.motherService.update(id, mother);
  }

  @Delete(routes.mothers.delete)
  async delete(@Param('id') id: string) {
    return this.motherService.delete(id);
  }
}
