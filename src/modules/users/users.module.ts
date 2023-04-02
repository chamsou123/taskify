import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities';
import { EmailValidator } from './validators/email.validator';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolver, EmailValidator],
  exports: [UsersService],
})
export class UsersModule {}
