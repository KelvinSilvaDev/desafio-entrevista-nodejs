import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

/**
 * Login Dto Class
 */
export class LoginDto {
  /**
   * Username field
   */
  @ApiProperty({
    required: true,
    example: 'test',
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  /**
   * Password field
   */
  @ApiProperty({
    required: true,
    example: '12345678',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
