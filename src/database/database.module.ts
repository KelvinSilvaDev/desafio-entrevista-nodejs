import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'testone',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
  })],
  providers: [DatabaseService],
})
export class DatabaseModule { }


// import { Module } from '@nestjs/common'
// import { databaseProviders } from './database.providers'
// import { TypeOrmModule } from '@nestjs/typeorm'
// import { User } from 'src/users/entities/user.entity'
// import { Establishment } from 'src/establishment/entities/establishment.entity'

// @Module({
//   imports: [TypeOrmModule.forFeature([User, Establishment])],
//   providers: [...databaseProviders],
//   exports: [...databaseProviders],
// })
// export class DatabaseModule { }
