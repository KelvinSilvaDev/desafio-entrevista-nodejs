import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { Public } from 'src/auth/public.decorator';
import { CreateSummaryPerPeriodDto } from './dto/create-summary-per-period';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('summary')
@ApiTags('Summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) { }

  @Get(':establishmentId')
  @Public()
  async getSummary(@Param('establishmentId') establishmentId: string) {
    const entryExitSummary = await this.summaryService.calculateSummary(establishmentId);
    return {
      entryExitSummary,
    };
  }

  @Post('period/:establishmentId')
  @Public()
  async getSummaryByPeriod(@Param('establishmentId') establishmentId: string, @Body() { startDate, endDate }: CreateSummaryPerPeriodDto) {
    const entryExitSummary = await this.summaryService.calculateSummaryByPeriod(establishmentId, startDate, endDate);
    return {
      entryExitSummary,
    };
  }

}
