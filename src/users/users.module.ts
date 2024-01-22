import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { UserRoles } from './user-role.entity';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userProviders } from './users.provider';
import { DataSource } from 'typeorm';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CaslFactory } from 'src/casl/casl.factory';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRoles])],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PoliciesGuard,
    CaslFactory,
  ],
  controllers: [UsersController],
})
export class UsersModule { }