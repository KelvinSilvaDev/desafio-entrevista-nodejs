import { Controller, Post, Body, Put, Param, Get } from "@nestjs/common";
import { CreateParkingRecordDto } from "./dto/create-parking-record.dto";
import { ParkingRecordService } from "./parking-record.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Connection } from "typeorm";

@ApiBearerAuth()
@ApiTags('Parking Record')
@Controller('parking-records')
export class ParkingRecordController {
  constructor(
    private readonly parkingRecordService: ParkingRecordService,
    private readonly connection: Connection
  ) { }

  @Get()
  findAll() {
    return this.parkingRecordService.findAll();
  }

  @Post()
  async create(@Body() createParkingRecordDto: CreateParkingRecordDto) {
    return await this.parkingRecordService.create(createParkingRecordDto.vehicle, createParkingRecordDto.establishment);
  }

  @Put(':id')
  update(@Param('id') id: number) {
    return this.parkingRecordService.update((id));
  }
}