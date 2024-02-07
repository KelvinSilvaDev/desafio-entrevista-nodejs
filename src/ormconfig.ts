import { DataSource } from 'typeorm';
import { Establishment } from './establishment/entities/establishment.entity';
import { ParkingRecord } from './parking-record/entities/parking-record.entity';
import { Summary } from './summary/entities/summary.entity';
import { User } from './users/user.entity';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { Report } from './report/entities/report.entity';
import { UserRoles } from './users/user-role.entity';


const entities = [Establishment, ParkingRecord, Report, Summary, Vehicle, User, UserRoles]

export const dataSource = new DataSource({
  type: 'mysql',
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "nest",
  entities: entities,
  migrations: ["dist/src/database/migrations/*.js"],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  logger: 'file',
})