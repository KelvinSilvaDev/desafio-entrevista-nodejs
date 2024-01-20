import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { EstablishmentModule } from './establishment/establishment.module'

@Module({
  imports: [UsersModule, EstablishmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
