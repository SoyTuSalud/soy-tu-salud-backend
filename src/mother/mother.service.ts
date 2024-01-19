import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Mother } from './schemas/mother.schema';
import { UpdateMotherDto } from './dto/update-mother.dto';
import { CreateMotherDto } from './dto/create-mother.dto';

@Injectable()
export class MotherService {
  constructor(
    @InjectModel(Mother.name) private readonly motherModel: Model<Mother>
  ) {}

  async findAll(): Promise<Mother[]> {
    return await this.motherModel.find().exec();
  }

  async findById(id: string): Promise<Mother> {
    return await this.motherModel.findOne({ documentId: id }).exec();
  }

  async create(mother: CreateMotherDto): Promise<Mother> {
    return await this.motherModel.create(mother);
  }

  async update(id: string, mother: UpdateMotherDto): Promise<Mother> {
    return await this.motherModel
      .findOneAndUpdate({ documentId: id }, mother)
      .exec();
  }

  async delete(id: string) {
    return await this.motherModel.findOneAndDelete({ documentId: id }).exec();
  }
}
