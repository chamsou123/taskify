import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies';
import { JwtAuthGuard } from './guards';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.expiresIn') },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
