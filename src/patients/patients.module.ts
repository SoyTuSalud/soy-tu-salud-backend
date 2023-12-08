import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './schemas/patient.schema';
import { PatientsService } from './patients.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }])
  ],
  providers: [PatientsService],
  controllers: [PatientsController]
})
export class PatientsModule {}

