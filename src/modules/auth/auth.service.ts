import { LoginDto, LoginResponse, RegisterDto } from './dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities';
import { INVALID_CREDENTIALS } from '../../errors';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers a new user with the specified registration data.
   * @param input {RegisterDto} - The registration data.
   * @returns A `Promise` that resolves to the newly created user.
   */
  async register(input: RegisterDto): Promise<User> {
    const { password, ...data } = input;

    const hashedPassword = await this.hashPassword(password);

    return this.usersService.create({
      password: hashedPassword,
      ...data,
    });
  }

  /**
   * Attempts to log in a user with the specified email and password.
   * @param input {LoginDto} - The login data.
   * @returns A `Promise` that resolves to the login response data.
   * @throws `UnauthorizedException` if the login credentials are invalid.
   */
  async login(input: LoginDto): Promise<LoginResponse> {
    const { email, password } = input;
    const user = await this.usersService.userByEmail(email);

    const passwordMatch = await this.validatePassword(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }

    return await this.authenticate(user);
  }

  /**
   * Authenticates the specified user and generates an access token.
   * @param user {User} - The user to authenticate.
   * @returns A `Promise` that resolves to the login response data.
   */
  async authenticate(user: User): Promise<LoginResponse> {
    const access = await this.generateAccessToken({
      id: user.id,
      email: user.email,
    });

    return plainToInstance(LoginResponse, {
      access,
    });
  }

  /**
   * Hashes the specified password using a bcrypt algorithm.
   * @param password {string} - The password to hash.
   * @returns A `Promise` that resolves to the hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    const rounds = this.configService.get<number>('hash.rounds');
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(password, salt);
  }

  /**
   * Validates the specified password against the given hashed password.
   * @param password {string} - The password to validate.
   * @param userPassword {string} - The hashed password to compare against.
   * @returns A `Promise` that resolves to a boolean indicating whether the password is valid.
   */
  async validatePassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }

  /**
   * Generates a JSON Web Token access token for the specified user.
   * @param user {id: string, email:string} - The user to generate the token for.
   * @returns A `Promise` that resolves to the generated access token.
   */
  async generateAccessToken(user: Pick<User, 'id' | 'email'>) {
    const secret = this.configService.get<string>('jwt.secret');

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return await this.jwtService.signAsync(payload, {
      secret,
    });
  }
}
