import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EstablishmentModule } from './establishment/establishment.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import * as joi from 'joi';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ParkingRecordModule } from './parking-record/parking-record.module';
// import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { userProviders } from './users/users.provider';
import { CaslModule } from './casl/casl.module';

import * as winston from 'winston';
import * as winstonFileRotator from 'winston-daily-rotate-file';
import { join } from 'path';
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
    // DatabaseOrmModule(),
    // TypeOrmModule.forRoot(DatabaseOrmModule()),
    // ConfigModule.forRoot({
    //   validationSchema: joi.object({
    //     APP_ENV: joi
    //       .string()
    //       .valid('development', 'production')
    //       .default('development'),
    //     WEBTOKEN_ENCRYPTION_KEY: joi.string().required(),
    //     WEBTOKEN_EXPIRATION_TIME: joi.number().default(1800),
    //     DB_TYPE: joi.string().default('mysql'),
    //     DB_USERNAME: joi.string().default('root'),
    //     DB_PASSWORD: joi.string().allow('').default('password'),
    //     DB_HOST: joi.string().default('localhost'),
    //     DB_PORT: joi.number().default('3306'),
    //     DB_DATABASE: joi.string().default('nest_kel'),
    //   }),
    // }),
    // ServeStaticModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) =>
    //     config.get('APP_ENV') === 'production'
    //       ? [
    //         // {
    //         //   rootPath: join(__dirname, '..', 'ui'),
    //         // },
    //       ]
    //       : [],
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       type: configService.get('DB_TYPE'),
    //       host: configService.get('DB_HOST'),
    //       port: configService.get('DB_PORT'),
    //       username: configService.get('DB_USERNAME'),
    //       password: configService.get('DB_PASSWORD'),
    //       database: process.env.DB_DATABASE,
    //       // database: configService.get('DB_DATABASE'),
    //       entities: [__dirname + '/**/**.entity{.ts,.js}'],
    //       migrations: [__dirname + '/**/**/migrations/**/*{.ts,.js}'],
    //       synchronize: configService.get('APP_ENV') === 'production' ? false : true,
    //       autoLoadEntities: true,
    //       logging: true,
    //       keepConnectionAlive: true,
    //     } as TypeOrmModuleAsyncOptions;
    //   },
    // }),

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
