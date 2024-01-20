import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Establishment } from "src/establishment/entities/establishment.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Repository } from "typeorm";
import { ParkingRecord } from "./entities/parking-record.entity";

@Injectable()
export class ParkingRecordService {
  constructor(
    @Inject('PARKING_RECORD_REPOSITORY')
    private parkingRecordRepository: Repository<ParkingRecord>,
  ) { }

  async create(vehicle: Vehicle, establishment: Establishment) {
    const parkingRecord = new ParkingRecord();
    parkingRecord.vehicle = vehicle;
    parkingRecord.establishment = establishment;
    parkingRecord.entryTime = new Date();
    return this.parkingRecordRepository.save(parkingRecord);
  }

  async update(id: number) {
    const parkingRecord = await this.parkingRecordRepository.findOne({ where: { id } });
    parkingRecord.exitTime = new Date();
    return this.parkingRecordRepository.save(parkingRecord);
  }
}


// import { Injectable } from '@nestjs/common';
// import { CreateParkingRecordDto } from './dto/create-parking-record.dto';
// import { UpdateParkingRecordDto } from './dto/update-parking-record.dto';

// @Injectable()
// export class ParkingRecordService {
//   create(createParkingRecordDto: CreateParkingRecordDto) {
//     return 'This action adds a new parkingRecord';
//   }

//   findAll() {
//     return `This action returns all parkingRecord`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} parkingRecord`;
//   }

//   update(id: number, updateParkingRecordDto: UpdateParkingRecordDto) {
//     return `This action updates a #${id} parkingRecord`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} parkingRecord`;
//   }
// }
