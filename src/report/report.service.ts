import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Establishment } from 'src/establishment/entities/establishment.entity';
import { Repository } from 'typeorm';
import { ResultsDto } from 'src/dto/results.dto';
import { Report } from './entities/report.entity';
import { ParkingRecord } from 'src/parking-record/entities/parking-record.entity';

@Injectable()
export class ReportService {
  /**
   * Constructor
   * @param {Repository<Establishment>} establishmentRepository
   * @param {Repository<Report>} reportRepository
   * @param {Repository<ParkingRecord>} parkingRecordRepository
   */
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(ParkingRecord)
    private readonly parkingRecordRepository: Repository<ParkingRecord>,
  ) { }

  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report';
  }

  findAll() {
    return `This action returns all report`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }

  async getReportByEstablishment(id: string): Promise<ResultsDto> {
    try {
      const establishment = await this.establishmentRepository.findOne({
        where: { id: id },
      });

      console.log('Estabelecimento encontrado através do ID fornecido', establishment);

      if (!establishment) {
        return <ResultsDto>{
          status: false,
          message: 'Estabelecimento não encontrado.',
        };
      }

      const parkingRecords = await this.parkingRecordRepository.find({ where: { establishment: { id: id } }, relations: ['vehicle', 'establishment']});
      
      const newReport = this.generateReport(parkingRecords);
   

      return <ResultsDto>{
        status: true,
        data: newReport,
      };
    } catch (error) {
      console.error(error);
      return <ResultsDto>{
        status: false,
        message: 'Não foi possível gerar o relatório do estabelecimento.',
        error: error,
      };
    }
  }

  private generateReport(parkingRecords: ParkingRecord[]): Report {
    if (parkingRecords) {
      const newReport = new Report();
      newReport.totalCarEntries = parkingRecords.filter(
        record => record.vehicle.type === 'Car' && record.entryTime
      );
      newReport.totalMotorcycleEntries = parkingRecords.filter(
        record => record.vehicle.type !== 'Car' && record.entryTime
      );

      newReport.totalCarExits = parkingRecords.filter(
        record => record.vehicle.type === 'Car' && record.exitTime
      );

      newReport.totalMotorcycleExits = parkingRecords.filter(
        record => record.vehicle.type !== 'Car' && record.exitTime
      );
      


      if (newReport.totalCarEntries.length < 1) {
        newReport.totalCarEntries = [];
      }

      if (newReport.totalMotorcycleEntries.length < 1) {
        newReport.totalMotorcycleEntries = [];
      }


      return newReport;
    } else {
      console.error("Registros de estacionamento não encontrados.");
      return new Report();
    }


  }

  async saveReport(report: Report): Promise<Report> {
    return await this.reportRepository.save(report);
  }


}
