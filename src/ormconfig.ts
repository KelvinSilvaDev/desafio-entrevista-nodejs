import * as path from 'path';
import {ConnectionOptions, DataSource} from 'typeorm';
import { Establishment } from './establishment/entities/establishment.entity';
import { ParkingRecord } from './parking-record/entities/parking-record.entity';
import { Summary } from './summary/entities/summary.entity';
import { User } from './users/user.entity';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { Report } from './report/entities/report.entity';
import { UserRoles } from './users/user-role.entity';

// You can load you .env file here synchronously using dotenv package (not installed here),
// import * as dotenv from 'dotenv';
// import * as fs from 'fs';
// const environment = process.env.NODE_ENV || 'development';
// const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
// You can also make a singleton service that load and expose the .env file content.
// ...

const entities = [Establishment, ParkingRecord, Report, Summary, Vehicle, User, UserRoles]

export const dataSource = new DataSource({
  type: 'mysql',
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "nest",
  entities: entities,
  // migrations: [path.resolve(__dirname, 'dist/database/migrations/*.js')],
  migrations: ["dist/src/database/migrations/*.js"],

  // migrations: ['./database/migrations/**{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  logger: 'file',
})

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
  type: 'mysql',
  host: '0.0.0.0',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'nestjs_parking_lot',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/**/migrations/**{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: true,
  logger: 'file',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  // cli: {
  //   // Location of migration should be inside src folder
  //   // to be compiled into dist/ folder.
  //   migrationsDir: 'src/migrations',
  // },
};

// export = config;
// const { DataSource } = require("typeorm")

// module.exports = {
//   "type": "mysql",
//   "host": "localhost",
//   "port": 3306,
//   "username": "root",
//   "password": "password",
//   "database": "nestjs_parking_lot",
//   "entities": ["dist/**/*.entity{.ts,.js}"],
//   "migrations": ["dist/database/migrations/*.js"],
//   "autoLoadEntities": true,
//   "synchronize": false,
// }

// // const config = new DataSource()

// // config.runMigrations = true
// // config.type = "mysql"
// // config.host = "localhost"
// // config.port = 3306
// // config.username = "root"
// // config.password = "password"
// // config.database = "nestjs_parking_lot"
// // config.entities = ["dist/**/*.entity{.ts,.js}"]
// // config.migrations = ["dist/database/migrations/*.js"]
// // config.autoLoadEntities = true
// // config.synchronize = false
// // config.datasource = "default"
// // 

// // module.exports = config