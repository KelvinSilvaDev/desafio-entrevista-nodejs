import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment } from 'src/establishment/entities/establishment.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { ParkingRecord } from 'src/parking-record/entities/parking-record.entity';
import { EstablishmentService } from 'src/establishment/establishment.service';
import { ConfigModule } from '@nestjs/config';
import { Report } from './entities/report.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Establishment, Vehicle, Report, ParkingRecord])],
  controllers: [ReportController],
  providers: [ReportService, EstablishmentService]
})
export class ReportModule { }
