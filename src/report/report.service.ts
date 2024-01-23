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
   */
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
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

  // async getReportByEstablishment(id: string): Promise<ResultsDto> {
  //   // const establishment = await this.establishmentRepository.findOne({ where: { id: id } });
  //   try {
  //     const result = await this.establishmentRepository.find({
  //       where: { id: id },
  //       // relations: ['parkingRecords'],
  //     });
  //     console.log(result);

  //     const newReport: Report = new Report();


  //     return <ResultsDto>{
  //       status: true,
  //       data: result,
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     return <ResultsDto>{
  //       status: false,
  //       message: 'Não foi possível listar os estabelecimentos!',
  //       error: error,
  //     };
  //   }
  // }

  async getReportByEstablishment(id: string): Promise<ResultsDto> {
    try {
      // Recupera o estabelecimento com base no ID
      const establishment = await this.establishmentRepository.findOne({
        where: { id: id },
        relations: ['parkingRecords']
      });

      console.log('Estabelecimento encontrado através do ID fornecido', establishment);

      if (!establishment) {
        return <ResultsDto>{
          status: false,
          message: 'Estabelecimento não encontrado.',
        };
      }

      // Recupera os registros de estacionamento relacionados ao estabelecimento
      const parkingRecords = establishment.parkingRecords;

      console.log('Registros de estacionamentos no estabelecimento em questão', parkingRecords);

      // Realiza cálculos ou lógica para criar o relatório com base nos registros de estacionamento
      const newReport = this.generateReport(parkingRecords);

      console.log('E relatório pronto para ser registrado no banco de dados: ', newReport);

      return <ResultsDto>{
        status: true,
        data: newReport,
      };

      // Salva o relatório no banco de dados
      // await this.saveReport(newReport);

      // return <ResultsDto>{
      //   status: true,
      //   data: newReport,
      // };
    } catch (error) {
      console.error(error);
      return <ResultsDto>{
        status: false,
        message: 'Não foi possível gerar o relatório do estabelecimento.',
        error: error,
      };
    }
  }

  // Método de exemplo para gerar um relatório com base nos registros de estacionamento
  private generateReport(parkingRecords: ParkingRecord[]): Report {
    // Lógica para criar o relatório com base nos registros de estacionamento
    // ...

    if (parkingRecords) {
      const newReport = new Report();
      newReport.totalCarEntries = parkingRecords.filter(
        record => (!record.vehicle || record.vehicle.type.toLowerCase() === 'car') && record.entryTime
      ).length;



      newReport.totalMotorcycleEntries = parkingRecords.filter(
        record => record.vehicle?.type.toLowerCase() === 'Motorcycle' && record.entryTime
      ).length;

      console.log(newReport);
      console.log(newReport);

      // Adicione outras métricas conforme necessário

      return newReport;
    } else {
      // Se parkingRecords for undefined, você pode decidir o que fazer aqui,
      // por exemplo, retornar um relatório vazio ou lançar um erro.
      console.error("Registros de estacionamento não encontrados.");
      return new Report(); // Retorna um relatório vazio neste exemplo
    }


  }

  async saveReport(report: Report): Promise<Report> {
    return await this.reportRepository.save(report);
  }


}
