import { Controller, Post, Body, Put, Param } from "@nestjs/common";
import { CreateParkingRecordDto } from "./dto/create-parking-record.dto";
import { ParkingRecordService } from "./parking-record.service";

@Controller('parking-records')
export class ParkingRecordController {
  constructor(private readonly parkingRecordService: ParkingRecordService) { }

  @Post()
  create(@Body() createParkingRecordDto: CreateParkingRecordDto) {
    return this.parkingRecordService.create(createParkingRecordDto.vehicle, createParkingRecordDto.establishment);
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.parkingRecordService.update(Number(id));
  }
}


// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { ParkingRecordService } from './parking-record.service';
// import { CreateParkingRecordDto } from './dto/create-parking-record.dto';
// import { UpdateParkingRecordDto } from './dto/update-parking-record.dto';

// @Controller('parking-record')
// export class ParkingRecordController {
//   constructor(private readonly parkingRecordService: ParkingRecordService) {}

//   @Post()
//   create(@Body() createParkingRecordDto: CreateParkingRecordDto) {
//     return this.parkingRecordService.create(createParkingRecordDto);
//   }

//   @Get()
//   findAll() {
//     return this.parkingRecordService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.parkingRecordService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateParkingRecordDto: UpdateParkingRecordDto) {
//     return this.parkingRecordService.update(+id, updateParkingRecordDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.parkingRecordService.remove(+id);
//   }
// }
