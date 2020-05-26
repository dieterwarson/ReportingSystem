import {
  Table,
  Column,
  Model,
  Index,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import WorkplaceType from './workplaceType';
import Administrative from './administrative';
import User from './user';
import WorkplaceSubtype from './workplaceSubtype';

@Table
export default class WorkplaceEvent extends Model<WorkplaceEvent> {
  @Index

  @ForeignKey(() => User)
  @Column
  authorId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Administrative)
  @Column
  administrativeId!: number;

  @BelongsTo(() => Administrative)
  administrative!: Administrative;

  @ForeignKey(() => WorkplaceType)
  @Column
  workplaceTypeId!: number;

  @BelongsTo(() => WorkplaceType)
  workplaceType!: WorkplaceType;

  @ForeignKey(() => WorkplaceSubtype)
  @Column
  workplaceSubtypeId!: number;

  @BelongsTo(() => WorkplaceSubtype)
  workplaceSubtype!: WorkplaceSubtype;

  @Column
  description!: string;

  @Column
  absentee!: string;

  @Column
  substitute!: string;

  @Column
  monitoring!: boolean;

  @Column
  date!: Date;
}
