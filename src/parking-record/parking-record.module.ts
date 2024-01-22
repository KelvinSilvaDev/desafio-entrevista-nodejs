import { Module } from '@nestjs/common';
import { ParkingRecordService } from './parking-record.service';
import { ParkingRecordController } from './parking-record.controller';
import { parkingRecordProviders } from './parking-record.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingRecord } from './entities/parking-record.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Establishment } from 'src/establishment/entities/establishment.entity';
// import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingRecord, Vehicle, Establishment])],
  controllers: [ParkingRecordController],
  providers: [ParkingRecordService],
})
export class ParkingRecordModule { }
