import { Inject, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { ResultsDto } from 'src/dto/results.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @Inject('VEHICLE_REPOSITORY')
    private vehiclesRepository: Repository<Vehicle>,
  ) { }
  async create(createVehicleDto: CreateVehicleDto): Promise<ResultsDto> {
    const { brand, model, color, licensePlate, type, cnh } = createVehicleDto;
    const vehicle = new Vehicle();

    vehicle.brand = brand;
    vehicle.model = model;
    vehicle.color = color;
    vehicle.licensePlate = licensePlate;
    vehicle.type = type;
    vehicle.cnh = cnh;


    try {
      const result = await this.vehiclesRepository.save(vehicle);
      return <ResultsDto>{
        status: true,
        message: 'Veículo cadastrado com sucesso!',
        data: result
      }
    } catch (error) {
      console.log(error)
      return <ResultsDto>{
        status: false,
        message: 'Não foi possível cadastrar o veículo!',
        error: error,
      }
    }
  }

  async findAll() {
    const vehicles = await this.vehiclesRepository.find();
    if (!vehicles) {
      return <ResultsDto>{
        status: false,
        message: 'Nenhum veículo cadastrado!',
      }
    }
    try {
      return {
        data: vehicles
      }
    } catch (error) {
      console.log(error)
      return <ResultsDto>{
        status: false,
        message: 'Não foi possível buscar os veículos!',
        error: error,
      }
    }
  }

  async findOne(id: string) {
    const vehicle = await this.vehiclesRepository.findOne({ where: { id: id } });
    if (!vehicle) {
      return <ResultsDto>{
        status: false,
        message: 'Veículo não encontrado!',
      }
    }
    try {
      return {
        data: vehicle
      }
    } catch (error) {
      console.log(error)
      return <ResultsDto>{
        status: false,
        message: 'Não foi possível buscar o veículo!',
        error: error,
      }
    }
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = this.vehiclesRepository.findOne({ where: { id: id } });
    if (!vehicle) {
      return <ResultsDto>{
        status: false,
        message: 'Veículo não encontrado!',
      }
    }
    try {
      const result = await this.vehiclesRepository.update(await vehicle, updateVehicleDto);
      return <ResultsDto>{
        status: true,
        message: 'Veículo atualizado com sucesso!',
      }

    } catch (error) {
      console.log(error)
      return <ResultsDto>{
        status: false,
        message: 'Não foi possível atualizar o veículo!',
        error: error,
      }
    }
  }

  async remove(id: string) {
    const vehicle = await this.vehiclesRepository.findOne({ where: { id: id } });
    if (!vehicle) {
      return <ResultsDto>{
        status: false,
        message: 'Veículo não encontrado!',
      }
    }
    try {
      await this.vehiclesRepository.delete({ id: id })
      return <ResultsDto>{
        status: true,
        message: 'Veículo excluído com sucesso!',
      }
    } catch (error) {
      console.log(error)
      return <ResultsDto>{
        status: false,
        message: 'Não foi possível excluir o veículo!',
        error: error,
      }
    }
  }
}
