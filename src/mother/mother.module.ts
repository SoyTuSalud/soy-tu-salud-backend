import { Module } from '@nestjs/common';
import { MotherController } from './mother.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mother, MotherSchema } from './schemas/mother.schema';
import { MotherService } from './mother.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Mother.name,
        schema: MotherSchema
      }
    ])
  ],
  providers: [MotherService],
  controllers: [MotherController]
})
export class MotherModule {}

