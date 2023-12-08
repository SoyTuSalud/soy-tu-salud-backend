import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { PatientsModule } from '@/patients/patients.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('ENV_DB_CONNECT')
      }),
      inject: [ConfigService]
    }),
    PatientsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
