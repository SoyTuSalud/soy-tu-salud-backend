import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './schemas/patient.schema';
import { PatientsService } from './patients.service';
import { MotherController } from './mothers/mothers.controller';
import { MothersService } from './mothers/mothers.service';
import { Mother, MotherSchema } from './mothers/schemas/mother.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Patient.name,
        schema: PatientSchema,
        discriminators: [{ name: Mother.name, schema: MotherSchema }]
      }
    ])
  ],
  providers: [PatientsService, MothersService],
  controllers: [PatientsController, MotherController]
})
export class PatientsModule {}

