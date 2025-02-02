import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Summary } from './entities/summary.entity';
import { ParkingRecordService } from 'src/parking-record/parking-record.service';

@Injectable()
export class SummaryService {
  /**
   * Constructor
   * @param {Repository<Summary>} summaryRepository
   */
  constructor(
    @InjectRepository(Summary)
    private readonly establishmentRepository: Repository<Summary>,
    private readonly parkingRecordService: ParkingRecordService,
  ) { }
  async calculateSummary(establishmentId: string): Promise<{ totalEntries: number; totalExits: number }> {
    const entryExitSummary = await this.parkingRecordService.calculateEntryExitSummary(establishmentId);
    return entryExitSummary;
  }

  async calculateSummaryByPeriod(establishmentId: string, startDate: Date, endDate: Date): Promise<any> {

    const entryExitSummary = await this.parkingRecordService.calculateEntryExitSummaryByPeriod(establishmentId, startDate, endDate);
    return entryExitSummary;
  }

}
