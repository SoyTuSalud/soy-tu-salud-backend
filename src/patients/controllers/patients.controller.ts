import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { PatientsService } from '../services/patients.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async create(@Body() patient: CreatePatientDto) {
    await this.patientsService.create(patient);
  }

  @Get()
  async findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.patientsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() patient: UpdatePatientDto) {
    return this.patientsService.update(id, patient);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.patientsService.delete(id);
  }
}
