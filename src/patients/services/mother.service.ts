import { Injectable } from '@nestjs/common';
import { Mother } from '../schemas/mother.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMotherDto } from '../dto/create-mother.dto';
import { UpdateMotherDto } from '../dto/update-mother.dto';

@Injectable()
export class MotherService {
  constructor(
    @InjectModel(Mother.name) private readonly motherModel: Model<Mother>
  ) {}

  async create(mother: CreateMotherDto): Promise<Mother> {
    return await this.motherModel.create(mother);
  }

  async findAll(): Promise<Mother[]> {
    return await this.motherModel.find().exec();
  }

  async findById(id: string): Promise<Mother> {
    return await this.motherModel.findById(id).exec();
  }

  async update(id: string, mother: UpdateMotherDto): Promise<Mother> {
    return await this.motherModel.findByIdAndUpdate(id, mother).exec();
  }

  async delete(id: string) {
    return await this.motherModel.findByIdAndDelete(id).exec();
  }
}

