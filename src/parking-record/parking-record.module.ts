import { Module } from '@nestjs/common';
import { ParkingRecordService } from './parking-record.service';
import { ParkingRecordController } from './parking-record.controller';
import { parkingRecordProviders } from './parking-record.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ParkingRecordController],
  providers: [...parkingRecordProviders, ParkingRecordService],
})
export class ParkingRecordModule { }
