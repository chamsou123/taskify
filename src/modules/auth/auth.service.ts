import { LoginDto, RegisterDto } from './dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities';
import { LoginResponse } from './dto/login-response.dto';
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

  async register(input: RegisterDto): Promise<User> {
    const { password, ...data } = input;

    const hashedPassword = await this.hashPassword(password);

    return this.usersService.create({
      password: hashedPassword,
      ...data,
    });
  }

  async login(input: LoginDto): Promise<LoginResponse> {
    const { email, password } = input;
    const user = await this.usersService.userByEmail(email);

    const passwordMatch = await this.validatePassword(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }

    return await this.authenticate(user);
  }

  async authenticate(user: User): Promise<LoginResponse> {
    const access = await this.generateAccessToken({
      id: user.id,
      email: user.email,
    });

    return plainToInstance(LoginResponse, {
      access,
    });
  }

  async hashPassword(password: string): Promise<string> {
    const rounds = this.configService.get<number>('hash.rounds');
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(password, salt);
  }

  async validatePassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }

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
