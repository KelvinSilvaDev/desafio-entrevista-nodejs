import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { vehiclesProviders } from './vehicles.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VehiclesController],
  providers: [...vehiclesProviders, VehiclesService],
})
export class VehiclesModule { }
