import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { routes } from '@/common/constants/routes.constant';

@Controller(routes.patients.prefix)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  async getAll() {
    return this.patientsService.findAll();
  }

  @Get(routes.patients.get)
  async getById(@Param('id') id: string) {
    return this.patientsService.findById(id);
  }

  @Post(routes.patients.create)
  async create(@Body() patient: CreatePatientDto) {
    return this.patientsService.create(patient);
  }

  @Patch(routes.patients.update)
  async update(@Param('id') id: string, @Body() patient: UpdatePatientDto) {
    return this.patientsService.update(id, patient);
  }

  @Delete(routes.patients.delete)
  async delete(@Param('id') id: string) {
    return this.patientsService.delete(id);
  }
}
