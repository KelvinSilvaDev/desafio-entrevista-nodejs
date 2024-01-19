import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;
  @ApiProperty({
    description: 'The email of the user',
    minLength: 3,
    maxLength: 30,
    example: 'johndoe@mail.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'The password of the user',
    example: '12345678',
  })
  password: string;
}
