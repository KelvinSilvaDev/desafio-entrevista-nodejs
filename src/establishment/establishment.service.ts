import { Inject, Injectable } from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { Establishment } from './entities/establishment.entity';
import { Repository, EntityNotFoundError } from 'typeorm';
import { ResultsDto } from 'src/dto/results.dto';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstablishmentService {
  /**
   * Constructor
   * @param {Repository<Establishment>} establishmentRepository
   */
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
  ) { }

  async create(createEstablishmentDto: CreateEstablishmentDto): Promise<ResultsDto> {
    const establishment = new Establishment();
    establishment.name = createEstablishmentDto.name;
    establishment.cnpj = createEstablishmentDto.cnpj;
    establishment.address = createEstablishmentDto.address;
    establishment.phone = createEstablishmentDto.phone;
    establishment.motorcycleSpaces = createEstablishmentDto.motorcycleSpaces;
    establishment.carSpaces = createEstablishmentDto.carSpaces;

    try {
      const result = await this.establishmentRepository.save(establishment);
      console.log(result);
      return {
        status: true,
        message: 'Estabelecimento cadastrado com sucesso!',
      };
    } catch (error) {
      console.error(error);
      return <ResultsDto>{
        status: false,
        message: 'Não foi possível cadastrar o estabelecimento!',
        error: error,
      };
    }
  }

  async findAll(): Promise<ResultsDto> {
    try {
      const establishments = await this.establishmentRepository.find();
      return <ResultsDto>{
        status: true,
        data: establishments,
      };
    } catch (error) {
      console.error(error);
      return <ResultsDto>{
        status: false,
        message: 'Não foi possível listar os estabelecimentos!',
        error: error,
      };
    }
  }

  async findOne(id: string): Promise<ResultsDto> {
    try {
      const establishment = await this.establishmentRepository.findOne({ where: { id: id } });

      return <ResultsDto>{
        status: true,
        data: establishment,
      };
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        console.error(error);
        return <ResultsDto>{
          status: false,
          message: 'Estabelecimento não encontrado!',
          error: error,
        };
      }

      console.error(error);
      return <ResultsDto>{
        status: false,
        message: 'Não foi possível listar o estabelecimento!',
        error: error,
      };
    }
  }



  async update(id: string, updateEstablishmentDto: UpdateEstablishmentDto): Promise<ResultsDto> {
    try {
      const establishment = await this.establishmentRepository.findOne({
        where: { id: id },
      });

      if (!establishment) {
        return {
          status: false,
          message: 'Estabelecimento não encontrado!',
        };
      }

      await this.establishmentRepository.update(id, updateEstablishmentDto);
      console.log('Atualização concluída');

      return {
        status: true,
        message: 'Estabelecimento atualizado com sucesso!',
      };
    } catch (error) {
      console.error(error);
      return <ResultsDto>{
        status: false,
        message: 'Não foi possível atualizar o estabelecimento!',
        error: error,
      };
    }
  }

  async remove(id: string): Promise<ResultsDto> {
    try {
      const establishment = await this.establishmentRepository.findOne({
        where: { id: id },
      });

      if (!establishment) {
        return {
          status: false,
          message: 'Estabelecimento não encontrado!',
        };
      }

      await this.establishmentRepository.delete(id);
      console.log('Remoção concluída');

      return {
        status: true,
        message: 'Estabelecimento removido com sucesso!',
      };
    } catch (error) {
      console.error(error);
      return <ResultsDto>{
        status: false,
        message: 'Não foi possível remover o estabelecimento!',
        error: error,
      };
    }
  }

  async incrementOccupiedSpaces(establishment: Establishment, vehicle: Vehicle) {
    if (vehicle.type === 'car') {
      establishment.occupiedCarSpaces++;
    } else {
      establishment.occupiedMotorcycleSpaces++;
    }
    return this.establishmentRepository.save(establishment);
  }

  async decrementOccupiedSpaces(establishment: Establishment, vehicle: Vehicle) {
    if (vehicle.type === 'car') {
      establishment.occupiedCarSpaces--;
    } else {
      establishment.occupiedMotorcycleSpaces--;
    }
    return this.establishmentRepository.save(establishment);
  }

  async getGeneralInfo() {
    const establishments = await this.establishmentRepository.find();
    let totalCarSpaces = 0;
    let totalMotorcycleSpaces = 0;
    let totalOccupiedCarSpaces = 0;
    let totalOccupiedMotorcycleSpaces = 0;

    establishments.forEach((establishment) => {
      totalCarSpaces += establishment.carSpaces;
      totalMotorcycleSpaces += establishment.motorcycleSpaces;
      totalOccupiedCarSpaces += establishment.occupiedCarSpaces;
      totalOccupiedMotorcycleSpaces += establishment.occupiedMotorcycleSpaces;
    });

    return {
      totalCarSpaces,
      totalMotorcycleSpaces,
      totalOccupiedCarSpaces,
      totalOccupiedMotorcycleSpaces,
    };
  }

  async getInfo() {
    const establishments = await this.establishmentRepository.find();
    const establishmentsInfo = [];

    establishments.forEach((establishment) => {
      establishmentsInfo.push({
        name: establishment.name,
        cnpj: establishment.cnpj,
        address: establishment.address,
        phone: establishment.phone,
        carSpaces: establishment.carSpaces,
        motorcycleSpaces: establishment.motorcycleSpaces,
        occupiedCarSpaces: establishment.occupiedCarSpaces,
        occupiedMotorcycleSpaces: establishment.occupiedMotorcycleSpaces,
      });
    });

    return establishmentsInfo;
  }


}
