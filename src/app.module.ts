import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstablishmentModule } from './establishment/establishment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as joi from 'joi';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ParkingRecordModule } from './parking-record/parking-record.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CaslModule } from './casl/casl.module';
import { SummaryModule } from './summary/summary.module';
import { ReportModule } from './report/report.module';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Establishment } from './establishment/entities/establishment.entity';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { Report } from './report/entities/report.entity';
import { ParkingRecord } from './parking-record/entities/parking-record.entity';
import { Summary } from './summary/entities/summary.entity';


const entities = [User, Establishment, Vehicle, Report, ParkingRecord,Summary];

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        APP_ENV: joi
          .string()
          .valid('development', 'production')
          .default('development'),
        WEBTOKEN_ENCRYPTION_KEY: joi.string().required(),
        WEBTOKEN_EXPIRATION_TIME: joi.number().default(3600),
        DB_TYPE: joi.string().default('mysql'),
        DB_USERNAME: joi.string().default('root'),
        DB_PASSWORD: joi.string().allow('').default('password'),
        DB_HOST: joi.string().default('localhost'),
        DB_PORT: joi.number().default('3306'),
        DB_DATABASE: joi.string().default('nest'),
      }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: entities,
      synchronize: false,
      autoLoadEntities: true,
      migrations: [__dirname + '/**/**/migrations/**/*{.ts,.js}'],
    }),
    AuthModule,
    EstablishmentModule,
    UsersModule,
    CaslModule,
    VehiclesModule,
    ParkingRecordModule,
    SummaryModule,
    ReportModule,
  ]
  ,
  controllers: [AppController],
  providers: [AppService, AuthModule]
})
export class AppModule {
  constructor( private dataSource: DataSource ) {}
}
