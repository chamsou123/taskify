import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [],
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CommonModule,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
