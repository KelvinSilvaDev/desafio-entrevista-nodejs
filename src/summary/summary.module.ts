import { Module } from '@nestjs/common';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summary } from './entities/summary.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CaslFactory } from 'src/casl/casl.factory';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ParkingRecordService } from 'src/parking-record/parking-record.service';
import { ParkingRecord } from 'src/parking-record/entities/parking-record.entity';
import { Establishment } from 'src/establishment/entities/establishment.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

@Module({
  imports: [ConfigModule, PassportModule.register({ defaultStrategy: 'jwt' }), TypeOrmModule.forFeature([Summary, ParkingRecord, ParkingRecord, Establishment, Vehicle])],
  controllers: [SummaryController],
  providers: [SummaryService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
    PoliciesGuard,
    CaslFactory,
    ParkingRecordService,
  ],
})
export class SummaryModule { }
