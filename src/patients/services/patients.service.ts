import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Patient } from '../schemas/patient.schema';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { CreatePatientDto } from '../dto/create-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>
  ) {}

  async create(patient: CreatePatientDto): Promise<Patient> {
    return await this.patientModel.create(patient);
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientModel.find().exec();
  }

  async findById(id: string): Promise<Patient> {
    return await this.patientModel.findById(id).exec();
  }

  async update(id: string, patient: UpdatePatientDto): Promise<Patient> {
    return await this.patientModel.findByIdAndUpdate(id, patient).exec();
  }

  async delete(id: string) {
    return await this.patientModel.findByIdAndDelete(id).exec();
  }
}
