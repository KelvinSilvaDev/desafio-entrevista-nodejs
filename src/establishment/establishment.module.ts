import { Module } from '@nestjs/common'
import { EstablishmentService } from './establishment.service'
import { EstablishmentController } from './establishment.controller'
import { establishmentProviders } from './establishment.providers'
import { DatabaseModule } from 'src/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [EstablishmentController],
  providers: [...establishmentProviders, EstablishmentService],
})
export class EstablishmentModule { }
