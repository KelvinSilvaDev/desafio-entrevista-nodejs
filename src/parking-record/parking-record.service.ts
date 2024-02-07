import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Establishment } from "src/establishment/entities/establishment.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";

import { ParkingRecord } from "./entities/parking-record.entity";
import { Repository, Connection, IsNull, Not } from "typeorm";

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

  async update(id: number) {
    const parkingRecord = await this.parkingRecordRepository.findOne({ where: { id }, relations: ['vehicle', 'establishment']});
    if (!parkingRecord) {
      throw new NotFoundException('Registro de entrada não encontrado!');
    }

    parkingRecord.exitTime = new Date();
    await this.parkingRecordRepository.save(parkingRecord);

    const establishment = await this.establishmentRepository.findOne({ where: { id: parkingRecord.establishment.id } });

    await this.decrementOccupiedSpaces(establishment, parkingRecord.vehicle);

    return <ResultsDto>{
      status: true,
      message: 'Saída registrada com sucesso!',
      data: parkingRecord,
    };
  }

  async incrementOccupiedSpaces(establishment: Establishment, vehicle: Vehicle) {

    if (vehicle.type === 'Car' || vehicle.type === 'car') {
      establishment.occupiedCarSpaces++;
    } else {
      establishment.occupiedMotorcycleSpaces++;
    }
    return await this.establishmentRepository.save(establishment);
  }

  async decrementOccupiedSpaces(establishment: Establishment, vehicle: Vehicle) {
    if (vehicle.type === 'Car' || vehicle.type === 'car') {
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

    switch (foundVehicle.type) {
      case 'Car':
        if (foundEstablishment.carSpaces <= foundEstablishment.occupiedCarSpaces) {
          throw new BadRequestException('No available car spaces in the establishment');
        }
        break;
      case 'Motorcycle':
        if (foundEstablishment.motorcycleSpaces <= foundEstablishment.occupiedMotorcycleSpaces) {
          throw new BadRequestException('No available motorcycle spaces in the establishment');
        }
        break;
      default:
        throw new BadRequestException('Invalid vehicle type');
    }

    await this.incrementOccupiedSpaces(foundEstablishment, foundVehicle);

    




    const parkingRecord = new ParkingRecord();
    parkingRecord.vehicle = foundVehicle;
    parkingRecord.establishment = foundEstablishment;
    parkingRecord.entryTime = new Date();

    await this.parkingRecordRepository.save(parkingRecord);

    return <ResultsDto>{
      status: true,
      message: 'Entrada registrada com sucesso!',
      data: parkingRecord,
    };
  }


  async calculateEntryExitSummary(establishmentId: string): Promise<{ totalEntries: number; totalExits: number, totalMotorcycles: number, totalCars: number, totalCarEntries: number, totalCarExits: number, totalMotorcycleEntries: number, totalMotorcycleExits: number }> {
    const totalEntries = await this.parkingRecordRepository.count({
      where: { establishment: { id: establishmentId }, exitTime: null },
    });

    const totalExits = await this.parkingRecordRepository.count({
      where: { establishment: { id: establishmentId }, exitTime: Not(IsNull()) },
    });

    const totalMotorcycles = await this.parkingRecordRepository.count({
      where: { establishment: { id: establishmentId }, vehicle: { type: 'Motorcycle' || 'motorcycle' } },
    });

    const totalCars = await this.parkingRecordRepository.count({
      where: { establishment: { id: establishmentId }, vehicle: { type: 'Car' || 'car' } },
    });

    const totalCarEntries = await this.parkingRecordRepository.count({
      where: { establishment: { id: establishmentId }, vehicle: { type: 'Car' || 'car' }, exitTime: null },
    });

    const totalCarExits = await this.parkingRecordRepository.count({
      where: { establishment: { id: establishmentId }, vehicle: { type: 'Car' || 'car' }, exitTime: Not(IsNull()) },
    });

    const totalMotorcycleEntries = await this.parkingRecordRepository.count({
      where: { establishment: { id: establishmentId }, vehicle: { type: 'Motorcycle' }, exitTime: null },
    });

    const totalMotorcycleExits = await this.parkingRecordRepository.count({
      where: { establishment: { id: establishmentId }, vehicle: { type: 'Motorcycle' }, exitTime: Not(IsNull()) },
    });

    return { totalEntries, totalExits, totalMotorcycles, totalCars, totalCarEntries, totalCarExits, totalMotorcycleEntries, totalMotorcycleExits };
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

  async calculateEntryExitSummaryByPeriod(establishmentId: string, startDate: Date, endDate: Date): Promise<{ result: any, totalEntries: any; totalExits: any }> {


    const result = await this.parkingRecordRepository.find({
      where: { establishment: { id: establishmentId }, entryTime: Not(IsNull()), exitTime: Not(IsNull()) },
    })

    const totalEntries = result.filter((item) => {
      return item.entryTime >= startDate && item.entryTime <= endDate
    }).length;

    const totalExits = result.filter((item) => {
      return item.exitTime >= startDate && item.exitTime <= endDate
    }).length;

    return { result, totalEntries, totalExits };
  }

}
