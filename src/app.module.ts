import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './modules/common/common.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CommonModule,
    UsersModule,
  ]
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
