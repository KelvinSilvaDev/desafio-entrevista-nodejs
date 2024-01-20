import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    migrationsRun: true,
    password: 'password',
    database: 'testeone',
    entities: ['dist/**/ *.entity{ .ts,.js }'],
    migrations: [__dirname + '/database/migrations/*.ts'],
    migrationsTableName: 'migrations_TypeORM',
});

dataSource
    .initialize()
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));
