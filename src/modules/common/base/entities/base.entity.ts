import { Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Field } from '@nestjs/graphql';

@Entity()
export abstract class BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  id: number;
}
