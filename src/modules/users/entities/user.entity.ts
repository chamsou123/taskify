import { Column, DeleteDateColumn, Entity, Index } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../../common/base/entities';
import { SoftDeletable } from '../../common/types';

@ObjectType()
@Entity('users')
export class User extends BaseEntity implements SoftDeletable {
  @Field(() => String)
  @Column({ name: 'first_name' })
  firstName: string;

  @Field(() => String)
  @Column({ name: 'last_name' })
  lastName: string;

  @Field(() => String)
  @Column({ name: 'email', unique: true })
  @Index({ unique: true })
  email: string;

  @Column({ name: 'password', select: false })
  password: string;

  @Field(() => Boolean)
  @Column({ name: 'is_active' })
  isActive: boolean;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;
}
