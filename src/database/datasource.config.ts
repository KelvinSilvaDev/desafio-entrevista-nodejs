import { DataSource } from 'typeorm';

export const dataSource: any = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',

  password: 'password',
  database: 'nest',
  entities: ['dist/**/ *.entity{ .ts,.js }'],
  migrations: ['dist / src / migration/*{.ts,.js}'],
  migrationsTableName: 'migrations_TypeORM',
});
