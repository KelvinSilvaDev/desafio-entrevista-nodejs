import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Establishment } from "src/establishment/entities/establishment.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";

import { ParkingRecord } from "./entities/parking-record.entity";
import { Repository, Connection, getConnection, getRepository, getConnectionManager, IsNull, Not } from "typeorm";
import { UpdateEstablishmentDto } from "src/establishment/dto/update-establishment.dto";
import { ResultsDto } from "src/dto/results.dto";


@Injectable()
export class ParkingRecordService {
  constructor(
    @InjectRepository(ParkingRecord)
    private parkingRecordRepository: Repository<ParkingRecord>,
    @InjectRepository(Establishment)
    private establishmentRepository: Repository<Establishment>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    private readonly connection: Connection
  ) { }

  async findAll() {
    const parkingRecords = await this.parkingRecordRepository.find({
      relations: ['vehicle', 'establishment'],
    });

    if (!parkingRecords.length) {
      throw new NotFoundException('Nenhum registro de entrada cadastrado!');
    }
    return parkingRecords;
  }


  async incrementOccupiedSpaces(establishment: Establishment, vehicle: Vehicle) {

    if (vehicle.type === 'Car') {
      establishment.occupiedCarSpaces++;
    } else {
      establishment.occupiedMotorcycleSpaces++;
    }
    return await this.establishmentRepository.save(establishment);
  }

  async decrementOccupiedSpaces(establishment: Establishment, vehicle: Vehicle) {
    if (vehicle.type === 'Car') {
      establishment.occupiedCarSpaces--;
    } else {
      establishment.occupiedMotorcycleSpaces--;
    }
    return await this.establishmentRepository.save(establishment);
  }


  async create(vehicle: Vehicle, establishment: Establishment) {
    const foundVehicle = await this.vehicleRepository.findOne({ where: { id: vehicle.id } });
    const foundEstablishment = await this.establishmentRepository.findOne({ where: { id: establishment.id } });

    if (!foundVehicle || !foundEstablishment) {
      throw new NotFoundException('Vehicle or establishment not found');
    }

    if (foundVehicle.type === 'Car' && foundEstablishment.carSpaces <= foundEstablishment.occupiedCarSpaces) {
      throw new BadRequestException('No available car spaces in the establishment');
    } else if (foundVehicle.type === 'Motorcycle' && foundEstablishment.motorcycleSpaces <= foundEstablishment.occupiedMotorcycleSpaces) {
      throw new BadRequestException('No available motorcycle spaces in the establishment');
    } else {
      await this.incrementOccupiedSpaces(foundEstablishment, foundVehicle);
    }




    const parkingRecord = new ParkingRecord();
    parkingRecord.vehicle = vehicle;
    parkingRecord.establishment = establishment;
    parkingRecord.entryTime = new Date();


    await this.parkingRecordRepository.save(parkingRecord);

    return <ResultsDto>{
      status: true,
      message: 'Entrada registrada com sucesso!',
      data: parkingRecord,
    };
  }


  async calculateEntryExitSummary(establishmentId: string): Promise<{ totalEntries: number; totalExits: number }> {
    const totalEntries = await this.parkingRecordRepository.count({
      where: { establishment: { id: establishmentId }, exitTime: null },
    });

    const totalExits = await this.parkingRecordRepository.count({
      where: { establishment: { id: establishmentId }, exitTime: Not(IsNull()) },
    });

    return { totalEntries, totalExits };
  }

  async calculateEntryExitSummaryPerHour(establishmentId: string): Promise<any> {
    const totalEntries = await this.parkingRecordRepository
      .createQueryBuilder('parkingRecord')
      .select('DATE_FORMAT(parkingRecord.entryTime, "%Y-%m-%d %H:00:00") as hour')
      .addSelect('COUNT(parkingRecord.id)', 'totalEntries')
      .where('parkingRecord.establishment.id = :establishmentId', { establishmentId })
      .andWhere('parkingRecord.exitTime IS NULL')
      .groupBy('hour')
      .getRawMany();

    const totalExits = await this.parkingRecordRepository
      .createQueryBuilder('parkingRecord')
      .select('DATE_FORMAT(parkingRecord.exitTime, "%Y-%m-%d %H:00:00") as hour')
      .addSelect('COUNT(parkingRecord.id)', 'totalExits')
      .where('parkingRecord.establishment.id = :establishmentId', { establishmentId })
      .andWhere('parkingRecord.exitTime IS NOT NULL')
      .groupBy('hour')
      .getRawMany();

    return { totalEntries, totalExits };
  }


  // async calculateEntryExitSummary(establishmentId: string): Promise<{ totalEntries: number; totalExits: number }> {
  //   const result = await this.parkingRecordRepository
  //     .createQueryBuilder('parkingRecord')
  //     .select('SUM(CASE WHEN parkingRecord.exitTime IS NULL THEN 1 ELSE 0 END)', 'totalEntries')
  //     .addSelect('SUM(CASE WHEN parkingRecord.exitTime IS NOT NULL THEN 1 ELSE 0 END)', 'totalExits')
  //     .where('parkingRecord.establishment.id = :establishmentId', { establishmentId })
  //     .getRawOne();

  //   const totalEntries = parseInt(result.totalEntries, 10) || 0;
  //   const totalExits = parseInt(result.totalExits, 10) || 0;

  //   return { totalEntries, totalExits };
  // }

  async calculateEntryExitSummaryByPeriod(establishmentId: string, startDate: Date, endDate: Date): Promise<{ totalEntries: number; totalExits: number }> {
    const result = await this.parkingRecordRepository
      .createQueryBuilder('parkingRecord')
      .select('SUM(CASE WHEN parkingRecord.exitTime IS NULL THEN 1 ELSE 0 END)', 'totalEntries')
      .addSelect('SUM(CASE WHEN parkingRecord.exitTime IS NOT NULL THEN 1 ELSE 0 END)', 'totalExits')
      .where('parkingRecord.establishment.id = :establishmentId', { establishmentId })
      .andWhere('parkingRecord.entryTime BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getRawOne();

    const totalEntries = parseInt(result.totalEntries, 10) || 0;
    const totalExits = parseInt(result.totalExits, 10) || 0;

    return { totalEntries, totalExits };
  }

}
