import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';




import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtResponseDto } from './dto/jwt-response.dto';
import { UsersService } from 'src/users/users.service';

const moduleMocker = new ModuleMocker(global);

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker((token) => {
        if (token === AuthService) {
          return {
            valideUser: jest.fn().mockResolvedValue({
              id: 1,
              username: 'test-user',
              email: 'test@user.com',
              name: 'Test User',
              gravatar: 'https://www.gravatar.com/avatar/',
              roles: [
                {
                  id: 1,
                  user: 1,
                },
              ],
            }),
            createToken: jest.fn().mockResolvedValue({
              expiration: 1800,
              expirationFormatted: 'in 30 minutes',
              token: 'JWT',
            } as JwtResponseDto),
          };
        }
        if (token === UsersService) {
          return {};
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token
          ) as unknown as MockFunctionMetadata<unknown, unknown[]>;
         
        }
      })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
