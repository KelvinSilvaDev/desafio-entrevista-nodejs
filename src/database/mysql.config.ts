export const TypeORMConfig: any = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process?.env?.DB_PORT ?? '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{ .ts,.js}'],
  migrations: ['dist/src/migration/*{.ts,.js}'],
  migrationsRun: true,
  migrationsTableName: 'migrations_TypeORM',
  synchronize: false,
  logging: true,
}
