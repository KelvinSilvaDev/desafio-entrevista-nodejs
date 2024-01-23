import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Public } from 'src/auth/public.decorator';
import { EstablishmentService } from 'src/establishment/establishment.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService, private readonly establishmentService: EstablishmentService) { }

  @Post()
  @Public()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.reportService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(+id, updateReportDto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.reportService.remove(+id);
  }


  @Get('/estabelecimento/:id')
  @Public()
  async obterRelatorioEstabelecimento(@Param('id') id: string, @Body() createReportDto: CreateReportDto) {
    return await this.reportService.getReportByEstablishment(id);
  }
}
