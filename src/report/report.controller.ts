import { Controller, Get, Param } from '@nestjs/common';
import { ReportService } from './report.service';
import { EstablishmentService } from 'src/establishment/establishment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService, private readonly establishmentService: EstablishmentService) { }

  @Get('/establishment/:id')
  async obterRelatorioEstabelecimento(@Param('id') id: string) {
    return await this.reportService.getReportByEstablishment(id);
  }
}
