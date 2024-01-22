import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EstablishmentModule } from './establishment/establishment.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import * as joi from 'joi';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ParkingRecordModule } from './parking-record/parking-record.module';
import { JwtModule } from '@nestjs/jwt';
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
import winstonFileRotator from 'winston-daily-rotate-file';
import { join } from 'path';

// import { JwtStrategy } from './teste/jwt.strategy';
// import { AuthModule } from './teste/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        APP_ENV: joi
          .string()
          .valid('development', 'production')
          .default('development'),
        WEBTOKEN_ENCRYPTION_KEY: joi.string().required(),
        WEBTOKEN_EXPIRATION_TIME: joi.number().default(1800),
        DB_TYPE: joi.string().default('mysql'),
        DB_USERNAME: joi.string().default('root'),
        DB_PASSWORD: joi.string().allow('').default('password'),
        DB_HOST: joi.string().default('localhost'),
        DB_PORT: joi.number().default('3306'),
        DB_DATABASE: joi.string().default('kelll'),
      }),
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get('APP_ENV') === 'production'
          ? [
            {
              rootPath: join(__dirname, '..', 'ui'),
            },
          ]
          : [],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD') || 'password',
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/**/**.entity{.ts,.js}'],
          synchronize: configService.get('APP_ENV') === 'development',
          autoLoadEntities: true,
          logging: true,
          keepConnectionAlive: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('APP_ENV') === 'development'
          ? {
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'nest-typeorm-service' },
            transports: [
              new winston.transports.Console({
                format: winston.format.simple(),
              }),
            ],
          }
          : {
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'nest-typeorm-service' },
            transports: [
              new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error',
              }),
              new winston.transports.Console({
                format: winston.format.simple(),
              }),
              new winstonFileRotator({
                filename: 'logs/application-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
              }),
            ],
          };
      },
    }),
    AuthModule,
    EstablishmentModule,
    UsersModule,
    CaslModule,
    VehiclesModule,
    ParkingRecordModule,
  ]
  ,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
