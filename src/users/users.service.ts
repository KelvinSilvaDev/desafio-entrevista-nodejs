import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResultsDto } from 'src/dto/results.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return this.userRepository
      .save(user)
      .then((result) => {
        console.log(result);
        return <ResultsDto>{
          status: true,
          message: 'Usuário criado com sucesso!',
        };
      })

      .catch((error) => {
        console.log(error);
        return <ResultsDto>{
          status: false,
          message: 'Não foi possível criar o usuário!',
          error: error,
        };
      });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.findOne({ where: { id: id } });

    return this.userRepository
      .update(await user, updateUserDto)
      .then((result) => {
        console.log(result);
        return <ResultsDto>{
          status: true,
          message: 'Usuário atualizado com sucesso!',
        };
      })
      .catch((error) => {
        return <ResultsDto>{
          status: false,
          message: 'Não foi possível atualizar o usuário!',
          error: error,
        };
      });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
