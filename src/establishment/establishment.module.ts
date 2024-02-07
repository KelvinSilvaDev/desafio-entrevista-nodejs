import { Module } from '@nestjs/common'
import { EstablishmentService } from './establishment.service'
import { EstablishmentController } from './establishment.controller'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Establishment } from './entities/establishment.entity'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PoliciesGuard } from 'src/casl/policies.guard'
import { CaslFactory } from 'src/casl/casl.factory'
import { UserRoles } from 'src/users/user-role.entity'
import { Report } from 'src/report/entities/report.entity'

@Module({
  imports: [ConfigModule, PassportModule.register({ defaultStrategy: 'jwt' }), TypeOrmModule.forFeature([Establishment, UserRoles, Report])],
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
