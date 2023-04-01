import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DeleteDateColumn, Entity, Index } from 'typeorm';

import { BaseEntity } from '../../common/base/entities';
import { SoftDeletable } from '../../common/types';

@ObjectType()
@Entity('todos_categories')
export class Category extends BaseEntity implements SoftDeletable {
  @Field(() => String)
  @Column({ unique: true })
  @Index()
  name: string;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;
}
