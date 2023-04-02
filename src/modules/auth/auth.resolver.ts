import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '../users/entities';
import { LoginDto, LoginResponse, RegisterDto } from './dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'register' })
  register(@Args('registerInput') registerInput: RegisterDto) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => LoginResponse, { name: 'login' })
  login(@Args('credentials') credentials: LoginDto) {
    return this.authService.login(credentials);
  }
}
