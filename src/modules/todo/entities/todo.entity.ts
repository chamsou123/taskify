import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../../common/base/entities';
import { User } from '../../users/entities';
import { Category } from '../../category/entities';
import { SoftDeletable } from '../../common/types';
import { TodoPriorityEnum, TodoStatusEnum } from '../enums';

@ObjectType()
@Entity('todos')
export class Todo extends BaseEntity implements SoftDeletable {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_Id', referencedColumnName: 'id' })
  @Index()
  user: User;

  @Field(() => Category)
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_Id', referencedColumnName: 'id' })
  @Index()
  category: Category;

  @Field(() => TodoPriorityEnum)
  @Column({
    type: 'enum',
    enum: TodoPriorityEnum,
    default: TodoPriorityEnum.LOW,
  })
  @Index()
  priority: TodoPriorityEnum;

  @Field(() => TodoStatusEnum)
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.INPROGRESS,
  })
  @Index()
  status: TodoStatusEnum;

  @Field(() => Date)
  @Column({ name: 'due_date' })
  @Index()
  dueDate: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;
}
