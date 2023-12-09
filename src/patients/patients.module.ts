import { Module } from '@nestjs/common';
import { PatientsController } from './controllers/patients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './schemas/patient.schema';
import { PatientsService } from './services/patients.service';
import { MotherController } from './controllers/mother.controller';
import { MotherService } from './services/mother.service';
import { Mother, MotherSchema } from './schemas/mother.schema';

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
  providers: [PatientsService, MotherService],
  controllers: [PatientsController, MotherController]
})
export class PatientsModule {}

