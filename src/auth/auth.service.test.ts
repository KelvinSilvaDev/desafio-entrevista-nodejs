import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';


const user: User = plainToClass(User, {
  id: 1,
  email: 'test@user.com',
  roles: [
    {
      id: 1,
      user: 1,
    },
  ],
});


describe('AuthService', () => {
  let service: AuthService;

  // Mock Repositories
  const mockedUserRepository = {
    createQueryBuilder: jest.fn().mockResolvedValue(user),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        UsersService,
        ConfigService,
        {
          provide: getRepositoryToken(User),
          useValue: mockedUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
