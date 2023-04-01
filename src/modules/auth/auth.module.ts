import { Module } from '@nestjs/common';

import { JwtStrategy } from './strategies';
import { JwtAuthGuard } from './guards';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [],
  providers: [AuthService, AuthResolver, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
