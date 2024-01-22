import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { Public } from 'src/auth/public.decorator';
import { CreateSummaryPerPeriodDto } from './dto/create-summary-per-period';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) { }

  // @Get()
  // @Public()
  // getSummary() {
  //   return this.summaryService.calculateSummary();
  // }

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
