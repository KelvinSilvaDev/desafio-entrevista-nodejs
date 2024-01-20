import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EstablishmentModule } from './establishment/establishment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, getConnectionOptions } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Establishment } from './establishment/entities/establishment.entity';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'password',
    //   database: 'testeone',
    //   entities: [User, Establishment],
    //   synchronize: false,
    // }),
    UsersModule,
    EstablishmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       useFactory: async () =>
//         Object.assign(await getConnectionOptions(), {
//           autoLoadEntities: true,
//         }),
//     }),
//     UsersModule,
//     EstablishmentModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
