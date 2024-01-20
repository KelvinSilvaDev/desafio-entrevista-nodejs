import { Module } from '@nestjs/common'
import { EstablishmentService } from './establishment.service'
import { EstablishmentController } from './establishment.controller'
import { establishmentProviders } from './establishment.providers'
import { DatabaseModule } from 'src/database/database.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Establishment } from './entities/establishment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Establishment])],
  exports: [TypeOrmModule],
  controllers: [EstablishmentController],
  providers: [EstablishmentService],
})
export class EstablishmentModule { }
