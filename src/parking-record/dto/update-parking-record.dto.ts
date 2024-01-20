import { PartialType } from '@nestjs/swagger';
import { CreateParkingRecordDto } from './create-parking-record.dto';

export class UpdateParkingRecordDto extends PartialType(CreateParkingRecordDto) {}
