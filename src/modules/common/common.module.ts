import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { GraphqlApiModule } from './graphql/graphql.module';

@Module({
  imports: [DatabaseModule, GraphqlApiModule],
})
export class CommonModule {}
