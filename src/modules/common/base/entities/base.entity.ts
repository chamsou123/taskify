import { Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export abstract class BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  id: number;
}
