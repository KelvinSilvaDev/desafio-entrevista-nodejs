console.log ('Carregando datasource.config.js');
const {DataSource} = require ('typeorm');

module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',

  password: 'password',
  database: 'testeone',
  entities: ['dist/**/ *.entity{ .ts,.js }'],
  migrations: ['dist/src/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_TypeORM',
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  dataSource: new DataSource (),
};
// import {DataSource} from 'typeorm';

// export const dataSource = new DataSource ({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',

//   password: 'password',
//   database: 'nest',
//   entities: ['dist/**/ *.entity{ .ts,.js }'],
//   migrations: ['dist / src / migration/*{.ts,.js}'],
//   migrationsTableName: 'migrations_TypeORM',
// });

// dataSource
//   .initialize ()
//   .then (() => console.log ('Database connected'))
//   .catch (err => console.log (err));
