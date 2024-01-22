import { Module } from '@nestjs/common'
import { EstablishmentService } from './establishment.service'
import { EstablishmentController } from './establishment.controller'
import { establishmentProviders } from './establishment.providers'
// import { DatabaseModule } from 'src/database/database.module'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule } from '@nestjs/config'
import { Type } from 'class-transformer'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Establishment } from './entities/establishment.entity'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PoliciesGuard } from 'src/casl/policies.guard'
import { CaslFactory } from 'src/casl/casl.factory'
import { UserRoles } from 'src/users/user-role.entity'

@Module({
  imports: [ConfigModule, PassportModule.register({ defaultStrategy: 'jwt' }), TypeOrmModule.forFeature([Establishment, UserRoles])],
  providers: [
    EstablishmentService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PoliciesGuard,
    CaslFactory
  ],
  controllers: [EstablishmentController],
})
export class EstablishmentModule { }
