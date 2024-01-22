import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Establishment } from "src/establishment/entities/establishment.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Repository, Connection } from "typeorm";
import { ParkingRecord } from "./entities/parking-record.entity";

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

  async create(vehicle: Vehicle, establishment: Establishment) {
    const foundVehicle = await this.vehicleRepository.findOne({ where: { id: vehicle.id } });
    const foundEstablishment = await this.establishmentRepository.findOne({ where: { id: establishment.id } });

    if (!foundVehicle || !foundEstablishment) {
      throw new NotFoundException('Vehicle or establishment not found');
    }

    if (vehicle.type === 'Car' && establishment.carSpaces <= establishment.occupiedCarSpaces) {
      throw new BadRequestException('No available car spaces in the establishment');
    }

    if (vehicle.type === 'Motorcycle' && establishment.motorcycleSpaces <= establishment.occupiedMotorcycleSpaces) {
      throw new BadRequestException('No available motorcycle spaces in the establishment');
    }

    const parkingRecord = new ParkingRecord();
    parkingRecord.vehicle = vehicle;
    parkingRecord.establishment = establishment;
    parkingRecord.entryTime = new Date();

    if (vehicle.type === 'Car') {
      establishment.occupiedCarSpaces += 1;
    } else if (vehicle.type === 'Motorcycle') {
      establishment.occupiedMotorcycleSpaces += 1;
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(parkingRecord);
      await queryRunner.manager.save(establishment);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to create parking record');
    } finally {
      await queryRunner.release();
    }

    return parkingRecord;
  }

  async update(id: any) {
    const parkingRecord = await this.parkingRecordRepository.findOne({ where: { id: id } });

    if (!parkingRecord) {
      throw new NotFoundException('Registro de entrada não encontrado!');
    }

    parkingRecord.exitTime = new Date();
    await this.parkingRecordRepository.save(parkingRecord);

    const establishment = await this.establishmentRepository.findOne({ where: { id: parkingRecord.establishment.id } });

    if (parkingRecord.vehicle.type === 'Car') {
      establishment.occupiedCarSpaces -= 1;
    } else if (parkingRecord.vehicle.type === 'Motorcycle') {
      establishment.occupiedMotorcycleSpaces -= 1;
    }

    await this.establishmentRepository.save(establishment);

    return parkingRecord;
  }
}
