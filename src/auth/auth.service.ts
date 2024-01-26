import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';





import { LoginDto } from './dto/login.dto';

import { JwtResponseDto } from './dto/jwt-response.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

/**
 * Authentication Service
 */
@Injectable()
export class AuthService {
  /**
   * Time in seconds when the token is to expire
   * @type {number}
   */
  private readonly expiration: number;

  /**
   * Constructor
   * @param {JwtService} jwtService jwt service
   * @param {UsersService} usersService users service
   */
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    // this.expiration = this.configService.get('WEBTOKEN_EXPIRATION_TIME');
    this.expiration = this.configService.get('99');
  }

  /**
   * Creates a signed jwt token based on User payload
   * @param {User} param dto to generate token from
   * @returns {Promise<JwtResponseDto>} token body
   */
  async createToken({
    id,
    username,
    name,
    roles,
    email,
  }: User): Promise<JwtResponseDto> {
    return {
      expiration: this.expiration,
      expirationFormatted: moment()
        .add(this.expiration, 'minutes')
        .format('LLL'),
      token: this.jwtService.sign({
        id,
        username,
        name,
        roles,
        email,
      }),
    };
  }

  /**
   * Validates whether or not the user exists in the database
   * @param {LoginDto} param login payload to authenticate with
   * @returns {Promise<User>} registered user
   */
  async validateUser({ username, password }: LoginDto): Promise<User> {
    const user = await this.usersService.getByUsernameAndPass(
      username,
      password
    );

    if (!user) {
      throw new UnauthorizedException(
        'Could not authenticate. Please try again',
      );
    }
    return user;
  }
}
